import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { blackA } from '@radix-ui/colors';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

const fadeIn = keyframes`
  from: { opacity: 0 }
  to: { opacity: 1 }
`;

const radius = 4;

export const Content = styled(TooltipPrimitive.Content)<any>`
  border-radius: ${radius}px;
  padding: 8px 12px;
  font-size: ${({ theme }) => theme.fontSize.s};
  line-height: 1;
  color: white;
  background-color: ${blackA.blackA12};
  boxshadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;

  @media (prefers-reduced-motion: no-preference) {
    animation-duration: 400ms;
    animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
    animation-fill-mode: forwards;
    will-change: transform, opacity;

    &[data-state='delayed-open'] {
      animation-name: ${fadeIn};
    }
  }
`;

export const Arrow = styled(TooltipPrimitive.Arrow)({
  fill: blackA.blackA12,
});

export const Provider = (props: any) => {
  return <TooltipPrimitive.Provider disableHoverableContent={true} {...props}></TooltipPrimitive.Provider>;
};

export const Root = TooltipPrimitive.Root;
export const Trigger = TooltipPrimitive.Trigger;

export interface ITipProps {
  text: string;
  shortcut?: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  children: any;
}
export const Tip = React.forwardRef<any, ITipProps>(({ text, shortcut, side = 'top', children }, forwardRef) => {
  return (
    <Root>
      <Trigger asChild ref={forwardRef}>
        {children}
      </Trigger>
      <TooltipPrimitive.Portal>
        <Content side={side} sideOffset={5} style={{ zIndex: 100 }} collisionPadding={20}>
          {text}
          {shortcut && <span style={{ opacity: 0.7, marginLeft: 8 }}>{shortcut}</span>}
          <Arrow offset={radius} width={8} height={4} />
        </Content>
      </TooltipPrimitive.Portal>
    </Root>
  );
});
