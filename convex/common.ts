import {
	ConvexError,
	type GenericId,
	type PropertyValidators,
} from "convex/values";
import type { Doc } from "./_generated/dataModel";
import type { MutationCtx, QueryCtx } from "./_generated/server";
import { mutation, query } from "./_generated/server";

// Función auxiliar para verificar la autenticación y obtener datos del usuario
async function getUserFromAuth(ctx: QueryCtx | MutationCtx) {
	const identity = await ctx.auth.getUserIdentity();
	if (!identity) {
		throw new ConvexError({ message: "No autenticado", code: 401 });
	}
	const [userId] = identity.subject.split("|") as [GenericId<"users">];
	const user = await ctx.db.get(userId);

	console.log(user);
	if (!user) {
		throw new ConvexError({
			message: "Usuario no encontrado",
			code: 404,
		});
	}

	return user;
}

export function authedMutation<Args = void, Output = void>(config: {
	args?: PropertyValidators;
	handler: (
		ctx: MutationCtx,
		user: Doc<"users">,
		args: Args,
	) => Promise<Output> | Output;
}) {
	return mutation({
		args: config.args,
		handler: async (ctx, args) => {
			const user = await getUserFromAuth(ctx);
			return config.handler(ctx, user, args as Args);
		},
	});
}

export function authedQuery<Args = void, Output = void>(config: {
	args?: PropertyValidators;
	handler: (
		ctx: QueryCtx,
		user: Doc<"users">,
		args: Args,
	) => Promise<Output> | Output;
}) {
	return query({
		args: config.args,
		handler: async (ctx, args) => {
			const user = await getUserFromAuth(ctx);
			return config.handler(ctx, user, args as Args);
		},
	});
}
