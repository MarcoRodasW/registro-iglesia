import { useAuthActions } from "@convex-dev/auth/react";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { LogOutIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function SignOutButton() {
	const router = useRouter();
	const navigate = useNavigate();
	const { signOut } = useAuthActions();
	const handleSignOut = async () => {
		await signOut();
		router.invalidate();
		navigate({ to: "/login" });
	};
	return (
		<Button
			className="cursor-pointer"
			variant={"destructive"}
			onClick={handleSignOut}
		>
			<LogOutIcon />
			Cerrar sesión
		</Button>
	);
}
