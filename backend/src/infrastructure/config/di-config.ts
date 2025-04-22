import * as awilix from "awilix";
import { AuthController } from "../controller/auth.controller";
import { AuthService } from "../services/auth.service";
import { UserRepository } from "../repositories/user.repository";
import { RoomRepository } from "../repositories/room.repository";
import { MessageRepository } from "../repositories/message.repository";
import { RoomParticipantRepository } from "../repositories/room_participant.repository";

import { RoomService } from "../services/room.service";
import { MessageService } from "../services/message.service";
import { RoomParticipantService } from "../services/room_participant.service";

import { RoomController } from "../controller/room.controller";
import { MessageController } from "../controller/message.controller";
import { RoomParticipantController } from "../controller/room-participant.controller";

import AuthRoute from "../routes/AuthRoute";
import RoomRoute from "../routes/RoomRoute";
import MessageRoute from "../routes/MessageRoute";
import RoomParticipantRoute from "../routes/RoomParticipantsRoute";

import { db } from "../database/connection";

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
    messageRepository: awilix.asClass(MessageRepository).singleton(),
    roomParticipantRepository: awilix.asClass(RoomParticipantRepository).singleton()
  });

  // Services
  container.register({
    authService: awilix.asClass(AuthService).singleton(),
    roomService: awilix.asClass(RoomService).singleton(),
    messageService: awilix.asClass(MessageService).singleton(),
    roomParticipantService: awilix.asClass(RoomParticipantService).singleton()
  });

  // Controllers
  container.register({
    authController: awilix.asClass(AuthController).singleton(),
    roomController: awilix.asClass(RoomController).singleton(),
    messageController: awilix.asClass(MessageController).singleton(),
    roomParticipantController: awilix.asClass(RoomParticipantController).singleton()
  });

  // Routes
  container.register({
    authRoute: awilix.asClass(AuthRoute).singleton(),
    roomRoute: awilix.asClass(RoomRoute).singleton(),
    messageRoute: awilix.asClass(MessageRoute).singleton(),
    roomParticipantRoute: awilix.asClass(RoomParticipantRoute).singleton()
  });
}

export { container, setup };