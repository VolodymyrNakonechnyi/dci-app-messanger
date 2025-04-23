import React, { useState } from 'react';
import styled from 'styled-components';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

const FormContainer = styled.div`
  position: relative;
  min-width: 30rem;
  padding: 24px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
`;

const FormTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 24px;
  color: #333;
  font-weight: 600;
  text-align: center;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
`;

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      return;
    }
    
    setSubmitting(true);
    
    setTimeout(() => {
      setResult(`Form submitted with username: ${username}`);
      setSubmitting(false);
    }, 1000);
  };

  return (
    <FormContainer>
      <FormTitle>Test Form</FormTitle>
      
      <FormWrapper onSubmit={handleSubmit}>
        <Input
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          helperText="Enter your username to test the form"
          autoComplete="off"
        />
        
        <Button 
          type="submit" 
          isFullWidth 
          disabled={!username.trim() || submitting}
        >
          {submitting ? 'Submitting...' : 'Submit Form'}
        </Button>
        
        {result && (
          <div style={{ 
            marginTop: '20px', 
            padding: '12px', 
            backgroundColor: '#e6f4ea', 
            borderRadius: '8px', 
            color: '#1e7e34',
            textAlign: 'center'
          }}>
            {result}
          </div>
        )}
      </FormWrapper>
    </FormContainer>
  );
};

export default RegisterForm;