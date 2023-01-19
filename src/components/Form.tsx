import React from 'react';
import styled, { css } from 'styled-components';
import { mauve } from '@radix-ui/colors';
import { ClipboardCopyIcon, CopyIcon, CrossCircledIcon } from '@radix-ui/react-icons';

const inputHeight = 29;
const textInputButtonWidth = 30;
const inputOutlineColor = mauve.mauve7;
const inputOutlineColorDarkMode = mauve.mauve11;

export const TextInputTypes = {
  url: {
    format: (value: string) => {
      return value.replace(/[^a-zA-Z0-9-._~:/?#\[\]@!$&'()*+,;=]/g, '');
    },
    validate: (value: string) => {
      let url;
      try {
        url = new URL(value);
      } catch (e) {
        return false;
      }
      return url.protocol === 'http:' || url.protocol === 'https:';
    },
  },
  email: {
    validate: (value: string) => {
      return /^\S+@\S+\.\S+$/g.test(value);
    },
  },
};

export const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
  border: 0;
  padding: 0;
`;

export const InputRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 10px;
  border: 0;
  padding: 0;
`;

export const Label = styled.label`
  width: auto;
`;

export const LabelSubText = styled.span`
  &:before {
    content: '–';
    padding: 0 6px;
  }
`;

export const StyledTextInput = styled.input<{
  variant?: 'dark';
  seamless?: boolean;
  smooth?: boolean;
  [key: string]: any;
}>`
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  border: 0;
  outline: 0;
  border-radius: 2px;
  padding: 0 10px;
  line-height: ${inputHeight}px;
  box-shadow: 0 0 0 1px ${inputOutlineColor};
  font-size: inherit;
  -webkit-appearance: none;

  ${(props) =>
    props.variant === 'dark' &&
    css`
      color: #fff;
      background: rgba(255, 255, 255, 0.1);
      box-shadow: 0 0 0 1px ${inputOutlineColorDarkMode};
    `}

  ${(props) =>
    props.seamless &&
    css`
      box-shadow: none;
    `}

  ${(props) =>
    props.smooth &&
    css`
      border-radius: 100px;
    `}

  &::placeholder {
    color: ${mauve.mauve9};
  }

  &:focus {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.active};
  }
`;

const TextInputWithButtonWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;

  ${StyledTextInput} {
    padding-right: ${textInputButtonWidth}px;
  }
`;

const TextInputButton = styled.button<{
  variant?: 'dark';
  smooth?: boolean;
}>`
  height: 100%;
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  width: ${textInputButtonWidth}px;
  border-left: 1px solid ${inputOutlineColor};
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  justify-content: center;

  ${(props) =>
    props.variant === 'dark'
      ? css`
          border-left: 0;
        `
      : css`
          &:hover {
            background-color: ${mauve.mauve3};
          }
        `}

  ${(props) =>
    props.smooth &&
    css`
      border-top-right-radius: 100px;
      border-bottom-right-radius: 100px; ;
    `}
`;

type TextInputProps = React.ComponentPropsWithRef<'input'> & {
  selectOnFocus?: boolean;
  copyToClipboard?: boolean;
  variant?: 'dark';
  seamless?: boolean;
  smooth?: boolean;
  type?: 'text' | 'email' | 'url';
  formatter?: (value: string) => string;
  onInput?: (event: React.FormEventHandler<HTMLInputElement>) => void;
  onChange?: (value: string) => void;
  onCopyToClipboard?: () => void;
  onConfirm?: () => void;
};

export const TextInput = React.forwardRef<any, TextInputProps>(
  ({ onCopyToClipboard, onConfirm, ...props }, forwardRef) => {
    const ref = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(forwardRef, () => ref.current);

    const handleMouseDown = (event: React.MouseEvent) => {
      if (props.selectOnFocus === true && event.target instanceof HTMLInputElement) {
        event.preventDefault();
        event.target.select();
      }
    };

    const handleInput = (event: React.FormEventHandler<HTMLInputElement>) => {
      if (typeof props.formatter === 'function' && ref.current) {
        ref.current.value = props.formatter(ref.current.value);
      }

      if (typeof props.onInput === 'function') {
        props.onInput(event);
      }
    };

    const handleBlur = () => {
      if (typeof props.formatter === 'function' && ref.current) {
        ref.current.value = props.formatter(ref.current.value);
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === 'Enter') {
        if (onConfirm) onConfirm();
      }
    };

    const handleCopyToClipboard = () => {
      if (ref.current) {
        navigator.clipboard.writeText(ref.current.value);
        if (onCopyToClipboard) onCopyToClipboard();
      }
    };

    if (props.copyToClipboard === true) {
      return (
        <TextInputWithButtonWrapper>
          <StyledTextInput
            ref={ref}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            onMouseDown={handleMouseDown}
            onBlur={handleBlur}
            {...props}
          />
          <TextInputButton onClick={handleCopyToClipboard}>
            <ClipboardCopyIcon></ClipboardCopyIcon>
          </TextInputButton>
        </TextInputWithButtonWrapper>
      );
    }

    return (
      <StyledTextInput
        ref={ref}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        onBlur={handleBlur}
        {...props}
      />
    );
  }
);

type TextInputWithClearButtonProps = React.ComponentPropsWithRef<any> & {
  defaultValue?: string;
  variant?: 'dark';
  seamless?: boolean;
  smooth?: boolean;
  type?: 'text' | 'email' | 'url';
  onChange?: (value: string) => void;
};

export const TextInputWithClearButton = React.forwardRef<any, TextInputWithClearButtonProps>((props, forwardRef) => {
  const ref = React.useRef<HTMLInputElement>(null);

  const [clearable, setClearable] = React.useState(
    typeof props.defaultValue === 'string' && props.defaultValue.length > 0
  );

  React.useImperativeHandle(forwardRef, () => ref.current);

  const handleChange = () => {
    if (ref.current) {
      setClearable(ref.current.value.length > 0);

      if (typeof props.onChange === 'function') {
        props.onChange(ref.current.value);
      }
    }
  };

  React.useEffect(() => {
    if (ref.current) {
      setClearable(ref.current.value.length > 0);
    }
  }, [props.defaultValue]);

  return (
    <TextInputWithButtonWrapper>
      <TextInput ref={ref} {...props} onChange={handleChange}></TextInput>
      {clearable && (
        <TextInputButton
          onClick={(event) => {
            if (ref.current) ref.current.value = '';
            handleChange();
          }}
          variant={props.variant}
          smooth={props.smooth}
        >
          <CrossCircledIcon width="18" height="18" />
        </TextInputButton>
      )}
    </TextInputWithButtonWrapper>
  );
});
