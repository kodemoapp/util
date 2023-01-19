import { indigo } from '@radix-ui/colors';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import React from 'react';
import styled, { css } from 'styled-components';
import { popoverAnimationStyles } from '../animations';
import { ActiveButton, Button } from './Button';

const StyledContent = styled(PopoverPrimitive.Content)`
  min-width: 200px;
  background-color: #fff;
  padding: 1.25rem;
  border-radius: ${(props) => props.theme.rounding.l};
  box-shadow: 0px 2px 4px rgba(22, 23, 24, 0.05), 0px 5px 38px -10px rgba(22, 23, 24, 0.35),
    0px 5px 20px -15px rgba(22, 23, 24, 0.2);
  font-size: 14px;
  &:focus {
    box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px,
      0 0 0 2px ${indigo.indigo7};
  }
  ${popoverAnimationStyles}
`;

export const Content = React.forwardRef<typeof PopoverPrimitive.Content, any>((props, forwardRef) => {
  return <StyledContent ref={forwardRef} sideOffset={5} {...props}></StyledContent>;
});

const StyledArrow = styled(PopoverPrimitive.Arrow)({
  fill: 'white',
});

export const Arrow = (props: any) => {
  return <StyledArrow width={15} height={7} offset={10} {...props}></StyledArrow>;
};

const StyledClose = styled(PopoverPrimitive.Close)({
  all: 'unset',
  fontFamily: 'inherit',
  borderRadius: '100%',
  height: 25,
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: indigo.indigo11,
  position: 'absolute',
  top: 5,
  right: 5,

  '&:hover': { backgroundColor: indigo.indigo4 },
  '&:focus': { boxShadow: `0 0 0 2px ${indigo.indigo7}` },
});

// Exports
export const Root = PopoverPrimitive.Root;
export const Trigger = PopoverPrimitive.Trigger;
export const Close = StyledClose;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const Title = styled.h3`
  font-weight: 400;
  font-size: 1.1em;
  margin: 0;
`;

const ActionWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 10px;
`;

export interface IConfirmationPopoverProps {
  title: string;
  children: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm?: Function;
  onCancel?: Function;
}
export const Confirmation = React.forwardRef<any, IConfirmationPopoverProps>(
  (
    { title, confirmLabel = 'OK', cancelLabel = 'Cancel', onConfirm, onCancel, children, open, onOpenChange, ...props },
    ref
  ) => {
    return (
      <Root open={open} onOpenChange={onOpenChange}>
        <Trigger asChild {...props} ref={ref}>
          {children}
        </Trigger>
        <PopoverPrimitive.Portal>
          <Content onClick={(event: Event) => event.stopPropagation()} style={{ zIndex: 100 }} collisionPadding={20}>
            <ContentWrapper>
              <Title>{title}</Title>
              <ActionWrapper>
                {onConfirm && (
                  <PopoverPrimitive.Close asChild>
                    <ActiveButton onClick={onConfirm}>{confirmLabel}</ActiveButton>
                  </PopoverPrimitive.Close>
                )}
                <PopoverPrimitive.Close asChild aria-label="Close">
                  <Button>{cancelLabel}</Button>
                </PopoverPrimitive.Close>
              </ActionWrapper>
            </ContentWrapper>
            <Arrow />
          </Content>
        </PopoverPrimitive.Portal>
      </Root>
    );
  }
);
