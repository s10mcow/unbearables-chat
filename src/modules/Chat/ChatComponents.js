import React from 'react';
import styled from 'styled-components';
//import image from 'assets/images/splash.png';
import Menu from 'src/components/Menu/Menu';
import { MdMoreVert } from 'react-icons/md';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import breakpoint from 'styled-components-breakpoint';

export const LogoutMenu = props => (
  <Menu
    MenuLabel={props => (
      <IconButton onClick={props.onClick}>
        <MdMoreVert />
      </IconButton>
    )}
  >
    <MenuItem onClick={props.logout}>Logout</MenuItem>
  </Menu>
);

export const ChatContainer = styled.ul`
  display: flex;
  flex: 1;
  overflow-y: auto;
  flex-direction: column;
  padding: 10px 5% 0;
  background-color: ${props => props.theme.colors.LIGHT_GREY};
  position: relative;

  .messagesEnd {
    display: flex;
    min-height: 5px;
  }
`;

export const ChatLine = styled.li`
  position: relative;
  align-self: ${props => (props.ownUser ? 'flex-end' : 'flex-start')};
  padding: 6px 7px 8px 9px;
  max-width: 400px;
  font-size: 16px;
  .name {
    font-weight: bold;
    margin-bottom: 5px;
  }
  .timestamp {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    justify-self: flex-end;
    font-size: 12px;
    color: ${props => props.theme.colors.LIGHTISH_GREY};
  }
  background-color: ${props =>
    props.ownUser ? props.theme.colors.WHITE : props.theme.colors.WHITE};
  border-radius: 7.5px;
  box-shadow: 0 1px 0.5px rgba(0, 0, 0, 0.13);
  margin: 0 10px 10px;
  &:after {
    content: '';
    position: absolute;
    width: 12px;
    height: 19px;
    top: 5px;
    left: ${props => (props.ownUser ? '' : '-12px')};
    right: ${props => (props.ownUser ? '-12px' : '')};
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: ${props =>
    props.ownUser
      ? 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAmCAMAAADp2asXAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAACQUExURUxpcSsrK/39/QAAAAAAABISEoODg////wAAAA0NDZeXl7S0tPv7+////wAAAP///2dnZ8/Pz4iIiOrq6nV1dfn5+f///93d3RcXF0lJSaqqqsLCwgAAAB8fH1dXV/Pz8zo6OgAAADc3NwAAAIeHh9zc3Obm5v///1xcXN3d3f///wAAAOzs7MLCwv///////1s/+vgAAAAvdFJOUwA19ggBG4TqAhONqOruFvxlw3/Xb/D6zyBJnbYFKVfhPQ1ACXfKzOYLkusM4nrIpGYF8gAAAHVJREFUKM/tzTcOAgEMBdEBFtgl55xz5v63o0GCYlzSMeV/sky9/O5yfNxPfHp+d04CuF0DOGwD2AU/9plDf4VDD4dqwaE7QiE/xqFDojBdoxfLOQrNBQ6V1KGdoVDL4dDCYTJzGBZ1Z7DxnVKw04gg5d/PegEHGyFTZXzQ2gAAAABJRU5ErkJggg==)'
      : 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAmCAMAAADp2asXAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAACQUExURUxpccPDw9ra2m9vbwAAAAAAADExMf///wAAABoaGk9PT7q6uqurqwsLCycnJz4+PtDQ0JycnIyMjPf3915eXvz8/E9PT/39/RMTE4CAgAAAAJqamv////////r6+u/v7yUlJeXl5f///5ycnOXl5XNzc/Hx8f///xUVFf///+zs7P///+bm5gAAAM7Ozv///2fVensAAAAvdFJOUwCow1cBCCnqAhNAnY0WIDW2f2/hSeo99g1lBYT87vDXG8/6d8oL4sgM5szrkgl660OiZwAAAHRJREFUKM/ty7cSggAABNFVUQFzwizmjPz/39k4YuFWtm55bw7eHR6ny63+alnswT3/rIDzUSC7CrAziPYCJCsB+gbVkgDtVIDh+DsE9OTBpCtAbSBAZSEQNgWIygJ0RgJMDWYNAdYbAeKtAHODlkHIv997AkLqIVOXVU84AAAAAElFTkSuQmCC)'};
  }
`;

export const Container = styled.div`
  display: flex;
  height: 100%;
  width: 1396px;
  margin: 0 auto;
  background-color: #ccc;
  border-radius: 3px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.06), 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  margin: 0 auto;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.LIGHT_GREY};
  
`;

export const OuterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 50px;
  ${breakpoint('mobile', 'desktop')`
    padding: 0;
    max-height: 100vh;
    overflow: hidden;
  `};
`;

export const LoaderContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;

export const Header = styled.header`
  background-color: ${props => props.theme.colors.LIGHTER_GREY};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  font-size: 18px;
  padding: 0 10px;
  border-right: ${props =>
    props.borderRight ? `2px solid ${props.theme.colors.LIGHT_GREY}` : ''};
  span {
    flex: 1;

    min-height: 1px;
    min-width: 1px;
  }
  .Button {
    margin-left: auto;
  }
`;
