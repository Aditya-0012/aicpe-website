# CareerPilot — Career Command Center

A polished, responsive, local-first career-planning dashboard built with vanilla HTML, CSS, and JavaScript. It lives under `projects/careerpilot-ai/` so it does not disturb the existing AICPE website.

## Features
- Application tracker: add roles, cycle statuses, filter the pipeline, remove entries, and export JSON.
- Dashboard metrics and a status pipeline derived from your applications.
- Daily focus checklist with saved progress.
- Job-description matcher with matched/missing skill keywords and practical next steps.
- Eight interview-practice questions with a STAR framework and saved notes.
- Responsive desktop/mobile UI, accessible form labels, keyboard focus styles, and reduced-motion support.
- Local-first persistence with browser localStorage. No server or API key required.

## Run locally
Open `index.html` in a browser, or run a static server from this folder:

```bash
python -m http.server 8000
```

Visit `http://localhost:8000`.

## Honest AI limitation
The job matcher is a transparent keyword heuristic, not a connected LLM or hiring prediction. No external AI API is called. To add genuine AI feedback, build a backend endpoint, store the provider API key only in server-side environment variables, validate inputs, add rate limits, and call the model from the backend.

## Data and privacy
Application records, focus checklist state, and interview notes are saved in this browser's localStorage. Use **Export your data** to download a JSON backup. Clearing browser storage removes saved data.

## Manual smoke test
1. Add an application and verify the dashboard count changes.
2. Cycle its status with the circular-arrow button and check pipeline totals.
3. Filter applications, remove one, and export JSON.
4. Complete a focus task and refresh to check persistence.
5. Paste a job description and run the matcher.
6. Write an interview answer, navigate away and back, and verify it is retained.
