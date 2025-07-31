import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/")({
  component: DashboardPage,
});

function DashboardPage() {
  return <div>Hello "/app/"!</div>;
}
