import App from "./infrastructure/webserver/webserver";
import SwaggerPlugin from "./infrastructure/plugins/swagger.plugin";
import { container, setup } from "./infrastructure/config/di-config";

setup();

import healthCheckRoute from "./infrastructure/routes/HealthcheckRoute";

const authRoute = container.resolve("authRoute");
const roomRoute = container.resolve("roomRoute");
const messageRoute = container.resolve("messageRoute");

export const app = new App({
  plugins: [SwaggerPlugin],
  routes: [
    authRoute, 
    roomRoute, 
    messageRoute, 
    healthCheckRoute
  ],
});

app.listen();