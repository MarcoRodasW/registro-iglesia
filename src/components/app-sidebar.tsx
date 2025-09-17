import { Link, type LinkOptions } from "@tanstack/react-router";
import { ContactRound, Home, type LucideIcon, User2Icon } from "lucide-react";
import type React from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "./ui/sidebar";
import { useCurrentUser } from "@/hooks/use-permissions";
import { canAccessRoute, type RouteKey } from "@/lib/route-permissions";

// Extend LinkOptions to include additional navigation properties
type NavigationLinkOptions = LinkOptions & {
	label: string;
	icon: LucideIcon;
	routeKey: RouteKey;
};

// Define typesafe navigation links array
const navigationLinks: NavigationLinkOptions[] = [
	{
		to: "/dashboard",
		label: "Dashboard",
		icon: Home,
		routeKey: "dashboard",
		activeOptions: { exact: true },
	},
	{
		to: "/contacts",
		label: "Contactos",
		icon: ContactRound,
		routeKey: "contacts",
		activeOptions: { exact: true },
	},
	{
		to: "/users",
		label: "Usuarios",
		icon: User2Icon,
		routeKey: "users",
		activeOptions: { exact: true },
	},
];

export default function AppSidebar({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	const { userRole, isLoading } = useCurrentUser();

	// Filter navigation links based on user permissions
	const visibleLinks = navigationLinks.filter((link) => {
		// Show loading state or hide links if user role is not available
		if (isLoading || !userRole) return false;
		return canAccessRoute(link.routeKey, userRole);
	});

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem></SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Navigation</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{visibleLinks.map((linkOption) => {
								const Icon = linkOption.icon;
								return (
									<SidebarMenuItem key={linkOption.to}>
										<SidebarMenuButton asChild>
											<Link
												{...linkOption}
												activeProps={{
													className:
														"bg-sidebar-accent text-sidebar-accent-foreground font-medium",
												}}
												inactiveProps={{
													className:
														"text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
												}}
											>
												<Icon className="h-4 w-4" />
												<span>{linkOption.label}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter></SidebarFooter>
		</Sidebar>
	);
}
