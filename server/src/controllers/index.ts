import { type ApiPath } from "@ctypes/api";
import healthController from "./health";
import emailController from "./email";
import webhookController from "./webhook";

const apiPaths: ApiPath[] = [
  {
    path: "/health",
    handler: healthController,
  },
  {
    path: "/email",
    handler: emailController,
  },
  {
    path: "/webhook",
    handler: webhookController,
  },
];

export default apiPaths;
