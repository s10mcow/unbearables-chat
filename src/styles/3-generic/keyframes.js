import { css } from 'styled-components';

const keyframes = css`
  @keyframes scaleIn {
    from {
      transform: scale(0.2);
      opacity: 0;
    }

    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

export default keyframes;
