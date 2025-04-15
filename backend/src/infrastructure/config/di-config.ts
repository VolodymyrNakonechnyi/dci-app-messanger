import awilix from "awilix";
import { AuthController } from "../controller/auth.controller";
import { UserService } from "@/application/services/user.service";
import { UserRepository } from "../repositories/user.repository";
import { db } from "../database/connection";

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});

function setup() {
    container.register({
        userController: awilix.asClass(AuthController),
        userService: awilix.asClass(UserService),
        userDAO: awilix.asClass(UserRepository),
        db: awilix.asValue(db)
    });

    return container;
}

export { container, setup }