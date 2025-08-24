import { convexQuery } from "@convex-dev/react-query";
import { api } from "@convex-generated/api";
import { TanstackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

export type RootContext = {
	queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RootContext>()({
	beforeLoad: async ({ context }) => {
		const data = await context.queryClient.ensureQueryData(
			convexQuery(api.auth.getAuthUser, {}),
		);
		return { data };
	},
	component: () => (
		<>
			<Outlet />
			<TanstackDevtools
				config={{
					position: "bottom-left",
				}}
				plugins={[
					{
						name: "Tanstack Router",
						render: <TanStackRouterDevtoolsPanel />,
					},
				]}
			/>
		</>
	),
});
