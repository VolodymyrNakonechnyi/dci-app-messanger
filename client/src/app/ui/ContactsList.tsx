import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { userService } from '../../services/user-service';
import { User } from '../../domain/entities/User';
import { ContactItem } from '../components/ContactItem';
import { Search } from 'lucide-react';

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f8f9fa;
`;

const HeaderContainer = styled.div`
  padding: 1rem;
  background-color: #ffffff;
  border-bottom: 1px solid #e9ecef;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #212529;
  margin-bottom: 1rem;
`;

const SearchContainer = styled.div`
  position: relative;
`;

const SearchIconContainer = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  pointer-events: none;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #ced4da;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: #4c6ef5;
    box-shadow: 0 0 0 2px rgba(76, 110, 245, 0.2);
  }
`;

const ContactsList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const LoadingText = styled.p`
  color: #6c757d;
`;

const ContactsEmptyState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const EmptyStateText = styled.p`
  color: #6c757d;
`;

const ContactsUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;



// Simple component that just displays contacts
const ContactsListUI = () => {
  const [contacts, setContacts] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadContacts = async () => {
      try {
        setIsLoading(true);
        const contactsList = await userService.getAllContacts();
        setContacts(contactsList);
      } catch (error) {
        console.error("Failed to load contacts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadContacts();
  }, []);

  // Filter contacts based on search term
  const filteredContacts = contacts.filter(contact => 
    contact.getName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <HeaderContainer>
        <Title>Контакти</Title>
        <SearchContainer>
          <SearchIconContainer>
            <Search size={16} color="#6c757d" />
          </SearchIconContainer>
          <SearchInput
            type="text"
            placeholder="Пошук контактів"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
      </HeaderContainer>

      <ContactsList>
        {isLoading ? (
          <LoadingContainer>
            <LoadingText>Завантаження контактів...</LoadingText>
          </LoadingContainer>
        ) : filteredContacts.length === 0 ? (
          <ContactsEmptyState>
            <EmptyStateText>Контактів не знайдено</EmptyStateText>
          </ContactsEmptyState>
        ) : (
          <ContactsUl>
            {filteredContacts.map((contact) => (
              <ContactItem contact={contact} />
            ))}
          </ContactsUl>
        )}
      </ContactsList>
    </Container>
  );
};

export default ContactsListUI;