import { describe, it, expect } from 'vitest';
import { User } from '../../data/models/User';
import { UserMessageContext } from '../../context/UserMessageContext';

describe('UserMessageContext', () => {
  it('should send message from source to sink', () => {
    // Arrange
    const sender = new User("John");
    const receiver = new User("Kyryl");
    
    const transferContext = new UserMessageContext({
      from: sender,
      to: receiver
    });
    
    const message = "Hello Kyryl";
    
    // Act
    transferContext.execute(message);
    
    // Assert
    expect(sender.getLatestSend()).toBe(message);
    expect(receiver.getLatestReceive()).toBe(message);
    expect(sender.getName()).toBe("John");
    expect(receiver.getName()).toBe("Kyryl");
  });
  
  it('should handle multiple messages correctly', () => {
    // Arrange
    const sender = new User("John");
    const receiver = new User("Kyryl");
    
    const transferContext = new UserMessageContext({
      from: sender,
      to: receiver
    });
    
    // Act
    transferContext.execute("First message");
    transferContext.execute("Second message");
    
    // Assert
    expect(sender.getLatestSend()).toBe("Second message");
    expect(receiver.getLatestReceive()).toBe("Second message");
  });
});