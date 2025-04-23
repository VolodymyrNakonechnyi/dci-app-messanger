import React from 'react';
import styled from 'styled-components';
import ContactsListUI from '../ui/ContactsList';

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0;
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
`;

const ChatPage: React.FC = () => {
  return (
    <PageWrapper>
      <ContentContainer>
        <ContactsListUI />
      </ContentContainer>
    </PageWrapper>
  );
};

export default ChatPage;