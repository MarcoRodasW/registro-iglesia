import { ConvexError, type Infer } from "convex/values";
import { authedQuery, definePermissions } from "./common";
import schema from "./schema";

const user = schema.tables.users.validator;
export type User = Infer<typeof user>;
export type UserRoles = User["role"];

export const canMangeUsers = definePermissions({
	create: ["admin"],
	read: ["admin", "leader"],
	update: ["admin"],
	delete: ["admin"],
});

export const getAllUsers = authedQuery({
	handler: async ({ db, user }) => {
		if (!canMangeUsers.hasPermission("read", user.role!)) {
			throw new ConvexError({
				message: "No tienes permiso para ver usuarios",
				code: 403,
			});
		}
		return await db.query("users").collect();
	},
});
