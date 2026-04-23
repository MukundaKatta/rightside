"use client";

import { useState } from "react";
import Link from "next/link";

interface Scenario {
  keywords: string[];
  question: string;
  answer: string;
}

const SCENARIOS: Scenario[] = [
  {
    keywords: ["deposit", "security deposit", "security"],
    question:
      "My landlord is refusing to return my security deposit after I moved out. The apartment was in good condition.",
    answer:
      "In most US states, landlords must return your security deposit within 14–30 days of move-out, minus only documented damages. They cannot keep it for normal wear and tear. If they don't return it or provide an itemized deduction list, you can sue in small claims court — and in many states (like California) you can recover up to 2× the deposit as a penalty. Send a written demand letter first (certified mail). If they don't respond within 14 days, file in small claims. You usually don't need a lawyer for this.",
  },
  {
    keywords: ["repair", "repairs", "maintenance", "broken", "fix"],
    question:
      "My landlord won't fix a leaking roof / broken heater / plumbing issue. What can I do?",
    answer:
      "Landlords are legally required to maintain habitable conditions under the implied warranty of habitability. This includes working plumbing, heating, weatherproofing, and structural integrity. Send a written repair request (email or certified mail) with a reasonable deadline (typically 14–30 days depending on your state). If they ignore it, most states allow you to: (1) withhold rent until repairs are made, (2) \"repair and deduct\" — hire someone and subtract the cost from rent, or (3) report to your local housing code enforcement. Document everything with photos and timestamps.",
  },
  {
    keywords: ["eviction", "evict", "kicked out", "leave", "vacate"],
    question:
      "My landlord says I have to leave immediately. Can they do that?",
    answer:
      "No. In every US state, landlords must follow a formal eviction process. They cannot change locks, remove your belongings, or shut off utilities — that's an illegal \"self-help\" eviction and you can sue for damages. The legal process requires: (1) written notice (typically 3–30 days depending on the reason and state), (2) filing an eviction lawsuit if you don't leave, (3) a court hearing where you can defend yourself, and (4) only a sheriff or marshal can physically remove you after a court order. If your landlord tries to force you out without this process, call local legal aid immediately.",
  },
  {
    keywords: ["notice", "30 days", "lease termination", "end lease", "move out notice", "break lease"],
    question:
      "How much notice do I need to give before moving out? What if I need to break my lease early?",
    answer:
      "For month-to-month tenancies, most states require 30 days' written notice (some require 60). For fixed-term leases, you're generally bound until the end date. Breaking early may cost you: the landlord can charge rent until they find a new tenant, but they have a legal duty to mitigate damages (actively try to re-rent). Check your lease for an early termination clause — many allow you to break the lease by paying 1–2 months' rent as a fee. Exceptions that let you break without penalty: uninhabitable conditions, domestic violence (many states), active military duty (federal SCRA), or landlord harassment.",
  },
  {
    keywords: ["rent", "increase", "hike", "raise", "rent increase", "rent hike"],
    question:
      "My landlord wants to raise my rent significantly. Is this legal?",
    answer:
      "It depends on your lease type and location. During a fixed-term lease, rent cannot be raised until the lease expires — the amount is locked in. For month-to-month tenancies, landlords can raise rent with proper written notice (usually 30–60 days). In rent-controlled cities (NYC, San Francisco, Los Angeles, etc.), annual increases are capped — often 3–10%. Outside rent control, there's usually no cap, but the increase can't be retaliatory (e.g., raising rent because you complained about repairs). If you suspect retaliation, document the timeline and file a complaint with your local tenant rights board.",
  },
];

function matchScenario(input: string): Scenario | null {
  const lower = input.toLowerCase();
  let best: Scenario | null = null;
  let bestCount = 0;
  for (const s of SCENARIOS) {
    const count = s.keywords.filter((kw) => lower.includes(kw)).length;
    if (count > bestCount) {
      bestCount = count;
      best = s;
    }
  }
  if (best) return best;
  // Fallback: return the first scenario (deposit) as default
  return SCENARIOS[0];
}

export default function TryPage() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState<{ question: string; answer: string } | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim()) return;
    const scenario = matchScenario(question);
    if (scenario) {
      setResult({ question: question.trim(), answer: scenario.answer });
    }
  }

  function handleReset() {
    setQuestion("");
    setResult(null);
  }

  function handleExample(text: string) {
    setQuestion(text);
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-sky-500" />
          RightSide
        </Link>
        <Link
          href="/#waitlist"
          className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
        >
          Get early access
        </Link>
      </nav>

      <div className="mx-auto max-w-2xl px-6 py-12">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-sky-600">
            Legal copilot
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">
            Ask a landlord/tenant question.
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Paste your situation or question below. This v0 demo covers five common scenarios:
            security deposits, repairs, eviction, lease notices, and rent increases.
          </p>
        </div>

        {result ? (
          <div className="space-y-6">
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-wider text-sky-600">
                Your question
              </div>
              <p className="mt-2 rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm italic text-neutral-700">
                {result.question}
              </p>
              <div className="mt-6 text-xs font-semibold uppercase tracking-wider text-sky-600">
                Plain-English answer
              </div>
              <div className="mt-2 text-sm leading-relaxed text-neutral-800">
                {result.answer}
              </div>
              <p className="mt-4 text-xs text-neutral-400">
                This is general legal information, not legal advice. Consult an attorney for your
                specific situation.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={handleReset}
                className="rounded-full bg-neutral-900 px-7 py-3.5 font-medium text-white transition hover:bg-neutral-700"
              >
                Ask another question
              </button>
              <Link
                href="/#waitlist"
                className="rounded-full border border-neutral-300 px-7 py-3.5 text-center font-medium text-neutral-900 transition hover:border-neutral-900"
              >
                Get early access
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="e.g. My landlord won't return my security deposit even though I left the apartment clean..."
                rows={5}
                className="w-full rounded-2xl border border-neutral-300 bg-white px-5 py-4 text-sm placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10"
              />
              <button
                type="submit"
                disabled={!question.trim()}
                className="w-full rounded-full bg-neutral-900 px-7 py-3.5 font-medium text-white transition hover:bg-neutral-700 disabled:opacity-40"
              >
                Get my answer
              </button>
            </form>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Or try one of these
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "My landlord won't return my security deposit",
                  "The heater in my apartment is broken and my landlord won't fix it",
                  "My landlord says I need to leave immediately",
                  "How much notice do I need to give before moving out?",
                  "My landlord wants to raise rent by 40%",
                ].map((text) => (
                  <button
                    key={text}
                    onClick={() => handleExample(text)}
                    className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs text-neutral-600 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
                  >
                    {text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <p className="mt-8 text-center text-xs text-neutral-400">
          This is a v0 preview with 5 hardcoded scenarios.{" "}
          <Link href="/#waitlist" className="underline hover:text-neutral-600">
            Join the waitlist
          </Link>{" "}
          for the full AI-powered experience.
        </p>
      </div>
    </div>
  );
}
