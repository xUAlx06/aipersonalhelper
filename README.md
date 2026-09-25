# Ai Productivity Assistant

Build a web app called FlowDesk — a professional AI-powered productivity dashboard with a black and yellow theme (black/charcoal backgrounds, yellow for buttons, accents, and active states; black text on yellow buttons for contrast).

Layout: Sidebar navigation (collapses to a drawer on mobile) + top bar + main content area. Fully responsive for desktop and mobile.

Include 3 AI features, each with a clear input section and output card:

Smart Email Generator — inputs for recipient/context, purpose, and key points; a tone selector (Formal / Friendly / Persuasive); generates a full email with subject line, body, and sign-off. Include Copy and Regenerate buttons.

AI Task Planner — input list of tasks (name, duration, deadline, priority); toggle for Daily/Weekly view; generates a prioritized schedule with brief reasoning for the order. Include Regenerate.

AI Research Assistant — input a topic or pasted text; generates a Summary, Key Insights (bullets), and Recommendations (bullets). Include Copy and Regenerate.

Use mock/simulated AI outputs with a short loading delay for now, structured so a real AI API call can be swapped in later.

Also include:

A dashboard home page with a card linking to each tool.

A dismissible Responsible AI disclaimer banner ("AI-generated content may contain errors — please review before use") plus a short note on every output card.

Clean, professional UI — minimal, premium feel, not flashy.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c74596d4-a177-4184-bc51-2e85fe104465).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
