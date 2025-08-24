import { useConvexAuth } from "@convex-dev/react-query";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import AppSidebar from "@/components/app-sidebar";
import { SiteHeader } from "@/components/app-site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export const Route = createFileRoute("/_auth")({
	component: RouteComponent,
});

function RouteComponent() {
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
	return (
		<SidebarProvider>
			<AppSidebar variant="inset" />
			<SidebarInset>
				<SiteHeader />
				<div className="flex flex-1 flex-col">
					<div className="container mx-auto flex flex-1 flex-col gap-2">
						<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
							<Outlet />
						</div>
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
