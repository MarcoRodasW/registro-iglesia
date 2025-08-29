import { ConvexError, type Infer, v } from "convex/values";
import { authedMutation, authedQuery, definePermissions } from "./common";
import schema from "./schema";

const contacts = schema.tables.contacts.validator;
export type Contacts = Infer<typeof contacts>;

export const canManageContacts = definePermissions({
	read: ["admin", "user", "leader"],
	create: ["admin", "user", "leader"],
	update: ["admin", "leader"],
	delete: ["admin"],
});

export const createContact = authedMutation({
	args: { contact: contacts },
	handler: async ({ user, ...ctx }, args) => {
		const canCreate = canManageContacts.hasPermission("create", user.role!);

		if (!canCreate) {
			throw new ConvexError({
				message: "No tienes permiso para crear contactos",
				code: 403,
			});
		}
		const contact = await ctx.db.insert("contacts", args.contact);
		return contact;
	},
});

export const getAllContacts = authedQuery({
	handler: async ({ user, ...ctx }) => {
		const canRead = canManageContacts.hasPermission("read", user.role!);

		if (!canRead) {
			throw new ConvexError({
				message: "No tienes permiso para ver contactos",
				code: 403,
			});
		}
		return await ctx.db.query("contacts").collect();
	},
});

export const updateContact = authedMutation({
	args: { id: v.id("contacts"), contact: contacts },
	handler: async ({ user, ...ctx }, args) => {
		const canUpdate = canManageContacts.hasPermission("update", user.role!);

		if (!canUpdate) {
			throw new ConvexError({
				message: "No tienes permiso para actualizar contactos",
				code: 403,
			});
		}
		const contact = await ctx.db.patch(args.id, {
			...args.contact,
			created_by: user._id,
		});
		return contact;
	},
});

export const deleteContact = authedMutation({
	args: { id: v.id("contacts") },
	handler: async ({ user, ...ctx }, args) => {
		const canDelete = canManageContacts.hasPermission("delete", user.role!);

		if (!canDelete) {
			throw new ConvexError({
				message: "No tienes permiso para eliminar contactos",
				code: 403,
			});
		}
		await ctx.db.delete(args.id);
	},
});
