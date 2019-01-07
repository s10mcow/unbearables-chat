//@flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { MdClose, MdMenu, MdArrowBack } from 'react-icons/md';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
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
  inputOpenFileRef = React.createRef();

  userUpdateInfo = ({ username }) => {
    if (username !== this.props.user.displayName) {
      this.props.userUpdateInfo(username);
    }
  };

  uploadImage = () => {
    this.inputOpenFileRef.current.click();
  };

  onChangeFile = event => {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    this.props.userUpdateProfile(file);
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
          {user && user.photoURL ? (
            <Avatar className="Avatar" src={user.photoURL} />
          ) : (
            <Avatar className="Avatar">
              {user && user.name && user.name[0].toUpperCase()}
            </Avatar>
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
            <input
              ref={this.inputOpenFileRef}
              type="file"
              style={{ display: 'none' }}
              onChange={this.onChangeFile}
            />

            {user && user.photoURL ? (
              <Avatar className="Avatar" src={user.photoURL} />
            ) : (
              <Avatar className="Avatar" onClick={this.uploadImage}>
                {user && user.name && user.name[0].toUpperCase()}
              </Avatar>
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
      userUpdateProfile: file => actions.userUpdateProfile(file),
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(Bearatar);
