import { RolesManager } from "./Roles";
import { SendMessage } from "../interactions/SendMessage";
import { ReceiveMessage } from "../interactions/ReceiveMessage";
import logger from "../utils/logger";

interface Account {
  [key: string]: any;
  context?: any;
  sendMessage?: (message: string) => void;
  receiveMessage?: (message: string) => void;
}

interface Accounts {
  from: Account;
  to: Account;
}

export class UserMessageContext {
  source: Account;
  sink: Account;

  constructor(accounts: Accounts) {
    RolesManager.applyRoles(this, {
      "source": {
        "object": accounts["from"],
        "roles": [SendMessage]
      },
      "sink": {
        "object": accounts["to"],
        "roles": [ReceiveMessage]
      }
    });
  }
  
  execute(message: string): void {
    logger.warn(`UserMessageContext (execute): ${message}`);
    this.source.sendMessage!(message);
  }
}