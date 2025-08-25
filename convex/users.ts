import type { Infer } from "convex/values";
import schema from "./schema";

const user = schema.tables.users.validator;
export type User = Infer<typeof user>;
export type UserRoles = User["role"];
