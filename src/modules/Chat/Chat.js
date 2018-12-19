//@flow
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { decorateOutput, sanitizeInput, getUrl } from 'src/utils/util';
import ChatInputForm from './ChatInputForm';
import userActions from 'src/store/user/user.action';
import { type UserObjectType } from 'src/types';
import Members from 'src/components/Members/Members';
import CircularProgress from '@material-ui/core/CircularProgress';
import actions from 'src/store/chat/chat.action';
import { withRouter } from 'react-router';
import Notification from '../../components/Notification/Notification';
import icon from 'assets/images/splash.png';
import MicrolinkCard from 'react-microlink';
import {
  AutoSizer,
  List,
  CellMeasurer,
  CellMeasurerCache,
} from 'react-virtualized';
import MakeAsyncFunction from 'react-redux-promise-listener';
import { promiseListener } from '../../store/store';

import {
  LogoutMenu,
  ChatContainer,
  ChatLine,
  OuterWrapper,
  Container,
  Header,
  Wrapper,
  LoaderContainer,
  TimeFrom,
  ScrollBottomButton,
} from './ChatComponents';

const clean = (input, user) =>
  input && decorateOutput(sanitizeInput(input), user.toLowerCase());

type Props = {
  logout: Function,
  sendMessage: Function,
  user: UserObjectType,
  chat: [],
  history: Function,
};
type State = {
  title: string,
  options: { body: string },
  ignore: boolean,
  hasUserScrolled: boolean,
  swRegistration: any,
};

type UrlProps = {
  content: string,
};
class UrlPreview extends React.PureComponent<UrlProps> {
  render() {
    const { content } = this.props;
    return getUrl(content) ? <MicrolinkCard url={getUrl(content)} /> : null;
  }
}

class Chat extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.messagesEnd = React.createRef();
    this.List = React.createRef();
    this.cache = new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 73,
    });
    this.scroll = {};
  }

  cache;
  scroll;
  messagesEnd;
  List;

  state = {
    title: 'Unbearables Chat',
    options: { body: '', disableActiveWindow: true, icon },
    ignore: true,
    hasUserScrolled: false,
    swRegistration: {},
  };

  logout = () => {
    this.props.logout();
  };

  scrollToBottom = () => {
    if (this.List && this.List.current) {
      if (!this.state.hasUserScrolled) {
        this.List.current.scrollToRow(this.props.chat.length);
      }
    }
  };

  handleScroll = e => {
    const { target } = e;

    if (
      this.state.hasUserScrolled &&
      target.scrollHeight - target.scrollTop - 50 > target.clientHeight
    ) {
      return;
    }
    if (
      !this.state.hasUserScrolled &&
      target.scrollHeight - target.scrollTop - 50 < target.clientHeight
    ) {
      return;
    }

    this.setState({
      hasUserScrolled:
        target.scrollHeight - target.scrollTop - 50 > target.clientHeight,
    });
  };

  componentDidMount() {
    this.scrollToBottom();
    window.addEventListener('focus', () => {
      this.setState({ ignore: true });
    });
    window.addEventListener('blur', () => {
      this.setState({ ignore: false });
    });

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(swRegistration =>
        this.setState({ swRegistration })
      );
    }
  }

  watchScroll = scroll => {
    if (this.List && this.List.current) {
      const difference =
        this.List.current.getOffsetForRow(
          'center',
          this.props.chat.length - 1
        ) - scroll.scrollTop;
      if (difference > 100 && !this.state.hasUserScrolled) {
        return this.setState({ hasUserScrolled: true });
      }
      if (difference <= 100 && this.state.hasUserScrolled) {
        return this.setState({ hasUserScrolled: false });
      }
      if (scroll.scrollTop < 100) {
        this.props.loadMoreMessages();
        this.List.current.scrollToRow(20);
        this.cache.clearAll();
        this.List.current.recomputeRowHeights();
      }
    }
  };

  componentDidUpdate(prevProps) {
    this.scrollToBottom();

    if (prevProps.chat.length < this.props.chat.length) {
      const options = {
        body: `${this.props.chat[this.props.chat.length - 1].value.name}: ${
          this.props.chat[this.props.chat.length - 1].value.content
        }`,
        disableActiveWindow: true,
        vibrate: [100, 50, 100],
        icon,
        badge: icon,
        askAgain: true,
      };

      this.setState({
        options,
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('focus', () => {
      this.setState({ ignore: true });
    });
    window.removeEventListener('blur', () => {
      this.setState({ ignore: false });
    });
  }

  forceScrollToBottom = () => {
    this.List.current.scrollToRow(this.props.chat.length);
  };

  sendMessage = data => {
    const copiedData = Object.assign({}, data);
    this.setState({ hasUserScrolled: false });
    copiedData.message &&
      copiedData.message.length &&
      this.props.sendMessage(copiedData.message);
  };

  chatItem = props => {
    const {
      key, // Unique key within array of rows
      index, // Index of row within collection
      parent,
      style,
    } = props;
    return (
      this.props.chat.length >= 50 && (
        <CellMeasurer
          key={key}
          cache={this.cache}
          parent={parent}
          columnIndex={0}
          rowIndex={index}
        >
          <div
            style={Object.assign({}, style, { width: '100%', display: 'flex' })}
          >
            <ChatLine
              ownUser={
                this.props.chat[index].value.from === this.props.user.uid
              }
            >
              {this.props.chat[index].value.from !== this.props.user.uid && (
                <div className="name">{this.props.chat[index].value.name}</div>
              )}

              <span
                dangerouslySetInnerHTML={{
                  __html: clean(
                    this.props.chat[index].value.content,
                    this.props.user.displayName
                  ),
                }}
              />

              <UrlPreview content={this.props.chat[index].value.content} />

              <TimeFrom from={this.props.chat[index].value.at} />
            </ChatLine>
          </div>
        </CellMeasurer>
      )
    );
  };
  isRowLoaded = ({ index }) => index < this.props.chat.length;

  render() {
    const { chat } = this.props;

    return (
      <OuterWrapper>
        <Helmet>
          <title>Unbearables</title>
          <meta name="Chat" content="Chat" />
        </Helmet>
        <Container>
          <Members />
          <Wrapper>
            <Header>
              <span />
              <LogoutMenu logout={this.logout} />
            </Header>
            <ChatContainer>
              {chat.length ? (
                <MakeAsyncFunction
                  listener={promiseListener}
                  start="CHAT_LOAD_MORE_MESSAGES"
                  resolve="CHAT_LOAD_MORE_MESSAGES_SUCCESS"
                  reject="CHAT_LOAD_MORE_MESSAGES_FAILURE"
                >
                  {asyncFunction => (
                    // <InfiniteLoader
                    //   isRowLoaded={this.isRowLoaded}
                    //   loadMoreRows={}
                    //   rowCount={99999}
                    // >
                    //   {({ onRowsRendered, registerChild }) => (
                    <AutoSizer>
                      {({ width, height }) => (
                        <List
                          ref={this.List}
                          className="List"
                          rowRenderer={this.chatItem}
                          rowCount={chat.length}
                          width={width}
                          height={height}
                          deferredMeasurementCache={this.cache}
                          rowHeight={this.cache.rowHeight}
                          overscanRowCount={3}
                          onScroll={this.watchScroll}
                          // onRowsRendered={onRowsRendered}
                        />
                      )}
                    </AutoSizer>
                  )}
                  {/* </InfiniteLoader>
                  )} */}
                </MakeAsyncFunction>
              ) : (
                <LoaderContainer>
                  <CircularProgress />
                </LoaderContainer>
              )}
              <div className="messagesEnd" name="messagesEnd" />
            </ChatContainer>

            <ScrollBottomButton
              onClick={this.forceScrollToBottom}
              className={this.state.hasUserScrolled ? 'active' : ''}
            >
              <svg
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 21 21"
                width="21"
                height="21"
              >
                <path
                  fill="#263238"
                  fillOpacity=".33"
                  d="M4.8 6.1l5.7 5.7 5.7-5.7 1.6 1.6-7.3 7.2-7.3-7.2 1.6-1.6z"
                />
              </svg>
            </ScrollBottomButton>

            <ChatInputForm onSubmit={this.sendMessage} />
          </Wrapper>
        </Container>
        <Notification
          title={this.state.title}
          options={this.state.options}
          ignore={this.state.ignore}
          swRegistration={this.state.swRegistration}
        />
      </OuterWrapper>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logout: () => userActions.userLogout(),
      sendMessage: message => actions.chatSendMessage(message),
      loadMoreMessages: () => actions.chatLoadMoreMessages(),
    },
    dispatch
  );

const mapStateToProps = state => ({
  user: state && state.user && state.user.user,
  chat: state && state.chat && state.chat.content,
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Chat)
);
