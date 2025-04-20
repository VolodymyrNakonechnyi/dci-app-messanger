import * as awilix from "awilix";
import { AuthController } from "../controller/auth.controller";
import { AuthService } from "../services/auth.service";
import { UserRepository } from "../repositories/user.repository";
import { RoomRepository } from "../repositories/room.repository";
import { RoomService } from "../services/room.service";
import { RoomController } from "../controller/room.controller";
import AuthRoute from "../routes/AuthRoute";
import RoomRoute from "../routes/RoomRoute";
import { db } from "../database/connection";
import { messages } from "../database/migrations/message.schema";
import { MessageRepository } from "../repositories/message.repository";
import { MessageService } from "../services/message.service";
import { MessageController } from "../controller/message.controller";
import MessageRoute from "../routes/MessageRoute";

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY
});

function setup() {
  container.register({
    db: awilix.asValue(db),
  });

  // Repositories
  container.register({
    userRepository: awilix.asClass(UserRepository).singleton(),
    roomRepository: awilix.asClass(RoomRepository).singleton(),
    messageRepository: awilix.asClass(MessageRepository).singleton() 
  });

  // Services
  container.register({
    authService: awilix.asClass(AuthService).singleton(),
    roomService: awilix.asClass(RoomService).singleton(),
    messageService: awilix.asClass(MessageService).singleton()
  });

  // Controllers
  container.register({
    authController: awilix.asClass(AuthController).singleton(),
    roomController: awilix.asClass(RoomController).singleton(),
    messageController: awilix.asClass(MessageController).singleton()
  });

  // Routes
  container.register({
    authRoute: awilix.asClass(AuthRoute).singleton(),
    roomRoute: awilix.asClass(RoomRoute).singleton(),
    messageRoute: awilix.asClass(MessageRoute).singleton()
  });
}

export { container, setup };