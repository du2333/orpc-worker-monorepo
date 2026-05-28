import { betterAuth } from "better-auth";

import { createSchemaAuthOptions } from "./options";

export const auth = betterAuth(createSchemaAuthOptions());
