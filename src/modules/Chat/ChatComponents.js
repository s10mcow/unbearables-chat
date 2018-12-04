//@flow
import React from 'react';
import styled from 'styled-components';
//import image from 'assets/images/splash.png';
import Menu from 'src/components/Menu/Menu';
import { MdMoreVert } from 'react-icons/md';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import breakpoint from 'styled-components-breakpoint';
import distanceInWords from 'date-fns/distance_in_words';
import isWithinRange from 'date-fns/is_within_range';

export const LogoutMenu = (props: { onClick: ?Function, logout: Function }) => (
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
  min-width: 140px;
  background-color: ${props =>
    props.ownUser
      ? props.theme.colors.LIGHTER_GREEN
      : props.theme.colors.WHITE};
  border-radius: 7.5px;
  box-shadow: 0 1px 0.5px rgba(0, 0, 0, 0.13);
  margin: 0 10px 10px;
  word-break: break-all;
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
      ? 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAmCAYAAADeB1slAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAASFJREFUeNrs1DFqwzAUBuA/gUJD68WFeujgrsVzMRgKWQ3ZvXgtJlPpYApdOrhgL1myeOqs4EGTyQHUA/gEPoROoEyGEJLGivWgg4e3Sf/39CQELpnSKSHEZxzHN4vlO5RSZwu6AJdMtW27BjAhA7hkCsAtNTAjA/I8/+CS0d2BZVl3ZEAQBC9cMpC8ojRN37qNxoG6rjcArrlkIDmB4ziP++FGgTAMwy7cOFAUxReXDAAm++FGACHEFoB12LkxwHXdp2OjMQJEURT9FT4IKMtyBWB6KngQ0DTNb/cVkACe5z2fG83FQJIkr33DtYGqqn4AXPUJvgiwbfuhb+fagO/7c53RaAFZln3rBmsBAO6pgSkp0GfRkBqBERiBEfgPwG4A2zmjGTO+igUAAAAASUVORK5CYII=)'
      : 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAmCAMAAADp2asXAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAACQUExURUxpccPDw9ra2m9vbwAAAAAAADExMf///wAAABoaGk9PT7q6uqurqwsLCycnJz4+PtDQ0JycnIyMjPf3915eXvz8/E9PT/39/RMTE4CAgAAAAJqamv////////r6+u/v7yUlJeXl5f///5ycnOXl5XNzc/Hx8f///xUVFf///+zs7P///+bm5gAAAM7Ozv///2fVensAAAAvdFJOUwCow1cBCCnqAhNAnY0WIDW2f2/hSeo99g1lBYT87vDXG8/6d8oL4sgM5szrkgl660OiZwAAAHRJREFUKM/ty7cSggAABNFVUQFzwizmjPz/39k4YuFWtm55bw7eHR6ny63+alnswT3/rIDzUSC7CrAziPYCJCsB+gbVkgDtVIDh+DsE9OTBpCtAbSBAZSEQNgWIygJ0RgJMDWYNAdYbAeKtAHODlkHIv997AkLqIVOXVU84AAAAAElFTkSuQmCC)'};
  }
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

  .highlight {
    background-color: ${props => props.theme.colors.LIGHT_GREEN};
    color: white;
    padding: 3px;
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

type TimeProps = {
  from: number,
};

type TimeState = {
  now: number,
};

export class TimeFrom extends React.PureComponent<TimeProps, TimeState> {
  state = {
    now: Date.now(),
  };

  interval = undefined;

  newMinute() {
    this.setState({
      now: Date.now(),
    });
  }

  getInterval() {
    const { from } = this.props;
    const now = Date.now();
    const oneHourAgo = now - 60 * 60 * 1000;
    return isWithinRange(from, oneHourAgo, now) ? 60 * 1000 : 60 * 60 * 1000;
  }

  componentDidMount() {
    this.interval = setInterval(() => this.newMinute(), this.getInterval());
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { from } = this.props;
    return (
      <div className="timestamp">
        {distanceInWords(this.state.now, from) + ' ago'}
      </div>
    );
  }
}
