import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { blackA, whiteA } from '@radix-ui/colors';
import * as SliderPrimitive from '@radix-ui/react-slider';

export const Root = styled(SliderPrimitive.Root)<any>`
  --track-bg: ${blackA.blackA8};
  --range-bg: ${blackA.blackA12};
  --thumb-hover-outline: ${blackA.blackA4};
  --thumb-focus-outline: ${blackA.blackA8};

  ${(props) =>
    props.variant === 'dark' &&
    css`
      --track-bg: ${whiteA.whiteA7};
      --range-bg: ${whiteA.whiteA12};
      --thumb-hover-outline: ${whiteA.whiteA6};
      --thumb-focus-outline: ${whiteA.whiteA10};
    `}

  position: relative;
  display: flex;
  align-items: center;
  user-select: none;
  touch-action: none;
  width: ${(props) => props.width || 200}px;
  height: 20px;
`;

export const Track = styled(SliderPrimitive.Track)<any>`
  background-color: var(--track-bg);
  position: relative;
  flex-grow: 1;
  border-radius: 9999px;
  height: 3px;
`;

export const Range = styled(SliderPrimitive.Range)<any>`
  position: absolute;
  background-color: var(--range-bg);
  border-radius: 9999px;
  height: 100%;
`;

export const Thumb = styled(SliderPrimitive.Thumb)<any>`
  display: block;
  width: 20px;
  height: 20px;
  background-color: white;
  box-shadow: 0 2px 10px ${blackA.blackA7};
  border-radius: 10px;

  &:hover {
    box-shadow: 0 0 0 5px var(--thumb-hover-outline);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 5px var(--thumb-focus-outline);
  }
`;

export const Default = React.forwardRef<any, any>((props, forwardRef) => {
  return (
    <Root ref={forwardRef} {...props}>
      <Track>
        <Range />
      </Track>
      <Thumb />
    </Root>
  );
});
