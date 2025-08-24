import { useAuthActions } from "@convex-dev/auth/react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { signIn } = useAuthActions();
	const redirect = useNavigate();
	const handleSignIng = async () => {
		const { signingIn } = await signIn("google");
		if (signingIn) {
			void redirect({ to: "/dashboard" });
		}
	};

	return (
		<div className="min-h-screen grid place-content-center">
			<Button onClick={handleSignIng}>Sign in with Google</Button>
		</div>
	);
}
