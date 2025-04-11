import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  isFullWidth?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  
  /* Size variations */
  padding: ${props => {
    switch (props.size) {
      case 'small': return '8px 16px';
      case 'large': return '16px 32px';
      default: return '12px 24px'; // medium (default)
    }
  }};
  
  font-size: ${props => {
    switch (props.size) {
      case 'small': return '14px';
      case 'large': return '18px';
      default: return '16px'; // medium (default)
    }
  }};
  
  /* Variant styles */
  background-color: ${props => {
    switch (props.variant) {
      case 'secondary': return '#f8f9fa';
      case 'outline': return 'transparent';
      default: return '#4c6ef5'; // primary (default)
    }
  }};
  
  color: ${props => {
    switch (props.variant) {
      case 'secondary': return '#212529';
      case 'outline': return '#4c6ef5';
      default: return '#ffffff'; // primary (default)
    }
  }};
  
  border: ${props => {
    switch (props.variant) {
      case 'outline': return '2px solid #4c6ef5';
      default: return 'none';
    }
  }};
  
  width: ${props => props.isFullWidth ? '100%' : 'auto'};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    
    background-color: ${props => {
      switch (props.variant) {
        case 'secondary': return '#e9ecef';
        case 'outline': return 'rgba(76, 110, 245, 0.1)';
        default: return '#3b5bdb'; // primary (default) darker
      }
    }};
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  
  /* Add spacing between icon and text if there are children */
  & > svg + span,
  & > span + svg {
    margin-left: 8px;
  }
`;

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary',
  size = 'medium',
  isFullWidth = false,
  ...props 
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      isFullWidth={isFullWidth}
      {...props}
    >
      {children}
    </StyledButton>
  );
};