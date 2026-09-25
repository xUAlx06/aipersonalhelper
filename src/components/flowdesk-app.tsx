import { useState, type ReactNode } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clipboard,
  Clock3,
  FileSearch,
  Home,
  Lightbulb,
  ListChecks,
  Mail,
  Menu,
  Plus,
  RefreshCw,
  Sparkles,
  Trash2,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type View = "home" | "email" | "planner" | "research";
type Tone = "Formal" | "Friendly" | "Persuasive";
type Priority = "High" | "Medium" | "Low";
type Task = { id: number; name: string; duration: string; deadline: string; priority: Priority };

const navItems = [
  { id: "home" as const, label: "Overview", icon: Home },
  { id: "email" as const, label: "Smart Email", icon: Mail },
  { id: "planner" as const, label: "Task Planner", icon: ListChecks },
  { id: "research" as const, label: "Research", icon: FileSearch },
];

const toolCopy = {
  email: { title: "Smart Email Generator", subtitle: "Turn a few key points into a polished email.", icon: Mail, time: "~30 sec" },
  planner: { title: "AI Task Planner", subtitle: "Build a focused schedule from competing priorities.", icon: ListChecks, time: "~45 sec" },
  research: { title: "AI Research Assistant", subtitle: "Distill complex material into clear next steps.", icon: FileSearch, time: "~1 min" },
};

const delay = (ms = 900) => new Promise((resolve) => setTimeout(resolve, ms));

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-9 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground shadow-glow"><Zap className="size-4" fill="currentColor" /></span>
      <span className="font-display text-lg font-semibold text-foreground">FlowDesk</span>
    </div>
  );
}

function Nav({ view, onSelect, closeOnSelect = false }: { view: View; onSelect: (view: View) => void; closeOnSelect?: boolean }) {
  return (
    <nav className="space-y-1" aria-label="Main navigation">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = view === item.id;
        const button = (
            <Button key={item.id}
              variant="ghost"
              onClick={() => onSelect(item.id)}
              className={cn("h-11 w-full justify-start px-3 text-muted-foreground", active && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground")}
            >
              <Icon className="size-4" />
              {item.label}
            </Button>
        );
        return closeOnSelect ? <SheetClose asChild key={item.id}>{button}</SheetClose> : button;
      })}
    </nav>
  );
}

function Sidebar({ view, onSelect }: { view: View; onSelect: (view: View) => void }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-border bg-sidebar px-4 py-5 lg:flex">
      <div className="px-2"><Logo /></div>
      <div className="mt-10"><p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Workspace</p><Nav view={view} onSelect={onSelect} /></div>
      <div className="mt-auto border-t border-border pt-4">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground"><Zap className="size-4" /></div>
          <div className="min-w-0"><p className="truncate text-sm font-medium text-foreground">Local workspace</p><p className="text-xs text-muted-foreground">No sign-in required</p></div>
        </div>
      </div>
    </aside>
  );
}

function MobileNav({ view, onSelect }: { view: View; onSelect: (view: View) => void }) {
  return (
    <Sheet>
      <SheetTrigger asChild><Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu"><Menu /></Button></SheetTrigger>
      <SheetContent side="left" className="w-72 border-border bg-sidebar p-5">
        <SheetTitle className="sr-only">FlowDesk navigation</SheetTitle>
        <Logo />
        <div className="mt-10"><Nav view={view} onSelect={onSelect} closeOnSelect /></div>
      </SheetContent>
    </Sheet>
  );
}

function OutputNote() {
  return <p className="mt-5 flex items-start gap-2 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground"><Sparkles className="mt-0.5 size-3.5 shrink-0 text-primary" />AI-generated draft. Review facts, tone, and details before use.</p>;
}

function Panel({ title, eyebrow, children, className }: { title: string; eyebrow?: string; children: ReactNode; className?: string }) {
  return <section className={cn("rounded-lg border border-border bg-card p-5 shadow-panel sm:p-6", className)}>{eyebrow && <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>}<h2 className="font-display text-lg font-semibold text-card-foreground">{title}</h2><div className="mt-5">{children}</div></section>;
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="block"><span className="mb-2 block text-xs font-medium text-foreground">{label}</span>{children}</label>;
}

function EmptyOutput({ text }: { text: string }) {
  return <div className="grid min-h-80 place-items-center rounded-md border border-dashed border-border bg-muted/30 p-8 text-center"><div><span className="mx-auto grid size-11 place-items-center rounded-full bg-secondary text-muted-foreground"><Sparkles className="size-5" /></span><p className="mt-4 text-sm text-muted-foreground">{text}</p></div></div>;
}

function LoadingOutput() {
  return <div className="min-h-80 space-y-5 rounded-md border border-border bg-muted/20 p-6" aria-live="polite"><div className="flex items-center gap-3 text-sm text-foreground"><RefreshCw className="size-4 animate-spin text-primary" />Thinking through your request…</div><div className="space-y-3 pt-3"><div className="h-3 w-2/3 animate-pulse rounded bg-secondary" /><div className="h-3 w-full animate-pulse rounded bg-secondary" /><div className="h-3 w-5/6 animate-pulse rounded bg-secondary" /><div className="h-3 w-3/4 animate-pulse rounded bg-secondary" /></div></div>;
}

async function copyText(text: string, setCopied: (value: boolean) => void) {
  await navigator.clipboard.writeText(text);
  setCopied(true);
  window.setTimeout(() => setCopied(false), 1500);
}

function EmailTool() {
  const [recipient, setRecipient] = useState("");
  const [purpose, setPurpose] = useState("");
  const [points, setPoints] = useState("");
  const [tone, setTone] = useState<Tone>("Formal");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    setLoading(true); await delay();
    const name = recipient.trim() || "Alex";
    const subject = purpose.trim() || "Next steps and project alignment";
    const opening = tone === "Friendly" ? `Hi ${name},` : `Dear ${name},`;
    const intent = purpose.trim() || "align on our priorities for the next phase";
    const detail = points.trim() || "Confirm the timeline, clarify ownership, and agree on the next review date.";
    const close = tone === "Persuasive" ? "I’m confident this approach will keep momentum high and give us a clear path forward." : tone === "Friendly" ? "I’d love to hear your thoughts when you have a moment." : "Please let me know if you require any additional information.";
    setResult(`Subject: ${subject}\n\n${opening}\n\nI’m writing to ${intent}.\n\n${detail}\n\n${close}\n\nBest regards,\nUsaid`);
    setLoading(false);
  };

  return <ToolLayout title={toolCopy.email.title} subtitle={toolCopy.email.subtitle} icon={Mail} input={<Panel title="Compose your brief" eyebrow="Input"><div className="space-y-5"><Field label="Recipient or context"><Input value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="e.g. Sarah, Head of Product" /></Field><Field label="Purpose"><Input value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="e.g. Follow up after our project review" /></Field><Field label="Key points"><Textarea value={points} onChange={(e) => setPoints(e.target.value)} placeholder="Add the details that should be included…" className="min-h-32 resize-none" /></Field><Field label="Tone"><div className="grid grid-cols-3 gap-2">{(["Formal", "Friendly", "Persuasive"] as Tone[]).map((item) => <Button key={item} type="button" variant={tone === item ? "default" : "outline"} onClick={() => setTone(item)} className="px-2">{item}</Button>)}</div></Field><Button onClick={generate} disabled={loading} className="h-11 w-full"><Sparkles />Generate email</Button></div></Panel>} output={<Panel title="Email draft" eyebrow="Output">{loading ? <LoadingOutput /> : result ? <div><pre className="whitespace-pre-wrap font-sans text-sm leading-7 text-foreground">{result}</pre><div className="mt-6 flex flex-wrap gap-2"><Button onClick={() => copyText(result, setCopied)}><Clipboard />{copied ? "Copied" : "Copy"}</Button><Button variant="outline" onClick={generate}><RefreshCw />Regenerate</Button></div><OutputNote /></div> : <EmptyOutput text="Your generated email will appear here." />}</Panel>} />;
}

function PlannerTool() {
  const [tasks, setTasks] = useState<Task[]>([{ id: 1, name: "Prepare project proposal", duration: "90 min", deadline: "Today, 3 PM", priority: "High" }, { id: 2, name: "Reply to client emails", duration: "30 min", deadline: "Today", priority: "Medium" }]);
  const [mode, setMode] = useState<"Daily" | "Weekly">("Daily");
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const update = (id: number, key: keyof Task, value: string) => setTasks((items) => items.map((task) => task.id === id ? { ...task, [key]: value } : task));
  const generate = async () => { setLoading(true); await delay(1050); setGenerated(true); setLoading(false); };
  const sorted = [...tasks].sort((a, b) => ({ High: 0, Medium: 1, Low: 2 }[a.priority] - { High: 0, Medium: 1, Low: 2 }[b.priority]));
  return <ToolLayout title={toolCopy.planner.title} subtitle={toolCopy.planner.subtitle} icon={ListChecks} input={<Panel title="Add your tasks" eyebrow="Input"><div className="mb-5 grid grid-cols-2 gap-2 rounded-md bg-muted p-1">{(["Daily", "Weekly"] as const).map((item) => <Button key={item} variant={mode === item ? "default" : "ghost"} size="sm" onClick={() => setMode(item)}>{item}</Button>)}</div><div className="space-y-3">{tasks.map((task, index) => <div key={task.id} className="rounded-md border border-border bg-muted/20 p-3"><div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2"><Input value={task.name} onChange={(e) => update(task.id, "name", e.target.value)} aria-label={`Task ${index + 1} name`} /><Button variant="ghost" size="icon" onClick={() => setTasks((items) => items.filter((item) => item.id !== task.id))} aria-label="Remove task"><Trash2 /></Button></div><div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3"><Input value={task.duration} onChange={(e) => update(task.id, "duration", e.target.value)} aria-label="Duration" placeholder="Duration" /><Input value={task.deadline} onChange={(e) => update(task.id, "deadline", e.target.value)} aria-label="Deadline" placeholder="Deadline" /><label className="relative"><select value={task.priority} onChange={(e) => update(task.id, "priority", e.target.value)} className="h-9 w-full appearance-none rounded-md border border-input bg-background px-3 pr-8 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring"><option>High</option><option>Medium</option><option>Low</option></select><ChevronDown className="pointer-events-none absolute right-2.5 top-2.5 size-4 text-muted-foreground" /></label></div></div>)}<Button variant="outline" className="w-full" onClick={() => setTasks((items) => [...items, { id: Date.now(), name: "", duration: "", deadline: "", priority: "Medium" }])}><Plus />Add task</Button><Button onClick={generate} disabled={loading || tasks.length === 0} className="h-11 w-full"><Sparkles />Build my {mode.toLowerCase()} plan</Button></div></Panel>} output={<Panel title={`${mode} schedule`} eyebrow="Output">{loading ? <LoadingOutput /> : generated ? <div className="space-y-3">{sorted.map((task, index) => <div key={task.id} className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 rounded-md border border-border bg-muted/20 p-4"><div className="flex size-8 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">{index + 1}</div><div className="min-w-0"><div className="flex flex-wrap items-center justify-between gap-2"><h3 className="font-medium text-foreground">{task.name || "Untitled task"}</h3><span className="text-xs text-primary">{task.duration || "Flexible"}</span></div><p className="mt-1 text-xs text-muted-foreground">{task.deadline || "No deadline"} · {task.priority} priority</p><p className="mt-3 text-sm leading-6 text-muted-foreground">{index === 0 ? "Scheduled first to protect focus for the highest-impact work." : "Placed here to balance urgency with energy and available time."}</p></div></div>)}<Button variant="outline" onClick={generate} className="mt-3"><RefreshCw />Regenerate</Button><OutputNote /></div> : <EmptyOutput text="Your prioritized schedule will appear here." />}</Panel>} />;
}

function ResearchTool() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ summary: string; insights: string[]; recommendations: string[] } | null>(null);
  const [copied, setCopied] = useState(false);
  const generate = async () => { setLoading(true); await delay(1100); const subject = topic.trim() || "the selected topic"; setResult({ summary: `${subject.slice(0, 120)} is best understood through its practical impact, current constraints, and the decisions it enables. The available material points to a need for focused experimentation rather than broad, unfocused adoption.`, insights: ["Clear goals and success measures produce more reliable outcomes.", "Human review remains essential where context and accuracy matter.", "Small, repeatable workflows tend to outperform large one-time initiatives."], recommendations: ["Begin with one measurable use case and establish a baseline.", "Review quality and risks at a consistent checkpoint.", "Document learnings before expanding the approach."] }); setLoading(false); };
  const plain = result ? `Summary\n${result.summary}\n\nKey Insights\n${result.insights.map((x) => `• ${x}`).join("\n")}\n\nRecommendations\n${result.recommendations.map((x) => `• ${x}`).join("\n")}` : "";
  return <ToolLayout title={toolCopy.research.title} subtitle={toolCopy.research.subtitle} icon={FileSearch} input={<Panel title="Research brief" eyebrow="Input"><div className="space-y-5"><Field label="Topic or source text"><Textarea value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Enter a topic, question, article, or notes to analyze…" className="min-h-60 resize-none" /></Field><p className="text-xs text-muted-foreground">Tip: Include context and what decision this research should support.</p><Button onClick={generate} disabled={loading} className="h-11 w-full"><Sparkles />Analyze</Button></div></Panel>} output={<Panel title="Research brief" eyebrow="Output">{loading ? <LoadingOutput /> : result ? <div className="space-y-7"><div><h3 className="flex items-center gap-2 text-sm font-semibold text-foreground"><FileSearch className="size-4 text-primary" />Summary</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{result.summary}</p></div><BulletSection title="Key insights" icon={<Lightbulb className="size-4" />} items={result.insights} /><BulletSection title="Recommendations" icon={<Check className="size-4" />} items={result.recommendations} /><div className="flex flex-wrap gap-2"><Button onClick={() => copyText(plain, setCopied)}><Clipboard />{copied ? "Copied" : "Copy"}</Button><Button variant="outline" onClick={generate}><RefreshCw />Regenerate</Button></div><OutputNote /></div> : <EmptyOutput text="Your summary, insights, and recommendations will appear here." />}</Panel>} />;
}

function BulletSection({ title, icon, items }: { title: string; icon: ReactNode; items: string[] }) {
  return <div><h3 className="flex items-center gap-2 text-sm font-semibold text-foreground"><span className="text-primary">{icon}</span>{title}</h3><ul className="mt-3 space-y-3">{items.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />{item}</li>)}</ul></div>;
}

function ToolLayout({ title, subtitle, icon: Icon, input, output }: { title: string; subtitle: string; icon: typeof Mail; input: ReactNode; output: ReactNode }) {
  return <div className="animate-rise"><div className="mb-7 flex items-start gap-4"><span className="grid size-11 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground"><Icon className="size-5" /></span><div><h1 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">{title}</h1><p className="mt-1 text-sm text-muted-foreground">{subtitle}</p></div></div><div className="grid items-start gap-5 xl:grid-cols-2">{input}{output}</div></div>;
}

function HomeView({ onSelect }: { onSelect: (view: View) => void }) {
  const activity = [
    { title: "Project follow-up email", meta: "Email · 12 minutes ago", icon: Mail, view: "email" as const },
    { title: "Friday priority plan", meta: "Planner · 48 minutes ago", icon: ListChecks, view: "planner" as const },
    { title: "Remote work trends", meta: "Research · Yesterday", icon: FileSearch, view: "research" as const },
  ];

  return <div className="animate-rise">
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-end">
      <div className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-widest text-primary">Dashboard</p><h1 className="mt-3 font-display text-3xl font-semibold text-foreground sm:text-4xl">Good morning, Usaid.</h1><p className="mt-3 text-base leading-7 text-muted-foreground">Here’s your workspace at a glance. What will you move forward today?</p></div>
      <div className="flex items-center gap-3 rounded-md border border-border bg-card px-4 py-3"><CalendarDays className="size-5 text-primary" /><div><p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Today</p><p className="text-sm font-medium text-foreground">Friday, 25 September</p></div></div>
    </div>

    <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
      <Metric value="12" label="Drafts created" detail="3 this week" />
      <Metric value="18" label="Tasks planned" detail="6 completed" />
      <Metric value="7" label="Research briefs" detail="2 this week" />
      <Metric value="4.2h" label="Time reclaimed" detail="Estimated" />
    </div>

    <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.75fr)]">
      <section className="rounded-lg border border-border bg-card p-5 shadow-panel sm:p-6">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4"><div className="min-w-0"><p className="text-[11px] font-semibold uppercase tracking-widest text-primary">Quick start</p><h2 className="mt-2 font-display text-xl font-semibold text-card-foreground">Choose a workflow</h2></div><Zap className="size-5 shrink-0 text-primary" /></div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">{(["email", "planner", "research"] as const).map((id) => { const item = toolCopy[id]; const Icon = item.icon; return <button key={id} onClick={() => onSelect(id)} className="group rounded-md border border-border bg-muted/20 p-4 text-left transition hover:border-primary/60 hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><span className="grid size-9 place-items-center rounded-md bg-secondary text-primary"><Icon className="size-4" /></span><h3 className="mt-5 font-display text-sm font-semibold text-card-foreground">{item.title}</h3><div className="mt-4 flex items-center justify-between text-xs text-muted-foreground"><span>{item.time}</span><ArrowRight className="size-4 transition group-hover:translate-x-1 group-hover:text-primary" /></div></button>; })}</div>
      </section>

      <section className="rounded-lg border border-primary/25 bg-warning-muted p-5 shadow-panel sm:p-6">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">Today’s focus</p><h2 className="mt-3 font-display text-xl font-semibold text-warning-muted-foreground">Protect your first 90 minutes.</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">Start with the project proposal, then clear client replies before planning the rest of the week.</p>
        <div className="mt-5 space-y-3"><FocusItem time="09:00" title="Project proposal" /><FocusItem time="10:30" title="Client email block" /><FocusItem time="11:15" title="Weekly planning" /></div>
        <Button className="mt-5 w-full" onClick={() => onSelect("planner")}><ListChecks />Open task planner</Button>
      </section>
    </div>

    <section className="mt-5 rounded-lg border border-border bg-card p-5 shadow-panel sm:p-6">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4"><div><p className="text-[11px] font-semibold uppercase tracking-widest text-primary">Recent activity</p><h2 className="mt-2 font-display text-xl font-semibold text-card-foreground">Pick up where you left off</h2></div><Clock3 className="size-5 text-muted-foreground" /></div>
      <div className="mt-5 divide-y divide-border">{activity.map((item) => { const Icon = item.icon; return <button key={item.title} onClick={() => onSelect(item.view)} className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 py-4 text-left first:pt-0 last:pb-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><span className="grid size-9 shrink-0 place-items-center rounded-md bg-secondary text-primary"><Icon className="size-4" /></span><span className="min-w-0"><span className="block truncate text-sm font-medium text-foreground">{item.title}</span><span className="mt-1 block text-xs text-muted-foreground">{item.meta}</span></span><ArrowRight className="size-4 shrink-0 text-muted-foreground" /></button>; })}</div>
    </section>
  </div>;
}

function Metric({ value, label, detail }: { value: string; label: string; detail: string }) { return <div className="rounded-lg border border-border bg-card p-4 shadow-panel sm:p-5"><p className="font-display text-2xl font-semibold text-primary sm:text-3xl">{value}</p><p className="mt-2 text-sm font-medium text-foreground">{label}</p><p className="mt-1 text-xs text-muted-foreground">{detail}</p></div>; }

function FocusItem({ time, title }: { time: string; title: string }) { return <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3"><span className="w-11 text-xs font-semibold text-primary">{time}</span><span className="truncate border-l border-primary/30 pl-3 text-sm text-warning-muted-foreground">{title}</span></div>; }

export function FlowDeskApp() {
  const [view, setView] = useState<View>("home");
  const [showBanner, setShowBanner] = useState(true);
  const current = navItems.find((item) => item.id === view)?.label ?? "Overview";
  return <div className="min-h-screen bg-background text-foreground"><Sidebar view={view} onSelect={setView} /><div className="lg:pl-64"><header className="sticky top-0 z-20 grid h-16 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-background/90 px-4 backdrop-blur-md sm:px-7"><MobileNav view={view} onSelect={setView} /><div className="min-w-0"><p className="truncate text-sm font-medium text-foreground">{current}</p><p className="hidden text-xs text-muted-foreground sm:block">AI-powered productivity workspace</p></div><div className="flex shrink-0 items-center gap-2"><span className="hidden items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground sm:flex"><span className="size-1.5 rounded-full bg-success" />All systems ready</span><Button size="icon" variant="outline" aria-label="Quick action"><Plus /></Button></div></header><main className="mx-auto max-w-7xl px-4 py-6 sm:px-7 sm:py-8">{showBanner && <div className="mb-6 grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3 rounded-md border border-primary/25 bg-warning-muted px-4 py-3 text-sm text-warning-muted-foreground"><Sparkles className="mt-0.5 size-4 shrink-0 text-primary" /><p className="min-w-0 leading-6"><strong className="font-semibold">Responsible AI:</strong> AI-generated content may contain errors — please review before use.</p><Button size="icon" variant="ghost" className="size-7" onClick={() => setShowBanner(false)} aria-label="Dismiss disclaimer"><X /></Button></div>}{view === "home" && <HomeView onSelect={setView} />}{view === "email" && <EmailTool />}{view === "planner" && <PlannerTool />}{view === "research" && <ResearchTool />}</main></div></div>;
}
