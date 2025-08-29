import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
	...authTables,
	users: defineTable({
		name: v.optional(v.string()),
		image: v.optional(v.string()),
		email: v.optional(v.string()),
		emailVerificationTime: v.optional(v.number()),
		phone: v.optional(v.string()),
		phoneVerificationTime: v.optional(v.number()),
		role: v.optional(
			v.union(v.literal("admin"), v.literal("user"), v.literal("leader")),
		),
	})
		.index("email", ["email"])
		.index("phone", ["phone"]),
	contacts: defineTable({
		fullName: v.string(),
		age: v.optional(v.string()),
		phone: v.string(),
		email: v.optional(v.string()),
		direction_of_residence: v.string(),
		number_of_kids: v.optional(v.number()),
		invited_by: v.optional(v.string()),
		invited_by_phone: v.optional(v.string()),
		created_by: v.id("users"),
	})
		.index("fullName", ["fullName"])
		.index("email", ["email"])
		.index("invited_by", ["invited_by"]),
});

export default schema;
