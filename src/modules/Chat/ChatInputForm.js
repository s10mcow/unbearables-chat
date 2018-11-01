//@flow
import React from 'react';
// import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Input from 'src/components/Input/Input';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { MdSend } from 'react-icons/md';
import { AppIsReadOnly } from 'src/store/app/app.reducer';

type OwnProps = {
  handleSubmit: Function,
  isReadOnly: boolean,
};

const FormWrapper = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  background-color: ${props => props.theme.colors.LIGHTER_GREY};
  .Input {
    margin-right: 5px;
  }
`;

class ChatInputForm extends React.PureComponent<OwnProps> {
  render() {
    const { isReadOnly } = this.props;
    return (
      <FormWrapper onSubmit={this.props.handleSubmit}>
        <Input
          disabled={isReadOnly}
          fullWidth
          name="message"
          type="text"
          autoComplete="off"
          spellCheck="on"
          placeholder={
            isReadOnly
              ? 'Verify your email to get in the bear cave.'
              : 'Say something!'
          }
        />

        {/* <MentionsInput
          className="mentions"
          singleLine
          style={{ flex: 1, width: '100%' }}
          value={this.state.message}
          markup="@__display__"
          onChange={(ev, newValue) => this.handleChange(newValue)}
        >
          <Mention trigger="@" data={data} />
        </MentionsInput> */}
        <Button type="submit" disabled={isReadOnly}>
          <MdSend />
        </Button>
      </FormWrapper>
    );
  }
}

const mapStateToProps = state => ({
  isReadOnly: AppIsReadOnly(state),
});

export default connect(
  mapStateToProps,
  null
)(reduxForm({ form: 'chatInputForm' })(ChatInputForm));
