import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { messageService } from '../../services/message-service';

// Styled components for Chat UI
const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #ffffff;
`;

const ChatHeader = styled.div`
  padding: 1rem;
  background-color: #ffffff;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  align-items: center;
`;

const ContactAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 1rem;
  object-fit: cover;
`;

const ContactName = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
`;

const ChatMessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: #f8f9fa;
`;

const Message = styled.div`
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  max-width: 70%;
  word-break: break-word;
`;

const SentMessage = styled(Message)`
  background-color: #4c6ef5;
  color: white;
  align-self: flex-end;
  border-bottom-right-radius: 0.25rem;
`;

const ReceivedMessage = styled(Message)`
  background-color: #e9ecef;
  color: #212529;
  align-self: flex-start;
  border-bottom-left-radius: 0.25rem;
`;

const MessageTime = styled.span`
  font-size: 0.7rem;
  opacity: 0.7;
  margin-top: 0.25rem;
  display: block;
  text-align: right;
`;

const ChatInputContainer = styled.div`
  padding: 1rem;
  background-color: #ffffff;
  border-top: 1px solid #e9ecef;
  display: flex;
  gap: 0.5rem;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #ced4da;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: #4c6ef5;
    box-shadow: 0 0 0 2px rgba(76, 110, 245, 0.2);
  }
`;

const SendButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #4c6ef5;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #3b5bdb;
  }
  
  &:disabled {
    background-color: #ced4da;
    cursor: not-allowed;
  }
`;

const NoContactSelected = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #6c757d;
  text-align: center;
  padding: 2rem;
`;

const EmptyStateTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

const EmptyStateText = styled.p`
  color: #6c757d;
`;

const ChatUI = ({ selectedContact, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadMessages = async () => {
      if (!selectedContact) return;
      
      try {
        setIsLoading(true);
        // Assume messageService.getMessagesByContactId exists
        const chatMessages = await messageService.getMessagesByContactId(selectedContact.id);
        setMessages(chatMessages);
      } catch (error) {
        console.error("Failed to load messages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMessages();
  }, [selectedContact]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedContact) return;
    
    const messageData = {
      contactId: selectedContact.id,
      text: newMessage,
      timestamp: new Date(),
      isFromMe: true
    };
    
    try {
      // Add message to UI immediately for better UX
      setMessages(prevMessages => [...prevMessages, messageData]);
      setNewMessage('');
      
      // Send message to API
      await messageService.sendMessage(messageData);
    } catch (error) {
      console.error("Failed to send message:", error);
      // Optionally handle the error in UI
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!selectedContact) {
    return (
      <NoContactSelected>
        <EmptyStateTitle>Немає вибраного контакту</EmptyStateTitle>
        <EmptyStateText>Виберіть контакт зі списку, щоб почати чат</EmptyStateText>
      </NoContactSelected>
    );
  }

  return (
    <ChatContainer>
      <ChatHeader>
        {selectedContact.avatar && (
          <ContactAvatar src={selectedContact.avatar} alt={selectedContact.getName()} />
        )}
        <ContactName>{selectedContact.getName()}</ContactName>
      </ChatHeader>
      
      <ChatMessagesContainer>
        {isLoading ? (
          <div>Завантаження повідомлень...</div>
        ) : messages.length === 0 ? (
          <div>Немає повідомлень. Почніть розмову!</div>
        ) : (
          messages.map((message) => (
            message.isFromMe ? (
              <SentMessage key={message.id}>
                {message.text}
                <MessageTime>{formatTime(message.timestamp)}</MessageTime>
              </SentMessage>
            ) : (
              <ReceivedMessage key={message.id}>
                {message.text}
                <MessageTime>{formatTime(message.timestamp)}</MessageTime>
              </ReceivedMessage>
            )
          ))
        )}
      </ChatMessagesContainer>
      
      <ChatInputContainer>
        <ChatInput
          type="text"
          placeholder="Напишіть повідомлення..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <SendButton 
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
        >
          Надіслати
        </SendButton>
      </ChatInputContainer>
    </ChatContainer>
  );
};

export default ChatUI;