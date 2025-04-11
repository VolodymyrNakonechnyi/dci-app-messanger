"use strict";

import { RolesManager } from "../context/Roles.js";
import { SendMessage } from "../interactions/SendMessage.js";
import { ReceiveMessage } from "../interactions/ReceiveMessage.js";
import logger from "../utils/logger.js";

export class UserMessageContext {
  constructor(accounts) {
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
  
  execute(message) {
    logger.warn(`UserMessageContext (execute): ${message}`);
    this.source.sendMessage(message);
  }
}