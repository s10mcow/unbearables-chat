//@flow
import React from 'react';
// import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { createStructuredSelector } from 'reselect';
import Bearatar from '../Bearatar/Bearatar';
import {
  MemberContainer,
  Member,
  Members,
  LoaderContainer,
} from './MemberComponents';
import avatarImage from 'assets/images/logo.jpg';
import Avatar from '@material-ui/core/Avatar';
import { type UserObjectType } from 'src/types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { isMobileDevice } from 'src/utils/util';
type Props = {
  members: [],
  user: UserObjectType,
};

type State = {
  memberPanelOpen: boolean,
  isAvatarOpen: boolean,
  selectedUser: {},
  type: string,
};

class _Members extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      memberPanelOpen: !isMobileDevice(),
      selectedUser: props.user,
      type: 'Profile',
      isAvatarOpen: false,
    };
  }

  openProfile = (user, type) => {
    this.setState({
      selectedUser: user,
      type,
      isAvatarOpen: true,
      memberPanelOpen: true,
    });
  };

  toggleMemberPanel = () => {
    this.setState({
      memberPanelOpen: !this.state.memberPanelOpen,
    });
  };

  toggleAvatarOpen = () => {
    this.setState({ isAvatarOpen: !this.state.isAvatarOpen });
  };

  render() {
    const { members, user } = this.props;

    return (
      <MemberContainer isOpen={this.state.memberPanelOpen}>
        <Bearatar
          type={this.state.type}
          user={this.state.selectedUser}
          memberPanelOpen={this.state.memberPanelOpen}
          isAvatarOpen={this.state.isAvatarOpen}
          toggleAvatarOpen={this.toggleAvatarOpen}
          openProfile={() => this.openProfile(user, 'Profile')}
          toggleMemberPanel={this.toggleMemberPanel}
        />
        <Members>
          {members.length ? (
            members.map((data, key) => (
              <Member
                key={key}
                small={!this.state.memberPanelOpen}
                title={data.value.name}
                onClick={() => this.openProfile(data.value, 'Member')}
              >
                <Avatar className="Avatar" src={avatarImage} />
                <span>{data.value.name}</span>
              </Member>
            ))
          ) : (
            <LoaderContainer>
              <CircularProgress />
            </LoaderContainer>
          )}
        </Members>
      </MemberContainer>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

const mapStateToProps = state => ({
  user: state && state.user && state.user.user,
  members: state && state.chat && state.chat.members,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(_Members);
