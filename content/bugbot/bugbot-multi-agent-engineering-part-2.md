---
title: "BugBot: Designing a Multi-Agent System for Engineering (Part 2)"
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

This is [Part 2 of the BugBot series](bugbot-multi-agent-engineering-part-1). [← Back to Part 1 — problem, architecture, and orchestrator choice](bugbot-multi-agent-engineering-part-1).

## Agent 1 — Senior bug analyst

The first agent owns **initial triage** as soon as a card lands in a given state on Jira—e.g. `Backlog` or `To Do` on a specific board.

A workflow in n8n or Windmill watches for **create** or **transition** events, pulls context (description, comments, and any linked logs you pipe in), and runs an LLM to produce a structured result: **summary, candidate root causes, and recommended next steps**.

Today I have a working slice of this: a **GitHub Actions** pipeline orchestrates a call to the **Cursor Agent**, post-processes the output, and posts a **formatted comment** back to the issue in Jira. In practice, Agent 1 acts like a senior support analyst: the bug arrives in engineering in a much clearer shape than a raw ticket.

## Agent 2 — Fix proposer (branch + PR)

The second agent takes over when the issue is **confirmed** as a real code problem.

It consumes Agent 1’s context, checks out the right **GitHub** repository, and uses the **Cursor CLI in non-interactive mode** to ask the coding agent to propose fixes in the right files.

The intended flow: create a branch that matches team naming rules, apply suggested changes, **run tests**, open a **PR** with a solid description and an impact checklist. **Nothing merges automatically**—humans stay in the loop for review—but the mechanical work of locating files, drafting the patch, and opening the PR is automated.

## Agent 3 — Proactive bug hunter (logs and metrics)

The third agent does **not** wait for a Jira ticket. On a schedule, a workflow fetches data from **observability** or an event store, summarizes trends, and asks the model whether a pattern looks like a **new defect** or a **regression** of a known one.

When it flags something suspicious, it **creates a Jira issue** with technical context, a rough timeline, and—when available—**links to Metabase** (or other) dashboards. Think of it as a **smoke detector** for production: less time between “the bug exists” and “the team is tracking it.”

## Agent 4 — Bug metrics and intelligence

The fourth agent behaves like a **data analyst for defects**.

It aggregates how many issues were opened, reopened, and resolved; **mean time to resolution**; recurring categories; and which teams or services take the most heat—using Jira and BI tooling.

Outputs can land on a **Metabase** dashboard, a **Slack** channel, or a leadership-ready narrative that makes **post-mortems** more evidence-driven: e.g. “most critical bugs in the last month clustered in this module” or “this failure mode is a candidate for a better alert upstream.”

## Agent 5 — Engineering standards reviewer

The fifth agent is about **rules and architecture**, not “fix the bug.”

It runs on **GitHub PR** events. With the Cursor Agent, it reviews the diff against **documented, objective** standards—files like `.cursor/rules`, `AGENTS.md`, or your team’s Confluence “must / must not” list. Examples: layering rules, “no UseCase-to-UseCase calls,” or “external calls only through a gateway interface.”

Unlike a generic style debate, the bar is **checklist-driven**. Agent 5 acts as an **assistant to the tech lead**: catch obvious structural violations before the final human review.

## Where the Cursor CLI fits

The Cursor Agent started as an in-editor experience, but there is an **official CLI** that runs the agent in any environment—**including CI/CD**.

The CLI can read and write files, navigate the repo, pull context, and run terminal commands, while respecting **repository rules** (e.g. `.cursor/rules` and `AGENTS.md`).

In BugBot I use it mainly when:

- **Agent 2** should propose an automated fix on a branch; and  
- **Agent 5** should review a PR against **engineering rules** in docs and the repo.

For **Agent 1**, the pipeline I already built calls the Cursor Agent in a **print / non-interactive** mode to turn an issue into a text analysis, then **formats** that output before sending it to Jira—proof the CLI is viable here.

**Next step on the roadmap:** flows where the agent not only **comments** but, under **explicit guardrails**, also creates **commits and PRs** so automation stays predictable and reviewable.

## What I learned from designing BugBot

Even before every agent is running in production, the design exercise already taught me a few things.

- **AI needs context, not “magic.”** The win is **wiring** Jira, logs, code, and docs together—not dropping a model on a blank page.
- **Multi-agent works when roles are clear.** Splitting **analysis, fix proposal, proactive monitoring, metrics, and standards review** beats one giant agent that does everything badly.
- **The orchestrator matters as much as the model.** Without something like n8n or Windmill, you lose **retries, observability, and governance** for the flows.
- **Human-in-the-loop stays central.** The goal was never to remove people—it is to **remove repetitive work** and keep humans on hard judgment calls.

In the end, BugBot is less about “a cool bot” and more about **engineering that treats agents, automation, and AI as part of the architecture**—not as a bolt-on. That, for me, is the real payoff of this journey.

---

*← [Part 1 — problem, architecture, and why n8n or Windmill](bugbot-multi-agent-engineering-part-1)*
