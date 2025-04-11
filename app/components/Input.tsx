import React, { InputHTMLAttributes, useState } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 24px;
  width: 100%;
`;

const Label = styled.label<{ isActive: boolean; hasError: boolean }>`
  position: absolute;
  left: 16px;
  color: ${props => props.hasError ? '#ff3b30' : props.isActive ? '#4c6ef5' : '#9e9e9e'};
  pointer-events: none;
  transform-origin: left top;
  font-size: 16px;
  transition: transform 0.2s ease-out, color 0.2s ease-out;
  transform: ${props => props.isActive ? 'translateY(-20px) scale(0.75)' : 'translateY(12px) scale(1)'};
`;

const StyledInput = styled.input<{ hasError: boolean }>`
  width: 100%;
  height: 56px;
  padding: 16px;
  font-size: 16px;
  border: 2px solid ${props => props.hasError ? '#ff3b30' : props.disabled ? '#e0e0e0' : '#e0e0e0'};
  border-radius: 8px;
  color: #212121;
  background-color: ${props => props.disabled ? '#f5f5f5' : '#ffffff'};
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  outline: none;
  
  &:focus {
    border-color: ${props => props.hasError ? '#ff3b30' : '#4c6ef5'};
    box-shadow: 0 0 0 1px ${props => props.hasError ? 'rgba(255, 59, 48, 0.2)' : 'rgba(76, 110, 245, 0.2)'};
  }
  
  &::placeholder {
    color: transparent;
  }
  
  &:disabled {
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: #ff3b30;
  font-size: 12px;
  margin: 4px 0 0 4px;
  padding: 0;
`;

const HelperText = styled.p`
  color: #757575;
  font-size: 12px;
  margin: 4px 0 0 4px;
  padding: 0;
`;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  value,
  onChange,
  onFocus,
  onBlur,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const hasError = !!error;
  const isActive = focused || !!value;

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    if (onBlur) onBlur(e);
  };

  return (
    <InputContainer>
      <Label 
        isActive={isActive} 
        hasError={hasError}
      >
        {label}
      </Label>
      <StyledInput
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        hasError={hasError}
        {...props}
      />
      {hasError && <ErrorMessage>{error}</ErrorMessage>}
      {!hasError && helperText && <HelperText>{helperText}</HelperText>}
    </InputContainer>
  );
};