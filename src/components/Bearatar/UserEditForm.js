//@flow
import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Input from 'src/components/Input/Input';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { type UserObjectType, type AppStoreType } from 'src/types';
type OwnProps = {
  handleSubmit: Function,
  user: UserObjectType,
};
const FormWrapper = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

class UserEditForm extends React.PureComponent<OwnProps> {
  render() {
    return (
      <FormWrapper onSubmit={this.props.handleSubmit}>
        <Input
          name="username"
          autoComplete="new-username"
          type="text"
          placeholder="Username"
          required
        />
        {}
        <Button color="primary" variant="contained" size="large" type="submit">
          Save Changes
        </Button>
      </FormWrapper>
    );
  }
}

const mapStateToProps = (state: AppStoreType, props: OwnProps) => {
  const user = props.user;

  return {
    initialValues: {
      username: user && user.displayName,
    },
  };
};

export default connect(
  mapStateToProps,
  null
)(reduxForm({ form: 'editForm' })(UserEditForm));
