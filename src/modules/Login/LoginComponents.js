import image from 'assets/images/splash.png';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 1;
  max-width: 400px;
  width: 400px;
  max-height: 500px;
  border-radius: 3px;
  .Card {
    flex: 1;
    width: 100%;
  }
`;

export const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex: 1;
  overflow-y: scroll;
  flex-direction: column;
  padding: 10px 5%;
  background-color: ${props => props.theme.colors.LIGHT_GREY};
  position: relative;
  &:after {
    content: '';
    position: absolute;
    left: 0;
    height: 100%;
    width: 100%;
    margin-top: -50px;
    background-image: url(${image});
    background-size: 800px;
    background-position: center;
    background-repeat: no-repeat;
  }
`;

export const Error = styled.div`
  display: flex;
  margin-top: 10px;
  padding: 20px 10px;
  color: ${props => props.theme.colors.RED};
`;
