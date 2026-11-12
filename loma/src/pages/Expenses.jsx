import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import PageHeader from "../components/PageHeader";

const CURRENCY = "₹";
const CATS = ["Food 🍜", "Transport 🚌", "Study 📚", "Fun 🎮", "Other 🧾"];

export default function Expenses() {
  const [expenses, setExpenses] = useLocalStorage("loma-expenses", []);
  const [target, setTarget] = useLocalStorage("loma-savings-target", { goal: "", income: "" });
  const [form, setForm] = useState({ label: "", amount: "", category: CATS[0], date: new Date().toISOString().slice(0, 10) });

  const monthKey = new Date().toISOString().slice(0, 7); // YYYY-MM
  const thisMonth = expenses.filter((e) => e.date.startsWith(monthKey));
  const spentThisMonth = thisMonth.reduce((s, e) => s + Number(e.amount), 0);
  const totalSpent = expenses.reduce((s, e) => s + Number(e.amount), 0);

  const income = Number(target.income) || 0;
  const goal = Number(target.goal) || 0;
  const projectedSavings = Math.max(income - spentThisMonth, 0);
  const progress = goal > 0 ? Math.min((projectedSavings / goal) * 100, 100) : 0;

  const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  const daysLeft = daysInMonth - new Date().getDate();
  const remaining = Math.max(income - spentThisMonth, 0);
  const perDay = daysInMonth > 0 ? remaining / Math.max(daysLeft, 1) : 0;

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.label.trim() || !form.amount || Number(form.amount) <= 0) return;
    setExpenses((prev) => [...prev, { ...form, id: crypto.randomUUID(), amount: Number(form.amount) }]);
    setForm({ ...form, label: "", amount: "" });
  }

  function remove(id) {
    setExpenses((prev) => prev.filter((x) => x.id !== id));
  }

  // Group this month's expenses by day for a mini ledger
  const sorted = [...expenses].sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));

  return (
    <section className="mx-auto max-w-5xl px-4">
      <PageHeader
        icon="🍜"
        title="Ramen & Ryo Ledger"
        tagline="Even a Hokage budgets before buying Ichiraku ramen for the whole village."
      />

      {/* Daily expense entry */}
      <form onSubmit={handleSubmit} className="scroll-card mb-8 grid gap-4 rounded-2xl p-6 sm:grid-cols-4">
        <input
          className="chakra-input rounded-xl px-4 py-2.5 sm:col-span-2"
          placeholder="What did you spend on?"
          value={form.label}
          onChange={(e) => setForm({ ...form, label: e.target.value })}
          required
        />
        <input
          type="number"
          min="0"
          step="any"
          className="chakra-input rounded-xl px-4 py-2.5"
          placeholder={`Amount ${CURRENCY}`}
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          required
        />
        <select
          className="chakra-input rounded-xl px-4 py-2.5"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          {CATS.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <input
          type="date"
          className="chakra-input rounded-xl px-4 py-2.5"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />
        <div className="sm:col-span-3">
          <button type="submit" className="rasengan-btn w-full rounded-xl px-6 py-3 uppercase tracking-widest">
            ⚡ Log Expense
          </button>
        </div>
      </form>

      {/* Summary cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="scroll-card rounded-2xl p-5 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-scroll/50">Spent this month</p>
          <p className="mt-2 font-display text-3xl font-black text-foil">
            {CURRENCY} {spentThisMonth.toFixed(2)}
          </p>
        </div>
        <div className="scroll-card rounded-2xl p-5 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-scroll/50">All-time spending</p>
          <p className="mt-2 font-display text-3xl font-black text-rank">
            {CURRENCY} {totalSpent.toFixed(2)}
          </p>
        </div>
        <div className="scroll-card rounded-2xl p-5 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-scroll/50">Safe to spend / day ({daysLeft} left)</p>
          <p className="mt-2 font-display text-3xl font-black text-leaf-bright">
            {CURRENCY} {perDay.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Savings Target Projector */}
      <div className="scroll-card mb-10 rounded-2xl p-6">
        <h2 className="mb-1 font-display text-2xl font-bold text-sage">🔮 Savings Target Projector</h2>
        <p className="mb-5 text-sm text-scroll/60">
          Set your monthly budget and savings goal — Loma projects whether you'll hit it.
        </p>
        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-xs font-bold uppercase tracking-wide text-scroll/60">
            Monthly income / budget ({CURRENCY})
            <input
              type="number"
              min="0"
              step="any"
              className="chakra-input rounded-xl px-4 py-2.5"
              placeholder="e.g. 8000"
              value={target.income}
              onChange={(e) => setTarget({ ...target, income: e.target.value })}
            />
          </label>
          <label className="flex flex-col gap-1 text-xs font-bold uppercase tracking-wide text-scroll/60">
            Savings goal per month ({CURRENCY})
            <input
              type="number"
              min="0"
              step="any"
              className="chakra-input rounded-xl px-4 py-2.5"
              placeholder="e.g. 2000"
              value={target.goal}
              onChange={(e) => setTarget({ ...target, goal: e.target.value })}
            />
          </label>
        </div>

        {goal > 0 && income > 0 ? (
          <div>
            <div className="mb-2 flex items-end justify-between">
              <span className="text-sm font-bold text-scroll/80">
                Projected savings: <span className="text-leaf-bright">{CURRENCY} {projectedSavings.toFixed(2)}</span>{" "}
                of {CURRENCY} {goal.toFixed(2)}
              </span>
              <span className={`font-display text-lg font-black ${progress >= 100 ? "text-leaf-bright" : progress >= 60 ? "text-rank" : "text-red-400"}`}>
                {progress.toFixed(0)}%
              </span>
            </div>
            {/* Progress bar */}
            <div className="h-5 overflow-hidden rounded-full border border-rank/30 bg-ink">
              <div
                className="flex h-full items-center justify-end rounded-full pr-2 transition-all duration-500"
                style={{
                  width: `${Math.max(progress, 4)}%`,
                  background: "linear-gradient(90deg, #1f6f43, #34d399)",
                }}
              >
                {progress >= 15 && <span className="text-[10px] font-black text-ink">CHAKRA</span>}
              </div>
            </div>
            <p className="mt-4 rounded-xl bg-ink/60 p-3 text-sm">
              {progress >= 100 ? (
                <span className="font-bold text-leaf-bright">
                  🎉 Dattebayo! You are on track to reach your savings goal this month. Keep your guard up and stay disciplined!
                </span>
              ) : (
                <span className="text-scroll/80">
                  🥡 To hit your goal you must spend no more than{" "}
                  <b className="text-foil">{CURRENCY} {(remaining > 0 ? Math.max(income - goal - spentThisMonth, 0) / Math.max(daysLeft, 1) : 0).toFixed(2)}</b>{" "}
                  per day for the remaining <b>{daysLeft}</b> days. Trim the extra ramen bowls and train your wallet like you train your jutsu!
                </span>
              )}
            </p>
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-scroll/20 p-4 text-center text-sm text-scroll/50">
            Enter both a monthly budget and a savings goal to activate the projector.
          </p>
        )}
      </div>

      {/* Ledger */}
      <h2 className="mb-4 font-display text-xl font-bold text-leaf-bright">📒 Expense Scroll</h2>
      {sorted.length === 0 ? (
        <p className="rounded-xl border border-dashed border-scroll/20 p-4 text-center text-sm text-scroll/50">
          No expenses logged yet. Your scroll is clean — for now.
        </p>
      ) : (
        <ul className="grid gap-3">
          {sorted.slice(0, 60).map((x) => (
            <li key={x.id} className="scroll-card flex items-center justify-between gap-3 rounded-xl px-4 py-3">
              <div className="min-w-0">
                <p className="truncate font-bold text-scroll">{x.label}</p>
                <p className="text-xs text-scroll/50">
                  {x.category} · {x.date}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="font-display text-lg font-black text-foil">{CURRENCY} {Number(x.amount).toFixed(2)}</span>
                <button onClick={() => remove(x.id)} className="text-xs font-bold text-red-400 hover:text-red-300">
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
