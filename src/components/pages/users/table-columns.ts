import type { ColumnDef } from "@tanstack/react-table";
import type { User } from "convex/users";

export const userTableColumns: ColumnDef<User>[] = [
	{
		accessorKey: "email",
		header: "Correo Electronico",
	},
	{
		accessorKey: "name",
		header: "Nombre",
	},
	{
		accessorKey: "role",
		header: "Role",
	},
];
