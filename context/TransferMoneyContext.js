"use strict";

import { RolesManager } from "../context/Roles.js";
import { TransferMoneySink } from "../interactions/TransferMoneySink.js";
import { TransferMoneySource } from "../interactions/TransferMoneySource.js";

export class TransferMoneyContext {
  constructor(accounts) {
    RolesManager.applyRoles(this, {
      "source": {
        "object": accounts["from"],
        "roles": [TransferMoneySource]
      },
      "sink": {
        "object": accounts["to"],
        "roles": [TransferMoneySink]
      }
    });
  }
  
  execute(amount) {
    this.source.transferTo(amount);
  }
}