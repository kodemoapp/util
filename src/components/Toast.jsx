import * as ToastPrimitive from '@radix-ui/react-toast';
import { slate, blue, blackA } from '@radix-ui/colors';
import styled, { keyframes } from 'styled-components';
import { Cross2Icon } from '@radix-ui/react-icons';

const VIEWPORT_PADDING = 25;

const toastIntro = keyframes`
0% { opacity: 0; transform: scale(0.7) translateY(10px); }
100% { opacity: 1; transform: none; }
`;

const slideOut = keyframes`
0% { opacity: 1; transform: translateX(0); }
100% { opacity: 0; transform: translateX(calc(100% + ${VIEWPORT_PADDING * 2}px)); }
`;
const fadeOut = keyframes`
0%: { opacity: 1; }
100%: { opacity: 0; }
`;

export const Viewport = styled(ToastPrimitive.Viewport)({
  position: 'fixed',
  bottom: 0,
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  padding: VIEWPORT_PADDING,
  gap: 10,
  margin: 0,
  listStyle: 'none',
  zIndex: 2147483647,
  outline: 'none',
  alignItems: 'flex-end',
});

export const Root = styled(ToastPrimitive.Root)`
  background-color: #111;
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  padding: 15px;
  display: grid;
  grid-template-areas: 'title action' 'description action';
  grid-template-columns: auto max-content;
  align-items: center;
  color: #fff;
  max-width: 390px;
  width: max-content;

  ${(props) =>
    props.variant &&
    `
    background-color: #df2f2f;
    color: #fff;
  `};

  ${(props) =>
    props.multicol &&
    `
    column-gap: 15px;
  `};

  @media (prefers-reduced-motion: no-preference) {
    &[data-state='open'] {
      animation: 400ms ${(props) => props.theme.ease.outQuint} 0s ${toastIntro};
    }
    &[data-state='closed'] {
      animation: 300ms ${(props) => props.theme.ease.outQuint} 0s ${fadeOut};
    }
    &[data-swipe='move'] {
      transform: translateX(var(--radix-toast-swipe-move-x));
    }
    &[data-swipe='cancel'] {
      transform: translateX(0);
      transition: transform 200ms ease-out;
    }
    &[data-swipe='end'] {
      animation: 300ms ${(props) => props.theme.ease.outQuint} 0s ${slideOut};
    }
  }
`;

export const Title = styled(ToastPrimitive.Title)({
  gridArea: 'title',
  display: 'flex',
  gap: 10,
  alignItems: 'center',
  marginBottom: 5,
  fontWeight: 500,
  fontSize: 16,
  '&:last-child': {
    marginBottom: 0,
  },
});

export const Description = styled(ToastPrimitive.Description)({
  gridArea: 'description',
  margin: 0,
  opacity: 0.5,
  fontSize: 14,
  lineHeight: 1.3,
});

export const Action = styled(ToastPrimitive.Action)({
  gridArea: 'action',
});

export const Provider = ToastPrimitive.Provider;

export const Close = styled(ToastPrimitive.Close)({
  borderRadius: '100%',
  position: 'relative',
  height: 25,
  width: 25,
  top: -5,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',

  '&:hover': { backgroundColor: blackA.blackA7 },
  '&:focus': { boxShadow: `0 0 0 2px ${blue.blue7}` },
});

const MessageToast = ({ title, description, icon, variant, open, closable = true, onOpenChange }) => {
  return (
    <Root open={open} variant={variant} multicol={closable || icon} onOpenChange={onOpenChange}>
      <Title>
        {icon} {title}
      </Title>
      {description && <Description>{description}</Description>}
      {closable && (
        <Close>
          <Cross2Icon></Cross2Icon>
        </Close>
      )}
    </Root>
  );
};

export const Info = (props) => {
  return <MessageToast {...props}></MessageToast>;
};

export const Warning = (props) => {
  return <MessageToast variant="warning" {...props}></MessageToast>;
};
