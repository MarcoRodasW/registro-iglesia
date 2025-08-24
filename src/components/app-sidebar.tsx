import { Link, type LinkOptions } from "@tanstack/react-router";
import { Home, type LucideIcon } from "lucide-react";
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

// Extend LinkOptions to include additional navigation properties
type NavigationLinkOptions = LinkOptions & {
	label: string;
	icon: LucideIcon;
};

// Define typesafe navigation links array
const navigationLinks: NavigationLinkOptions[] = [
	{
		to: "/dashboard",
		label: "Dashboard",
		icon: Home,
		activeOptions: { exact: true },
	},
];

export default function AppSidebar({
	...props
}: React.ComponentProps<typeof Sidebar>) {
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
							{navigationLinks.map((linkOption) => {
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
