import React from 'react';
import RegisterForm from '../../ui/Auth/RegisterForm';
import styled from 'styled-components';

const PageWrapper = styled.div`
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    width: 100%,
    display: flex,
    justify-content: center,
    padding: '20px'
`

const RegisterPage: React.FC = () => {
  return (
    <div style={{ 

    }}>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;