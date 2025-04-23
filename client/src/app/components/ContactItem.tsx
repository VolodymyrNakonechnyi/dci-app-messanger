import styled from "styled-components";
import { IUser } from "../../domain/entities/User";
import { User as UserIcon } from 'lucide-react';

export const ContactItem = ({ contact }: {contact: IUser}) => {
    const { getId, getName } = contact;

    return (
        <ContactContainer key={getId}>
            <AvatarContainer>
                <UserIcon size={24} color="#4c6ef5" />
            </AvatarContainer>
            <ContactInfo>
            <ContactName>{getName}</ContactName>
                <ContactId>{getId}</ContactId>
            </ContactInfo>
      </ContactContainer>
    )
}

const ContactContainer = styled.li`
  padding: 1rem;
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const AvatarContainer = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: #e7f5ff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
`;

const ContactInfo = styled.div`
  flex: 1;
`;

const ContactName = styled.p`
  font-weight: 600;
  color: #212529;
  margin: 0;
  font-size: 1rem;
`;

const ContactId = styled.p`
  font-size: 0.75rem;
  color: #6c757d;
  margin: 0.25rem 0 0 0;
`;