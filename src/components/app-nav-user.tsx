import { convexQuery } from "@convex-dev/react-query";
import { api } from "@convex-generated/api";
import { useQuery } from "@tanstack/react-query";
import { LogOutIcon } from "lucide-react";
import { useSignOut } from "@/hooks/use-singout";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function AppNavUser() {
	const { data: user } = useQuery(convexQuery(api.auth.getAuthUser, {}));
	const { singOut } = useSignOut();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className="flex flex-row gap-2">
					<Avatar className="h-8 w-8 rounded-lg">
						<AvatarImage src={user?.image} alt={user?.name} />
						<AvatarFallback className="rounded-lg">
							{user?.name?.charAt(0)}
						</AvatarFallback>
					</Avatar>
					<div className="grid flex-1 text-left text-sm leading-tight">
						<span className="truncate font-medium">{user?.name}</span>
						<span className="text-muted-foreground truncate text-xs">
							{user?.email}
						</span>
					</div>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
				side={"bottom"}
				align="end"
				sideOffset={4}
			>
				<DropdownMenuLabel className="p-0 font-normal">
					<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
						<Avatar className="h-8 w-8 rounded-lg">
							<AvatarImage src={user?.image} alt={user?.name} />
							<AvatarFallback className="rounded-lg">
								{user?.name?.charAt(0)}
							</AvatarFallback>
						</Avatar>
						<div className="grid flex-1 text-left text-sm leading-tight">
							<span className="truncate font-medium">{user?.name}</span>
							<span className="text-muted-foreground truncate text-xs">
								{user?.email}
							</span>
						</div>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => void singOut()}>
					<LogOutIcon />
					Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
