import React from 'react';
// import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Input from 'src/components/Input/Input';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { MdSend } from 'react-icons/md';
import { AppIsReadOnly } from 'src/store/app/app.reducer';
import { MentionsInput, Mention } from 'react-mentions';
import { bindActionCreators } from 'redux';
import actions from 'src/store/chat/chat.action';
import { width } from 'window-size';

type OwnProps = {
  handleSubmit: Function,
};

const FormWrapper = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  background-color: ${props => props.theme.colors.LIGHTER_GREY};
  .mentions {
    width: 100%;
    margin-right: 5px;
    &__control {
      width: 100%;
      input {
        height: 30px;
        border: 1px solid black;
        border-radius: 3px;
      }
    }
  }
`;

class ChatInputForm extends React.PureComponent<OwnProps> {
  state = {
    message: '',
  };

  handleChange(message) {
    this.setState({ message });
  }

  sendMessage = e => {
    e.preventDefault();
    const copiedData = Object.assign({}, this.state);
    copiedData.message &&
      copiedData.message.length &&
      this.props.sendMessage(copiedData.message);
    this.setState({ message: '' });
  };

  render() {
    const { isReadOnly, members } = this.props;
    const data = members.filter(member => member.value.name).map(member => ({
      display: member.value.name,
      id: member.value.name,
    }));
    return (
      <FormWrapper onSubmit={this.sendMessage}>
        <MentionsInput
          className="mentions"
          singleLine
          style={{ flex: 1, width: '100%' }}
          value={this.state.message}
          markup="@__display__"
          onChange={(ev, newValue) => this.handleChange(newValue)}
        >
          <Mention trigger="@" data={data} />
        </MentionsInput>
        <Button type="submit">
          <MdSend />
        </Button>
      </FormWrapper>
    );
  }
}

const mapStateToProps = state => ({
  isReadOnly: AppIsReadOnly(state),
  members: state && state.chat && state.chat.members,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      sendMessage: message => actions.chatSendMessage(message),
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatInputForm);
