import { getAuthUserId } from "@convex-dev/auth/server";
import { ConvexError } from "convex/values";
import {
	customCtx,
	customMutation,
	customQuery,
} from "convex-helpers/server/customFunctions";
import {
	type MutationCtx,
	mutation,
	type QueryCtx,
	query,
} from "./_generated/server";

// Helper function to get authenticated user
async function getUserFromAuth(ctx: QueryCtx | MutationCtx) {
	const userId = await getAuthUserId(ctx);
	if (!userId) {
		throw new ConvexError({ message: "No autenticado", code: 401 });
	}

	const user = await ctx.db.get(userId);
	if (!user) {
		throw new ConvexError({
			message: "Usuario no encontrado",
			code: 404,
		});
	}

	if (!user.role) {
		throw new ConvexError({
			message: "Usuario sin rol asignado",
			code: 403,
		});
	}

	return user;
}

// Definimos los roles disponibles como una constante para type-safety
export const ROLES = ["admin", "user", "leader"] as const;
export type Role = (typeof ROLES)[number];

// Definimos las acciones disponibles
export const ACTIONS = ["read", "create", "update", "delete"] as const;
export type Action = (typeof ACTIONS)[number];

// Tipo para los permisos con el método hasPermission incluido
export type PermissionsManager = {
	[K in Action]: Role[];
} & {
	hasPermission(action: Action, role: Role): boolean;
};

// Función helper para crear permisos con type-safety
export function definePermissions<T extends { [K in Action]: Role[] }>(
	permissions: T,
): PermissionsManager {
	return {
		...permissions,
		hasPermission(action: Action, role: Role) {
			return this[action].includes(role);
		},
	};
}

export const authedQuery = customQuery(
	query,
	customCtx(async (ctx) => {
		const user = await getUserFromAuth(ctx);
		return { user };
	}),
);

export const authedMutation = customMutation(
	mutation,
	customCtx(async (ctx) => {
		const user = await getUserFromAuth(ctx);
		return { user };
	}),
);
