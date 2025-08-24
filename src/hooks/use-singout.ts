import { useAuthActions } from "@convex-dev/auth/react";
import { useNavigate, useRouter } from "@tanstack/react-router";

export function useSignOut() {
	const { signOut: signOutAction } = useAuthActions();
	const router = useRouter();
	const navigate = useNavigate();

	const singOut = async () => {
		await signOutAction();
		router.invalidate();
		navigate({ to: "/login" });
	};

	return {
		singOut,
	};
}
