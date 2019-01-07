//@flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { MdClose, MdMenu, MdArrowBack } from 'react-icons/md';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import avatarImage from 'assets/images/logo.jpg';
import { type UserObjectType } from 'src/types';
import UserEditForm from './UserEditForm';
import { bindActionCreators } from 'redux';
import actions from 'src/store/user/user.action';
import distanceInWords from 'date-fns/distance_in_words';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  border-right: ${props => `1px solid ${props.theme.colors.LIGHT_GREY}`};
  background-color: ${props => props.theme.colors.LIGHTER_GREY};
  flex-direction: ${props => (props.memberPanelOpen ? 'row' : 'column')};
  padding: ${props => (props.memberPanelOpen ? '20px' : '5px')};
  padding-right: ${props => (props.memberPanelOpen ? '0' : '5px')};
  font-size: 36px;
  min-height: 60px;
  max-height: 60px;
  width: 100%;
  & > .AvatarButton {
    order: ${props => (props.memberPanelOpen ? 1 : 2)};
  }
  & > .MemberPanelButton {
    order: ${props => (props.memberPanelOpen ? 2 : 1)};
  }
`;

const AvatarPanel = styled.article`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  z-index: 1;
  transition: all 0.2s ease-in-out;
  transform: ${props =>
    props.isAvatarOpen ? 'translateX(0)' : 'translateX(-100%)'};
  left: 0;
  bottom: 0;
  width: 300px;
  background-color: ${props => props.theme.colors.LIGHTER_GREY};
  header {
    display: flex;
    align-items: center;
    height: 120px;
    width: 100%;
    color: white;
    padding-top: 60px;
    font-size: 24px;
    background-color: ${props => props.theme.colors.LIGHT_GREEN};
    .MemberPanelButton {
      color: white;
    }
  }

  main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    padding: 20px;
    font-size: 48px;
    .Avatar {
      width: 120px;
      height: 120px;
    }
    .MemberName {
      font-size: 24px;
      text-align: center;
      margin-bottom: 5px;
    }
    .MemberLastSeen {
      font-size: 16px;
    }
  }
`;

type Props = {
  toggleMemberPanel: Function,
  toggleAvatarOpen: Function,
  openProfile: Function,
  memberPanelOpen: boolean,
  isAvatarOpen: boolean,
  user: UserObjectType | { name: string, lastSeen: string, at: string },
  userUpdateInfo: Function,
  type: string,
};

class Bearatar extends React.PureComponent<Props> {
  userUpdateInfo = ({ username }) => {
    if (username !== this.props.user.displayName) {
      this.props.userUpdateInfo(username);
    }
  };
  render() {
    const {
      toggleMemberPanel,
      memberPanelOpen,
      user,
      type,
      isAvatarOpen,
      toggleAvatarOpen,
      openProfile,
    } = this.props;
    return (
      <Wrapper {...this.props}>
        <IconButton className="AvatarButton" onClick={openProfile}>
          {user && user.photoUrl ? (
            <Avatar className="Avatar" src={avatarImage} />
          ) : (
            <Avatar className="Avatar">H</Avatar>
          )}{' '}
        </IconButton>
        <IconButton onClick={toggleMemberPanel} className="MemberPanelButton">
          {memberPanelOpen ? <MdClose /> : <MdMenu />}
        </IconButton>

        <AvatarPanel isAvatarOpen={isAvatarOpen}>
          <header>
            <IconButton
              onClick={toggleAvatarOpen}
              className="MemberPanelButton"
            >
              <MdArrowBack />
            </IconButton>
            {type}
          </header>
          <main>
            {user && user.photoUrl ? (
              <Avatar className="Avatar" src={avatarImage} />
            ) : (
              <Avatar className="Avatar">H</Avatar>
            )}
            {type === 'Profile' && (
              <UserEditForm user={user} onSubmit={this.userUpdateInfo} />
            )}
            {type === 'Member' && (
              <div>
                <div className="MemberName">{user.name}</div>
                <div className="MemberLastSeen">{`Last seen ${distanceInWords(
                  Date.now(),
                  user.lastSeen || user.at
                )} ago`}</div>
              </div>
            )}
          </main>
        </AvatarPanel>
      </Wrapper>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      userUpdateInfo: username => actions.userUpdateInfo(username),
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(Bearatar);
