import styled from 'styled-components';
import { mauve, blue } from '@radix-ui/colors';
import React, { Component, ForwardedRef, ReactNode } from 'react';

const buttonStyles = {
  display: 'inline-flex',
  border: 0,
  borderRadius: (prop: any) => prop.theme.rounding.m,
  padding: '0.5em 0.75em',
  lineHeight: '1',
  backgroundColor: '#eee',
  textDecoration: 'none',
  fontSize: 'inherit',
  textAlign: 'left',
  alignItems: 'center',

  '&:hover': {
    backgroundColor: '#ddd',
  },

  '&[data-rounding="m"]': { borderRadius: (props: any) => props.theme.rounding.m },
  '&[data-rounding="l"]': { borderRadius: (props: any) => props.theme.rounding.l },

  '&[data-size="m"]': { fontSize: '1em' },
  '&[data-size="l"]': { fontSize: '1.25em' },

  '.icon': {
    marginLeft: 8,
  },
};

export interface IBaseButtonProps {
  as?: any;
  href?: string;
  onClick?: any;
  children?: any;
}
const BaseButton = React.forwardRef<any, IBaseButtonProps>((props, ref) => {
  if (props.as) {
    const Node = props.as;
    return <Node ref={ref} {...props}></Node>;
  } else if (props.href) {
    return <a ref={ref} {...props}></a>;
  } else {
    return <button ref={ref} {...props}></button>;
  }
});

// @ts-ignore
export const Button = styled(BaseButton)({ ...buttonStyles });

export const SilverButton = styled(Button)({
  backgroundColor: mauve.mauve3,
  color: '#222',

  '&:hover': {
    backgroundColor: mauve.mauve5,
  },
});

export const SlateButton = styled(Button)({
  backgroundColor: mauve.mauve11,
  color: '#fff',

  '&:hover': {
    backgroundColor: mauve.mauve12,
  },
});

export const WhiteButton = styled(Button)({
  backgroundColor: '#fff',
  color: '#000',

  '&:hover': {
    backgroundColor: mauve.mauve3,
  },
});

export const DarkButton = styled(Button)({
  backgroundColor: '#292a2e',
  color: '#fff',

  '&:hover': {
    backgroundColor: '#121315',
  },
});

export const DarkButtonOnDarkBackground = styled(DarkButton)({
  '&:hover': {
    backgroundColor: '#4b4d55',
  },
});

export const ActiveButton = styled(Button)({
  backgroundColor: blue.blue9,
  color: '#fff',

  '&:hover': {
    backgroundColor: blue.blue11,
  },
});

export const IconButton = styled(Button)({
  backgroundColor: 'transparent',

  svg: {
    margin: 0,
  },

  '&:hover': {
    backgroundColor: mauve.mauve3,
  },
});
