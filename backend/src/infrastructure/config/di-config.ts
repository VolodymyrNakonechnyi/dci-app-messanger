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
  });

  // Services
  container.register({
    authService: awilix.asClass(AuthService).singleton(),
    roomService: awilix.asClass(RoomService).singleton(),
  });

  // Controllers
  container.register({
    authController: awilix.asClass(AuthController).singleton(),
    roomController: awilix.asClass(RoomController).singleton(),
  });

  // Routes
  container.register({
    authRoute: awilix.asClass(AuthRoute).singleton(),
    roomRoute: awilix.asClass(RoomRoute).singleton(),
  });
}

export { container, setup };