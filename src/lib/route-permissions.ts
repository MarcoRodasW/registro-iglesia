import type { Role } from "../../convex/common";
import { canManageContacts } from "../../convex/contacts";
import { canManageUsers } from "../../convex/users";

const routePermissions = {
	dashboard: null, // Dashboard is accessible to all authenticated users
	contacts: canManageContacts,
	users: canManageUsers,
} as const;

export type RouteKey = keyof typeof routePermissions;

// Helper function to check if user can access a route
export function canAccessRoute(
	routeKey: RouteKey,
	userRole: string | undefined,
): boolean {
	if (!userRole) return false;

	const permission = routePermissions[routeKey];

	// If no permission object, route is accessible to all authenticated users
	if (!permission) return true;

	// Use the backend permission logic
	return permission.hasPermission("read", userRole as Role);
}
