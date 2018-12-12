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
import { scroller } from 'react-scroll';
import actions from 'src/store/chat/chat.action';
import { withRouter } from 'react-router';
import Notification from 'react-web-notification';
import icon from 'assets/images/splash.png';
import MicrolinkCard from 'react-microlink';

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
};

const UrlPreview = ({ content }) =>
  getUrl(content) ? <MicrolinkCard url={getUrl(content)} /> : null;

class Chat extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.messagesEnd = React.createRef();
    this.chatContainer = React.createRef();
  }

  messagesEnd;
  chatContainer;

  state = {
    title: 'Unbearables Chat',
    options: { body: '', disableActiveWindow: true, icon },
    ignore: true,
    hasUserScrolled: false,
  };

  logout = () => {
    this.props.logout();
  };

  scrollToBottom = () => {
    if (this.state.hasUserScrolled) return;
    scroller.scrollTo('messagesEnd', {
      duration: 500,
      smooth: true,
      containerId: 'ChatContainer',
    });
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
    this.chatContainer.current.addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate(prevProps) {
    this.scrollToBottom();
    if (prevProps.chat.length < this.props.chat.length) {
      const options = {
        body: `${this.props.chat[this.props.chat.length - 1].value.name}: ${
          this.props.chat[this.props.chat.length - 1].value.content
        }`,
        disableActiveWindow: true,
        icon,
        vibrate: true,
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
    this.chatContainer.current.removeEventListener('scroll', this.handleScroll);
  }

  forceScrollToBottom = () => {
    this.setState({ hasUserScrolled: false });
    this.scrollToBottom();
  };

  sendMessage = data => {
    const copiedData = Object.assign({}, data);
    this.setState({ hasUserScrolled: false });
    copiedData.message &&
      copiedData.message.length &&
      this.props.sendMessage(copiedData.message);
  };

  render() {
    const { user, chat } = this.props;

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
            <ChatContainer id="ChatContainer" ref={this.chatContainer}>
              {chat.length ? (
                chat.map((data, key) => (
                  <ChatLine key={key} ownUser={data.value.from === user.uid}>
                    {data.value.from !== user.uid && (
                      <div className="name">{data.value.name}</div>
                    )}

                    <span
                      dangerouslySetInnerHTML={{
                        __html: clean(data.value.content, user.displayName),
                      }}
                    />

                    <UrlPreview content={data.value.content} />

                    <TimeFrom from={data.value.at} />
                  </ChatLine>
                ))
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
          swRegistration={new ServiceWorkerRegistration()}
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
