import Google from "@auth/core/providers/google";
import { authTables, convexAuth, getAuthUserId } from "@convex-dev/auth/server";
import type { Infer } from "convex/values";
import { query } from "./_generated/server";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
	providers: [Google],
});

export const getAuthUser = query({
	args: {},
	handler: async (ctx) => {
		const userId = await getAuthUserId(ctx);
		return userId !== null ? ctx.db.get(userId) : null;
	},
});

const user = authTables.users.validator;
export type User = Infer<typeof user>;
