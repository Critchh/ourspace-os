import { useEffect, useMemo, useState } from "react";
import {
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiCloud,
  FiEdit3,
  FiLogIn,
  FiLogOut,
  FiSave,
  FiSend,
  FiSmile,
  FiTrash2,
} from "react-icons/fi";
import {
  isSupabaseConfigured,
  supabase,
} from "../lib/supabaseClient";

const moodScale = Array.from({ length: 10 }, (_, index) => index + 1);
const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const dailyEntryChangeEvent = "ourspace:daily-entry-change";

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function dateFromKey(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);

  return new Date(year, month - 1, day);
}

function formatDisplayDate(dateKey) {
  return dateFromKey(dateKey).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function getCalendarDays(monthDate) {
  const firstDay = startOfMonth(monthDate);
  const calendarStart = new Date(firstDay);
  calendarStart.setDate(calendarStart.getDate() - firstDay.getDay());

  return Array.from({ length: 42 }, (_, index) => {
    const day = new Date(calendarStart);
    day.setDate(calendarStart.getDate() + index);

    return day;
  });
}

function getMoodWord(mood) {
  if (mood <= 2) return "Sad";
  if (mood <= 4) return "Tender";
  if (mood <= 6) return "Steady";
  if (mood <= 8) return "Bright";

  return "Ecstatic";
}

function getEntryDraft(dateKey, entry) {
  return {
    dateKey,
    mood: entry?.mood ?? 5,
    note: entry?.note ?? "",
    reply: entry?.reply ?? "",
  };
}

function DailyTracker() {
  const todayKey = useMemo(() => formatDateKey(new Date()), []);
  const [session, setSession] = useState(null);
  const [authEmail, setAuthEmail] = useState("");
  const [authStatus, setAuthStatus] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [entries, setEntries] = useState([]);
  const [selectedDate, setSelectedDate] = useState(todayKey);
  const [visibleMonth, setVisibleMonth] = useState(() => startOfMonth(new Date()));
  const [loadingEntries, setLoadingEntries] = useState(false);
  const [draft, setDraft] = useState(() => getEntryDraft(todayKey));
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const entriesByDate = useMemo(() => {
    return entries.reduce((lookup, entry) => {
      lookup[entry.entry_date] = entry;

      return lookup;
    }, {});
  }, [entries]);

  const selectedEntry = entriesByDate[selectedDate];
  const activeDraft = draft.dateKey === selectedDate
    ? draft
    : getEntryDraft(selectedDate, selectedEntry);
  const isBusy = saving || deleting;

  const savedEntries = useMemo(() => {
    return [...entries].sort((a, b) => b.entry_date.localeCompare(a.entry_date));
  }, [entries]);
  const calendarDays = useMemo(() => getCalendarDays(visibleMonth), [visibleMonth]);
  const visibleMonthLabel = visibleMonth.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    if (!isSupabaseConfigured) return undefined;

    let mounted = true;

    async function loadSession() {
      const { data } = await supabase.auth.getSession();

      if (mounted) {
        setSession(data.session);
      }
    }

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured || !session) {
      return undefined;
    }

    let mounted = true;

    async function loadEntries() {
      setLoadingEntries(true);
      setError("");

      const { data, error: loadError } = await supabase
        .from("daily_entries")
        .select("id, entry_date, mood, note, reply, created_at, updated_at")
        .order("entry_date", { ascending: false });

      if (!mounted) return;

      if (loadError) {
        setError(loadError.message);
      } else {
        setEntries(data ?? []);

        const loadedSelectedEntry = (data ?? []).find((entry) => {
          return entry.entry_date === selectedDate;
        });

        setDraft(getEntryDraft(selectedDate, loadedSelectedEntry));
      }

      setLoadingEntries(false);
    }

    loadEntries();

    return () => {
      mounted = false;
    };
  }, [selectedDate, session]);

  async function requestMagicLink(event) {
    event.preventDefault();

    if (!authEmail.trim()) {
      setAuthStatus("Enter the email that was added in Supabase.");

      return;
    }

    setAuthLoading(true);
    setAuthStatus("");

    const { error: signInError } = await supabase.auth.signInWithOtp({
      email: authEmail.trim(),
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    setAuthLoading(false);

    if (signInError) {
      setAuthStatus(signInError.message);
    } else {
      setAuthStatus("Check your email for the OurSpace sign-in link.");
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    setStatus("");
    setEntries([]);
    setDraft(getEntryDraft(todayKey));
  }

  function selectDate(date) {
    const dateKey = formatDateKey(date);

    setSelectedDate(dateKey);
    setVisibleMonth(startOfMonth(date));
    setDraft(getEntryDraft(dateKey, entriesByDate[dateKey]));
    setStatus("");
  }

  function changeMonth(direction) {
    setVisibleMonth((currentMonth) => {
      return new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + direction,
        1
      );
    });
  }

  async function saveEntry(action = "note") {
    if (deleting) return;

    const normalizedMood = Number(activeDraft.mood);

    if (normalizedMood < 1 || normalizedMood > 10) {
      setError("Choose a mood from 1 to 10.");

      return;
    }

    setSaving(true);
    setError("");
    setStatus("");

    const savedNote = action === "reply"
      ? selectedEntry?.note ?? activeDraft.note.trim()
      : activeDraft.note.trim();
    const savedReply = action === "reply"
      ? activeDraft.reply.trim()
      : selectedEntry?.reply ?? "";
    const savedMood = action === "reply"
      ? selectedEntry?.mood ?? normalizedMood
      : normalizedMood;

    const { data, error: saveError } = await supabase
      .from("daily_entries")
      .upsert(
        {
          entry_date: selectedDate,
          mood: savedMood,
          note: savedNote,
          reply: savedReply,
        },
        { onConflict: "entry_date" }
      )
      .select("id, entry_date, mood, note, reply, created_at, updated_at")
      .single();

    setSaving(false);

    if (saveError) {
      setError(saveError.message);

      return;
    }

    setEntries((currentEntries) => {
      const withoutSavedDate = currentEntries.filter((entry) => {
        return entry.entry_date !== selectedDate;
      });

      return [data, ...withoutSavedDate];
    });
    setDraft(getEntryDraft(selectedDate, data));
    window.dispatchEvent(new CustomEvent(dailyEntryChangeEvent, { detail: data }));

    setStatus(
      action === "reply"
        ? "Ian's reply is saved for this day."
        : "Hannah's note and mood are saved for this day."
    );
  }

  async function deleteEntry() {
    if (!selectedEntry || deleting) return;

    setDeleting(true);
    setError("");
    setStatus("");

    const { error: deleteError } = await supabase
      .from("daily_entries")
      .delete()
      .eq("entry_date", selectedDate);

    setDeleting(false);

    if (deleteError) {
      setError(deleteError.message);

      return;
    }

    setEntries((currentEntries) =>
      currentEntries.filter((entry) => entry.entry_date !== selectedDate)
    );
    setDraft(getEntryDraft(selectedDate));
    window.dispatchEvent(new CustomEvent(dailyEntryChangeEvent));
    setStatus("This note was deleted from your shared tracker.");
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="tracker-setup-state">
        <div className="tracker-setup-icon">
          <FiCloud />
        </div>

        <p className="app-kicker">SUPABASE NEEDED</p>
        <h2>Connect the Shared Tracker</h2>

        <p>
          Add <strong>VITE_SUPABASE_URL</strong> and{" "}
          <strong>VITE_SUPABASE_ANON_KEY</strong> to your local environment, then
          run the SQL in <strong>docs/supabase-daily-tracker.sql</strong>.
        </p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="tracker-auth-state">
        <div className="tracker-setup-icon">
          <FiLogIn />
        </div>

        <p className="app-kicker">PRIVATE DAILY CHECK-IN</p>
        <h2>Sign in to OurSpace</h2>

        <p>
          Use one of the emails added to the Supabase member list. The tracker
          only saves entries for approved accounts.
        </p>

        <form className="tracker-auth-form" onSubmit={requestMagicLink}>
          <input
            type="email"
            placeholder="your@email.com"
            value={authEmail}
            onChange={(event) => setAuthEmail(event.target.value)}
          />

          <button type="submit" disabled={authLoading}>
            <FiLogIn />
            {authLoading ? "Sending..." : "Send Sign-In Link"}
          </button>
        </form>

        {authStatus && <p className="tracker-inline-status">{authStatus}</p>}
      </div>
    );
  }

  return (
    <div className="daily-tracker-app">
      <div className="tracker-hero">
        <div>
          <p className="app-kicker">DAILY TRACKER</p>
          <h2>How was today?</h2>
          <p>
            A soft place for Hannah's note, Ian's reply, and every saved day in
            between.
          </p>
        </div>

        <button className="tracker-sign-out" onClick={signOut}>
          <FiLogOut />
          Sign Out
        </button>
      </div>

      <div className="tracker-layout">
        <section className="tracker-editor-card">
          <div className="tracker-date-row">
            <div>
              <span>Selected Day</span>
              <strong>{formatDisplayDate(selectedDate)}</strong>
            </div>

            <button onClick={() => selectDate(dateFromKey(todayKey))}>
              Today
            </button>
          </div>

          <div className="tracker-mood-panel">
            <div className="tracker-section-heading">
              <FiSmile />
              <div>
                <h3>Mood Rating</h3>
                <p>
                  {activeDraft.mood}/10 · {getMoodWord(activeDraft.mood)}
                </p>
              </div>
            </div>

            <div className="mood-endpoints">
              <span>1 · Sad</span>
              <span>10 · Ecstatic</span>
            </div>

            <div className="mood-scale" role="radiogroup" aria-label="Mood rating">
              {moodScale.map((value) => (
                <button
                  type="button"
                  className={
                    value === activeDraft.mood ? "mood-dot active" : "mood-dot"
                  }
                  key={value}
                  onClick={() => {
                    setDraft((currentDraft) => ({
                      ...currentDraft,
                      dateKey: selectedDate,
                      mood: value,
                    }));
                  }}
                  aria-pressed={value === activeDraft.mood}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          <label className="tracker-field">
            <span>
              <FiEdit3 />
              Hannah's Daily Note
            </span>
            <textarea
              value={activeDraft.note}
              onChange={(event) => {
                setDraft((currentDraft) => ({
                  ...currentDraft,
                  dateKey: selectedDate,
                  note: event.target.value,
                }));
              }}
              placeholder="Write anything about today..."
              rows="5"
            />
          </label>

          <label className="tracker-field">
            <span>
              <FiSend />
              Ian's Reply
            </span>
            <textarea
              value={activeDraft.reply}
              onChange={(event) => {
                setDraft((currentDraft) => ({
                  ...currentDraft,
                  dateKey: selectedDate,
                  reply: event.target.value,
                }));
              }}
              placeholder="Leave a reply for this day..."
              rows="4"
            />
          </label>

          <div className="tracker-actions">
            <button onClick={() => saveEntry("note")} disabled={isBusy}>
              <FiSave />
              {saving ? "Saving..." : "Save Note"}
            </button>

            <button
              className="reply-button"
              onClick={() => saveEntry("reply")}
              disabled={isBusy}
            >
              <FiSend />
              Save Reply
            </button>

            <button
              className="delete-button"
              onClick={deleteEntry}
              disabled={!selectedEntry || isBusy}
            >
              <FiTrash2 />
              {deleting ? "Deleting..." : "Delete Note"}
            </button>
          </div>

          {status && <p className="tracker-success">{status}</p>}
          {error && <p className="tracker-error">{error}</p>}
        </section>

        <section className="tracker-calendar-card">
          <div className="calendar-header">
            <button aria-label="Previous month" onClick={() => changeMonth(-1)}>
              <FiChevronLeft />
            </button>

            <div>
              <FiCalendar />
              <strong>{visibleMonthLabel}</strong>
            </div>

            <button aria-label="Next month" onClick={() => changeMonth(1)}>
              <FiChevronRight />
            </button>
          </div>

          <div className="calendar-weekdays">
            {weekdayLabels.map((weekday) => (
              <span key={weekday}>{weekday}</span>
            ))}
          </div>

          <div className="tracker-calendar-grid">
            {calendarDays.map((day) => {
              const dateKey = formatDateKey(day);
              const entry = entriesByDate[dateKey];
              const isVisibleMonth = day.getMonth() === visibleMonth.getMonth();
              const isSelected = dateKey === selectedDate;

              return (
                <button
                  type="button"
                  className={[
                    "calendar-day",
                    isVisibleMonth ? "" : "outside-month",
                    entry ? "rated" : "",
                    isSelected ? "selected" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  key={dateKey}
                  onClick={() => selectDate(day)}
                >
                  <span>{day.getDate()}</span>
                  {entry && <strong>{entry.mood}</strong>}
                </button>
              );
            })}
          </div>

          <div className="selected-day-summary">
            <span>{selectedEntry ? "Saved Day" : "Unsaved Day"}</span>
            <h3>{selectedEntry ? `${selectedEntry.mood}/10` : "No rating yet"}</h3>
            <p>{selectedEntry?.note || "Choose a mood and add Hannah's note."}</p>
            {selectedEntry?.reply && <blockquote>{selectedEntry.reply}</blockquote>}
          </div>

          <div className="saved-days-list">
            <div className="saved-days-heading">
              <strong>All Rated Days</strong>
              <span>{loadingEntries ? "Loading..." : `${savedEntries.length} saved`}</span>
            </div>

            {savedEntries.length > 0 ? (
              savedEntries.map((entry) => (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => selectDate(dateFromKey(entry.entry_date))}
                >
                  <span>{formatDisplayDate(entry.entry_date)}</span>
                  <strong>{entry.mood}/10</strong>
                </button>
              ))
            ) : (
              <p>No rated days yet.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default DailyTracker;
