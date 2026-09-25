import { createFileRoute } from "@tanstack/react-router";
import { FlowDeskApp } from "@/components/flowdesk-app";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FlowDesk — AI Productivity Workspace" },
      { name: "description", content: "Write emails, prioritize tasks, and turn research into clear next steps with FlowDesk." },
      { property: "og:title", content: "FlowDesk — AI Productivity Workspace" },
      { property: "og:description", content: "A focused AI workspace for communication, planning, and research." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FlowDeskApp,
});
