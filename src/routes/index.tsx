import { useConvexAuth } from "@convex-dev/react-query";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	const { isAuthenticated, isLoading } = useConvexAuth();
	const navigate = useNavigate();

	useEffect(() => {
		// Redirect to login page if user is not authenticated.
		if (!isLoading && !isAuthenticated) {
			navigate({ to: "/login" });
		}
		if (!isLoading && isAuthenticated) {
			navigate({ to: "/dashboard" });
		}
	}, [isLoading, isAuthenticated, navigate]);

	if (isLoading && !isAuthenticated) {
		return null;
	}
	return <Outlet />;
}
