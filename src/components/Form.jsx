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
    format: (value) => {
      return value.replace(/[^a-zA-Z0-9-._~:/?#\[\]@!$&'()*+,;=]/g, '');
    },
    validate: (value) => {
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
    validate: (value) => {
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

export const StyledTextInput = styled.input`
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

const TextInputButton = styled.button`
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

export const TextInput = React.forwardRef(({ onCopyToClipboard, onConfirm, ...props }, forwardRef) => {
  const ref = React.useRef(null);

  React.useImperativeHandle(forwardRef, () => ref.current);

  const handleMouseDown = (event) => {
    if (props.selectOnFocus === true) {
      event.preventDefault();
      event.target.select();
    }
  };

  const handleInput = (event) => {
    if (typeof props.formatter === 'function') {
      ref.current.value = props.formatter(ref.current.value);
    }

    if (typeof props.onInput === 'function') {
      props.onInput(event);
    }
  };

  const handleBlur = () => {
    if (typeof props.formatter === 'function') {
      ref.current.value = props.formatter(ref.current.value);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (onConfirm) onConfirm();
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(ref.current.value);
    if (onCopyToClipboard) onCopyToClipboard();
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
});

export const TextInputWithClearButton = React.forwardRef((props, forwardRef) => {
  const [clearable, setClearable] = React.useState(
    typeof props.defaultValue === 'string' && props.defaultValue.length > 0
  );

  const handleChange = (event) => {
    setClearable(forwardRef.current.value.length > 0);

    if (typeof props.onChange === 'function') {
      props.onChange(event);
    }
  };

  React.useEffect(() => {
    setClearable(forwardRef.current.value.length > 0);
  }, [props.defaultValue]);

  return (
    <TextInputWithButtonWrapper>
      <TextInput ref={forwardRef} {...props} onChange={handleChange}></TextInput>
      {clearable && (
        <TextInputButton
          onClick={(event) => {
            forwardRef.current.value = '';
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
