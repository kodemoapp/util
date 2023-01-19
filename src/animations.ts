import { css, keyframes } from 'styled-components';

export const popoverSlideUpAndFade = keyframes`
  0% { opacity: 0; transform: translateY(2px); }
  50% { opacity: 1; }
  100% { opacity: 1; transform: translateY(0); }
`;

export const popoverSlideRightAndFade = keyframes`
  0% { opacity: 0; transform: translateX(-2px); }
  50% { opacity: 1; }
  100% { opacity: 1; transform: translateX(0); }
`;

export const popoverSlideDownAndFade = keyframes`
  0% { opacity: 0; transform: translateY(-2px); }
  50% { opacity: 1; }
  100% { opacity: 1; transform: translateY(0); }
`;

export const popoverSlideLeftAndFade = keyframes`
  0% { opacity: 0; transform: translateX(2px); }
  50% { opacity: 1; }
  100% { opacity: 1; transform: translateX(0); }
`;

export const popoverAnimationStyles = css`
  @media (prefers-reduced-motion: no-preference) {
    animation-duration: 200ms;
    animation-timing-function: ${(props) => props.theme.ease.outQuint};
    will-change: transform, opacity;

    &[data-state='open'] {
      &[data-side='top'] {
        animation-name: ${popoverSlideDownAndFade};
      }
      &[data-side='right'] {
        animation-name: ${popoverSlideLeftAndFade};
      }
      &[data-side='bottom'] {
        animation-name: ${popoverSlideUpAndFade};
      }
      &[data-side='left'] {
        animation-name: ${popoverSlideRightAndFade};
      }
    }
  }
`;
