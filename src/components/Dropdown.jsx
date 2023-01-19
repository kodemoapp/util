import { blackA, blue, mauve } from '@radix-ui/colors';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import styled from 'styled-components';
import { popoverAnimationStyles } from '../animations';

export const Root = DropdownMenuPrimitive.Root;
export const Group = DropdownMenuPrimitive.Group;
export const Portal = DropdownMenuPrimitive.Portal;
export const Trigger = DropdownMenuPrimitive.Trigger;
export const RadioGroup = DropdownMenuPrimitive.RadioGroup;

const StyledContent = styled(DropdownMenuPrimitive.Content)`
  min-width: 220px;
  background-color: #fff;
  border-radius: ${(props) => props.theme.rounding.l};
  box-shadow: 0px 5px 38px -10px rgba(22, 23, 24, 0.35), 0px 5px 20px -15px rgba(22, 23, 24, 0.2);
  font-size: 14px;
  ${popoverAnimationStyles}
`;

export const Content = ({ children, ...props }) => {
  return (
    <DropdownMenuPrimitive.Portal>
      <StyledContent sideOffset={5} collisionPadding={20} {...props} style={{ zIndex: 100 }}>
        <div style={{ padding: '0.25rem', maxHeight: '70vh', overflow: 'auto' }}>{children}</div>
      </StyledContent>
    </DropdownMenuPrimitive.Portal>
  );
};

const itemStyles = {
  all: 'unset',
  lineHeight: 1,
  color: blackA.blackA12,
  borderRadius: (props) => props.theme.rounding.m,
  display: 'flex',
  alignItems: 'center',
  height: 32,
  padding: '0 0.5rem',
  position: 'relative',
  userSelect: 'none',
  cursor: 'pointer',

  '&[data-disabled]': {
    color: blackA.blackA10,
    pointerEvents: 'none',
  },

  '&:focus': {
    backgroundColor: blue.blue9,
    color: blue.blue1,
  },
};

export const Item = styled(DropdownMenuPrimitive.Item)({ ...itemStyles });
export const CheckboxItem = styled(DropdownMenuPrimitive.CheckboxItem)({ ...itemStyles });
export const RadioItem = styled(DropdownMenuPrimitive.RadioItem)({ ...itemStyles });

export const Label = styled(DropdownMenuPrimitive.Label)({
  padding: '0 0.5rem',
  display: 'flex',
  alignItems: 'center',
  height: 32,
  userSelect: 'none',
  color: blackA.blackA9,
});

export const Separator = styled(DropdownMenuPrimitive.Separator)({
  height: 1,
  backgroundColor: blackA.blackA4,
  margin: 5,
});

export const ItemIndicator = styled(DropdownMenuPrimitive.ItemIndicator)({
  position: 'absolute',
  left: 0,
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const StyledArrow = styled(DropdownMenuPrimitive.Arrow)({
  fill: 'white',
});

export const Arrow = (props) => {
  return <StyledArrow width={15} height={7} offset={10} {...props}></StyledArrow>;
};

export const RightSlot = styled.div({
  marginLeft: 'auto',
  paddingLeft: 20,
  ':focus > &': { color: 'white' },
  '[data-disabled] &': { color: mauve.mauve8 },
  '&.faded': { opacity: 0.4 },
});
