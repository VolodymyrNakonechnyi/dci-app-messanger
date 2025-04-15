import App from "./infrastructure/webserver/webserver";
import AuthRoute from "./infrastructure/routes/AuthRoute";
import SwaggerPlugin from "./infrastructure/plugins/swagger.plugin";
import HealthcheckRoute from "./infrastructure/routes/HealthcheckRoute";

export const app = new App({
  plugins: [SwaggerPlugin],
  routes: [AuthRoute, HealthcheckRoute],
});

app.listen();