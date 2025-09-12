import { convexQuery } from "@convex-dev/react-query";
import { api } from "@convex-generated/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { DataTable } from "@/components/data-table";
import { userTableColumns } from "@/components/pages/users/table-columns";

export const Route = createFileRoute("/_auth/users")({
	component: RouteComponent,
	beforeLoad: async ({ context }) => {
		if (context.user) {
			await context.queryClient.ensureQueryData(
				convexQuery(api.users.getAllUsers, {}),
			);
			return;
		}

		throw redirect({ to: "/login" });
	},
});

function RouteComponent() {
	const { data } = useSuspenseQuery(convexQuery(api.users.getAllUsers, {}));
	return (
		<div>
			<DataTable
				columns={userTableColumns}
				data={data}
				onSelectedRowsChange={(rows) => console.log(rows)}
			/>
		</div>
	);
}
