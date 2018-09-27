import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

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
    z-index: 1;
    top: 0;
    bottom: 0;
  `};
`;

export const Member = styled.div`
  display: flex;
  align-items: center;
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
`;

export const Members = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
`;
