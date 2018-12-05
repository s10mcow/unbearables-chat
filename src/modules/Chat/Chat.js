//@flow
import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { decorateOutput, sanitizeInput } from 'src/utils/util';
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
} from './ChatComponents';

const ScrollBottomButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: white;
  height: 42px;
  width: 42px;
  border: none;
  position: absolute;
  z-index: 111;
  bottom: 160px;
  right: 60px;
  transform: scale(0.5);
  opacity: 0;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.06), 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
  &.active {
    transform: scale(1);
    opacity: 1;
  }
`;

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
class Home extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.messagesEnd = React.createRef();
    this.chatContainer = React.createRef();
  }

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

  componentDidMount() {
    this.scrollToBottom();
    window.addEventListener('focus', () => {
      this.setState({ ignore: true });
    });
    window.addEventListener('blur', () => {
      this.setState({ ignore: false });
    });
    this.chatContainer.current.addEventListener('scroll', e => {
      const { target } = e;
      this.setState({
        hasUserScrolled:
          target.scrollHeight - target.scrollTop !== target.clientHeight,
      });
    });
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
  }

  forceScrollToBottom = () => {
    this.setState({ hasUserScrolled: false });
    this.scrollToBottom();
  };

  sendMessage = data => {
    const copiedData = Object.assign({}, data);
    copiedData.message &&
      copiedData.message.length &&
      this.props.sendMessage(copiedData.message);
  };

  render() {
    const { user, chat } = this.props;

    return (
      <OuterWrapper>
        <Helmet>
          <title>Unbearables...</title>
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
  )(Home)
);
