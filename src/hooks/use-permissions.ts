import { useConvexAuth } from "@convex-dev/react-query";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

// Simple hook to get current user
export function useCurrentUser() {
	const { isAuthenticated } = useConvexAuth();
	const user = useQuery(api.auth.getAuthUser, isAuthenticated ? {} : "skip");
	
	return {
		user,
		isLoading: user === undefined && isAuthenticated,
		userRole: user?.role,
	};
}
