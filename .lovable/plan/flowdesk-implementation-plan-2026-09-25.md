# FlowDesk implementation plan

## Experience
- Build a responsive productivity dashboard with a charcoal workspace, yellow actions, compact navigation, and restrained motion.
- Use a persistent desktop sidebar, a mobile drawer, a top bar, and a focused main workspace.
- Add a home overview with quick links to Email, Planner, and Research tools.

## Tools
- Smart Email Generator: recipient/context, purpose, key points, tone, mock generation, copy, and regenerate.
- AI Task Planner: editable task rows with duration, deadline, priority, Daily/Weekly switch, mock prioritized schedule, reasoning, and regenerate.
- AI Research Assistant: topic or pasted text, mock summary, insights, recommendations, copy, and regenerate.
- Keep mock generation behind small async functions so a real AI service can replace it later.

## Safety and quality
- Add a dismissible responsible-AI banner and a review note on every generated result.
- Provide loading, empty, and completed states with accessible labels and keyboard-friendly controls.
- Add app-specific page metadata and verify desktop and mobile rendering.
