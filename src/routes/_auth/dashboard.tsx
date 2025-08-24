import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/dashboard")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data: user } = Route.useRouteContext();

	return (
		<div className="h-full w-full">
			<div className="flex items-center justify-between mb-8">
				<div>
					<h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
					<p className="text-gray-600 mt-2">
						Here's what's happening with your church today.
					</p>
				</div>
			</div>
		</div>
	);
}
