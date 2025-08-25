import Google from "@auth/core/providers/google";
import { convexAuth, getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
	providers: [Google],
	callbacks: {
		afterUserCreatedOrUpdated: async (ctx, { userId, existingUserId }) => {
			if (existingUserId) return;
			const existingUsers = await ctx.db.query("users").take(5);
			if (existingUsers.length === 1) {
				await ctx.db.patch(userId, { role: "admin" });
				return;
			}

			await ctx.db.patch(userId, { role: "user" });
		},
	},
});

export const getAuthUser = query({
	args: {},
	handler: async (ctx) => {
		const userId = await getAuthUserId(ctx);
		return userId !== null ? ctx.db.get(userId) : null;
	},
});
