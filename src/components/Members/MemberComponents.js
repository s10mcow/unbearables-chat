import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import avatarImage from 'assets/images/logo.jpg';
import Avatar from '@material-ui/core/Avatar';
import distanceInWords from 'date-fns/distance_in_words';
import isWithinRange from 'date-fns/is_within_range';
export const LoaderContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  padding-top: 10px;
`;

export const MemberContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: ${props => (props.isOpen ? '300px' : '50px')};
  transition: all 0.2s ease-out;
  position: relative;
  overflow: hidden;
  border-right: 1px solid rgba(0, 0, 0, 0.08);
  background-color: ${props => props.theme.colors.LIGHT_GREY};
  ${breakpoint('mobile', 'tablet')`
    position: ${props => (props.isOpen ? 'absolute' : '')};
    z-index: 2;
    top: 0;
    bottom: 0;
  `};
`;

const StyledMember = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  background: white;
  padding: 10px;
  font-size: 36px;
  cursor: pointer;
  min-height: ${props => (props.small ? '45px' : '60px')};
  box-shadow: 0 1px 0.5px rgba(0, 0, 0, 0.13);
  margin-bottom: 1px;
  span {
    display: ${props => (props.small ? 'none' : 'flex')};
    margin-left: 10px;
    font-size: 18px;
  }

  .Avatar {
    height: ${props => (props.small ? '35px' : '50px')};
    width: ${props => (props.small ? '35px' : '50px')};
  }

  .LastSeen {
    position: absolute;
    right: 10px;
    font-weight: bolddte fns;
    font-size: 12px;
    &--collapsed {
      top: 5px;
      right: 5px;
    }
  }
`;

export const Members = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const Cirlce = styled.div`
  display: flex;
  height: 10px;
  width: 10px;
  border-radius: 50%;
`;

const GreenCircle = styled(Cirlce)`
  background: ${props => props.theme.colors.LIGHTER_GREEN};
`;

const OrangeCircle = styled(Cirlce)`
  background: ${props => props.theme.colors.ORANGE};
`;

const RedCircle = styled(Cirlce)`
  background: ${props => props.theme.colors.RED};
`;

class NotificationColor extends React.PureComponent {
  state = {
    now: Date.now(),
  };

  interval = undefined;

  componentDidMount() {
    this.interval = setInterval(() => this.checkLastSeen(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  checkLastSeen() {
    this.setState({
      now: Date.now(),
    });
  }

  seenSince(now, lastSeen) {
    return `Last seen ${distanceInWords(now, lastSeen)} ago`;
  }
  render() {
    window.x = isWithinRange;
    const { lastSeen, collapsed } = this.props;
    const { now } = this.state;
    const fiveMinAgo = now - 5 * 60 * 1000;
    const oneHourAgo = now - 60 * 60 * 1000;
    const lastSeenSince = isWithinRange(lastSeen, fiveMinAgo, now) ? (
      <GreenCircle title={this.seenSince(now, lastSeen)} />
    ) : isWithinRange(lastSeen, oneHourAgo, fiveMinAgo) ? (
      <OrangeCircle title={this.seenSince(now, lastSeen)} />
    ) : (
      <RedCircle title={this.seenSince(now, lastSeen)} />
    );
    return (
      <div className={collapsed ? 'LastSeen LastSeen--collapsed' : 'LastSeen'}>
        {lastSeenSince}
      </div>
    );
  }
}

export class Member extends React.PureComponent {
  render() {
    const { data, memberPanelOpen } = this.props;
    return (
      <StyledMember {...this.props}>
        <Avatar className="Avatar" src={avatarImage} />
        <span>{data.name}</span>
        <NotificationColor
          lastSeen={data.lastSeen || data.at}
          collapsed={!memberPanelOpen}
        />
      </StyledMember>
    );
  }
}
