import React from 'react';
import { indigo, blackA } from '@radix-ui/colors';
import styled, { keyframes, css } from 'styled-components';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { ActiveButton, Button, SlateButton, SilverButton } from './Button';

export const Overlay = styled(DialogPrimitive.Overlay)({
  position: 'fixed',
  inset: 0,
  zIndex: 101,
});

export const Content = styled(DialogPrimitive.Content)`
  background-color: white;
  border-radius: ${(props) => props.theme.rounding.l};
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-height: 85vh;
  padding: 2rem;
  z-index: 102;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  font-size: ${(props) => props.theme.fontSize.l};
`;

export const Inner = React.forwardRef(
  (
    { children, overlayColor = blackA.blackA9, overlayBlur = 0, forceMount = false, maxWidth = 450, onOpenAutoFocus },
    ref
  ) => {
    return (
      <Portal forceMount={forceMount}>
        <Overlay style={{ backgroundColor: overlayColor, backdropFilter: `blur(${overlayBlur}px)` }}></Overlay>
        <Content ref={ref} onOpenAutoFocus={onOpenAutoFocus} style={{ maxWidth: maxWidth + 'px' }}>
          <ContentWrapper>{children}</ContentWrapper>
        </Content>
      </Portal>
    );
  }
);

export const Title = styled(DialogPrimitive.Title)`
  font-weight: 600;
  font-size: 1.6em;
  margin: 0 0 0.5rem 0;
  word-break: break-word;
`;

export const TitleItem = styled.span`
  color: #999;
  margin-left: 0.5rem;
  font-weight: normal;
`;

export const Text = styled.div`
  line-height: 1.4;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0;

  a {
    color: ${(props) => props.theme.colors.link};
  }

  a:hover {
    color: ${(props) => props.theme.colors.linkOver};
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  gap: 15px;
  margin-top: 15px;
`;

export const Busy = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, 0.8);
  border-radius: ${(props) => props.theme.rounding.l};
  z-index: 10;
`;

const CrossButton = styled(DialogPrimitive.Close)({
  all: 'unset',
  fontFamily: 'inherit',
  borderRadius: '100%',
  height: 25,
  width: 25,
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: blackA.blackA11,
  position: 'absolute',
  top: 10,
  right: 10,

  '&:hover': { backgroundColor: blackA.blackA7 },
});

export const Cross = () => {
  return (
    <CrossButton>
      <Cross2Icon />
    </CrossButton>
  );
};

// Exports
export const Root = DialogPrimitive.Root;
export const Trigger = DialogPrimitive.Trigger;
export const Portal = DialogPrimitive.Portal;
export const Close = (props) => {
  return <DialogPrimitive.Close asChild {...props}></DialogPrimitive.Close>;
};
