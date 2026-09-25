# FlowDesk — AI-Powered Workplace Productivity Suite
 
FlowDesk is a professional productivity web application that uses AI to automate common workplace tasks. It combines three core AI features into a single, cohesive dashboard so users can draft communications, plan their work, and digest information faster.
 
## Overview
 
Knowledge workers lose significant time on repetitive, low-creativity tasks — writing routine emails, planning their day, and reading/summarizing long documents. FlowDesk addresses this by giving users AI-assisted tools for each of these tasks in one clean, distraction-free interface.
 
## Features
 
### ✉️ Smart Email Generator
- Generates professional, ready-to-send emails from a short description of context, purpose, and key points.
- Supports three tones: **Formal**, **Friendly**, and **Persuasive**.
- Copy, edit, and regenerate outputs without re-entering inputs.
### 🗓️ AI Task Planner / Scheduler
- Turns a list (or brain-dump) of tasks into a realistic **daily or weekly** schedule.
- Prioritizes tasks based on urgency, deadlines, and importance.
- Shows brief reasoning for how each task was scheduled.
### 🔎 AI Research Assistant
- Summarizes articles, documents, or open-ended topics.
- Produces a clear **Summary**, **Key Insights**, and **Recommendations**.
- Supports follow-up refinement for deeper exploration.
## Tech & Design
 
- **Theme:** Black and yellow — a high-contrast, professional look built for focus.
- **Layout:** Dashboard with collapsible sidebar navigation, responsive across desktop and mobile.
- **AI Layer:** Feature logic is isolated per tool so mock responses can be swapped for a live AI/LLM API with minimal changes.
## Responsible AI
 
FlowDesk treats all AI output as a **draft, not a final answer**:
- A disclaimer is shown on first load and on every AI-generated output.
- Users are advised not to paste confidential or personally identifiable information into the tools.
- AI-generated emails, schedules, and summaries should always be reviewed by a human before being sent or acted on.
## Project Structure
 
```
/dashboard          → Overview page with links to each tool
/email-generator     → Smart Email Generator tool
/task-planner        → AI Task Planner / Scheduler tool
/research-assistant   → AI Research Assistant tool
/settings             → App settings + Responsible AI notes
```
 
## Getting Started
 
1. Clone or open the project.
2. Install dependencies (if applicable to your build environment).
3. Run the app locally / preview in Lovable.dev.
4. (Optional) Connect a live AI API endpoint to replace the mock response layer in each feature's service file.
## Roadmap Ideas
 
- Persist user history (past emails, schedules, summaries) with an account/database layer.
- Add calendar integration for the Task Planner.
- Add file upload support for the Research Assistant (PDF/DOCX summarization).
- Add a light theme toggle alongside the default black-and-yellow theme.
## Disclaimer
 
This project was built as a productivity/demo application. AI-generated content may contain inaccuracies and should be reviewed before professional use.


 ## Author
 Usaid

 Github: "https://aipersonalhelper.lovable.app/"
