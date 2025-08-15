import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<div className="min-h-dvh w-full grid place-content-center">
			<div className="text-red-500 text-2xl underline">Hello</div>
			<Button>click me</Button>
		</div>
	);
}
