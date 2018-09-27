//@flow
import React from 'react';
// import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Input from 'src/components/Input/Input';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { MdSend } from 'react-icons/md';
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
  .Input {
    margin-right: 5px;
  }
`;

class ChatInputForm extends React.PureComponent<OwnProps> {
  render() {
    return (
      <FormWrapper onSubmit={this.props.handleSubmit}>
        <Input
          fullWidth
          name="message"
          type="text"
          placeholder="Say something!"
        />
        <Button type="submit">
          <MdSend />
        </Button>
      </FormWrapper>
    );
  }
}

export default connect(
  null,
  null
)(reduxForm({ form: 'chatInputForm' })(ChatInputForm));
