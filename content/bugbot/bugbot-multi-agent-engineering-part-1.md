---
title: "BugBot: Designing a Multi-Agent System for Engineering (Part 1)"
draft: false
tags:
  - bugbot
  - ai-agents
  - automation
  - n8n
  - windmill
  - cursor
created: 2026-04-27
---
![[assets/bugbot/bugbot.png]]

Over the last few months I have been designing **BugBot**: a multi-agent AI system to help the engineering org analyze, prioritize, and even fix bugs. It is not a finished product yet, but going through the architecture has already changed how I think about **AI-native engineering** inside a company.

**Part 1 of 2.** Continue to [Part 2 — agents in detail, Cursor CLI, and lessons learned](bugbot-multi-agent-engineering-part-2).

## Why BugBot exists

Every growing company starts to feel pain from recurring bugs, regressions, and long queues between support, customer success, and engineering. In practice, information is everywhere: Jira, logs, dashboards, pull requests, Confluence, and Slack.

The idea of BugBot is to wrap that flow in a **belt of smart automations**: AI agents orchestrated by a workflow tool (n8n or Windmill) to do what humans cannot do 24/7—read across systems, correlate signals, and suggest next steps.

Instead of a single “do everything” bot, I designed BugBot as **five specialized agents** that talk to each other and to the stack we already use: Jira, GitHub, Slack, Metabase, and the codebase itself.

## High-level architecture

The core of BugBot is a **workflow orchestrator**—n8n or Windmill.

- **n8n** is an open source automation platform with a visual builder, hundreds of integrations, and code when you need it. It is built to connect APIs, services, and AI flows.
- **Windmill** is more **code-first**: you write Python, TypeScript, or Go, then turn that into workflows, webhooks, and even small internal UIs—again open source, aimed at engineering teams.

On top of the orchestrator I connect Jira and GitHub events, observability signals, and—when the work is real code—I invoke the **Cursor Agent via CLI** inside pipelines.

Communication is built on **clear triggers** (issue created or moved, PR opened, critical log pattern) and **webhooks** when an agent finishes an analysis. Each agent has a **narrow, explicit remit** so we avoid the “super-bot” that tries to do everything and does nothing well.

![[assets/bugbot/flow.png]]

## The five agents (overview)

1. **Bug analyst (“senior”)** — When a card hits a given state on a Jira board, a workflow detects it, gathers context (description, comments, related logs), and runs an LLM pass that returns a summary, possible causes, and next steps. I already have a working version of this flow using **GitHub Actions** to call the Cursor Agent, format the output, and post a structured comment back to Jira—like a senior support analyst tightening the report before engineering picks it up.

2. **Fix proposer (branch + PR)** — For bugs that are real code issues, this agent takes Agent 1’s context, targets the right GitHub repo, and uses the **Cursor CLI in non-interactive mode** to propose changes in specific files. The workflow should create a branch following team conventions, run tests, and open a PR with description and impact checklist. Nothing ships without a human: people still review, but the grind of “find the file, write the patch, open the PR” is outsourced.

3. **Proactive log hunter** — This one does not wait for a ticket. A recurring workflow pulls logs or metrics, summarizes what is happening, and asks the model whether that looks like a new bug or a regression. When it sees something off, it opens a Jira issue with technical context, a timeline, and links to Metabase (or other) dashboards—**shrinking the gap** between “something is wrong in prod” and “someone noticed.”

4. **Bug metrics and intelligence** — An analyst-style agent over Jira and BI: opened vs reopened, time to resolution, recurring categories, teams most affected. It produces insights like “80% of critical bugs in the last few weeks came from this module” or “this class of incident could be reduced with a better alert in system X,” feeding Metabase, Slack, or post-mortem prep.

5. **Engineering standards reviewer** — Triggered on GitHub PR events, it uses the Cursor Agent to check the diff against **objective** rules in team docs and repo rules—e.g. “a UseCase must not call another UseCase” or “all external I/O goes through a specific gateway.” It is not about taste; it is a **checklist** that helps the tech lead by surfacing obvious misses before the human pass.

[Continue to **Part 2** for a full write-up of each agent, the Cursor CLI’s role, and what I learned from designing BugBot →](bugbot-multi-agent-engineering-part-2)

## Why n8n or Windmill (not a pile of ad hoc scripts)

I could wire crons, one-off scripts, and raw webhooks by hand, but that becomes **un maintainable** fast. n8n and Windmill both solve: multi-step flows, integrations, and **retries** in a way that is visual or code-oriented and still **auditable**.

- **n8n** shines when you want to move fast with a visual node graph and ready-made nodes for Jira, GitHub, Slack, HTTP, and AI, while still dropping into code.
- **Windmill** shines when you want **git-versioned**, code-first workflows in Python/TypeScript, complex composition, and optional internal APIs or UIs.

BugBot needs:

- Triggers on external events (Jira, GitHub, Cursor webhooks).
- Sync and async steps with retries.
- Centralized credentials and permissions.
- Observability: run history, logs, and alerts.

Both platforms cover that package; the choice is usually **team culture and stack**, not a single “right” answer.

---

*Next: [Part 2 — The five agents in detail, Cursor CLI, and lessons learned](bugbot-multi-agent-engineering-part-2).*
