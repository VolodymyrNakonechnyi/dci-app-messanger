import * as awilix from "awilix";
import { AuthController } from "../controller/auth.controller";
import { AuthService } from "../services/auth.service";
import { UserRepository } from "../repositories/user.repository";
import AuthRoute from "../routes/AuthRoute";
import { db } from "../database/connection";

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});

function setup() {
    container.register({
        db: awilix.asValue(db),
        userRepository: awilix.asClass(UserRepository).singleton(),
        authService: awilix.asClass(AuthService).singleton(),
        authController: awilix.asClass(AuthController).singleton(),
        authRoute: awilix.asClass(AuthRoute).singleton(),
    });
}

export { container, setup }