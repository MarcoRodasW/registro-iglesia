import { useAuthActions } from "@convex-dev/auth/react";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "@convex-generated/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Authenticated, Unauthenticated } from "convex/react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	const { data } = useQuery(convexQuery(api.auth.getAuthUser, {}));
	const { signIn, signOut } = useAuthActions();
	return (
		<div className="min-h-dvh w-full grid place-content-center space-y-2">
			<div className="text-red-500 text-2xl underline">Hello {data?.name}</div>
			<Authenticated>
				<Button onClick={() => void signOut()}>Log out</Button>
			</Authenticated>
			<Unauthenticated>
				<Button onClick={() => void signIn("google")}>Login</Button>
			</Unauthenticated>
		</div>
	);
}
