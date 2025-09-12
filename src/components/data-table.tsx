import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	type Row,
	type RowSelectionState,
	useReactTable,
} from "@tanstack/react-table";
import { X } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	onSelectedRowsChange?: (rows: Row<TData>[]) => void;
	renderActions?: (selectedRows: Row<TData>[]) => ReactNode;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	onSelectedRowsChange,
	renderActions,
}: DataTableProps<TData, TValue>) {
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
	const columnsWithCheckbox: ColumnDef<TData, TValue>[] = [
		{
			id: "select",
			header: ({ table }) => (
				<Checkbox
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && "indeterminate")
					}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label="Select all"
				/>
			),
			cell: ({ row }) => (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label="Select row"
				/>
			),
			enableSorting: false,
			enableHiding: false,
		},
		...columns,
	];

	const table = useReactTable({
		data,
		columns: columnsWithCheckbox,
		getCoreRowModel: getCoreRowModel(),
		onRowSelectionChange: setRowSelection,
		state: {
			rowSelection,
		},
	});

	useEffect(() => {
		if (onSelectedRowsChange) {
			// Reference rowSelection so the dependency is meaningful
			void rowSelection;
			onSelectedRowsChange(
				(table.getSelectedRowModel().rows as Row<TData>[]) ?? [],
			);
		}
	}, [rowSelection, onSelectedRowsChange, table]);

	const selectedRowsCount = table.getSelectedRowModel().rows.length;

	return (
		<div className="overflow-hidden rounded-md border">
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>

			{selectedRowsCount > 0 && (
				<div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
					<TableActionBar
						selectedRows={table.getSelectedRowModel().rows}
						renderActions={renderActions}
						onClearSelection={() => table.resetRowSelection()}
					/>
				</div>
			)}
		</div>
	);
}

interface TableActionBarProps<TData> {
	selectedRows: Row<TData>[];
	renderActions?: (selectedRows: Row<TData>[]) => ReactNode;
	onClearSelection?: () => void;
}

export function TableActionBar<TData>({
	selectedRows,
	renderActions,
	onClearSelection,
}: TableActionBarProps<TData>) {
	return (
		<div className="bg-card border rounded-lg shadow-lg px-4 py-3 flex items-center gap-4 animate-in slide-in-from-bottom-2">
			<div className="flex items-center gap-2 text-sm">
				<span className="font-medium">{selectedRows.length} selected</span>
				<Button
					variant="ghost"
					size="sm"
					onClick={onClearSelection}
					className="h-6 w-6 p-0"
				>
					<X className="h-4 w-4" />
				</Button>
			</div>
			<div className="h-4 w-px bg-border" />
			{/* Actions */}
			<div className="flex items-center gap-2">
				{renderActions ? (
					renderActions(selectedRows)
				) : (
					<p>No actions available</p>
				)}
			</div>
		</div>
	);
}
