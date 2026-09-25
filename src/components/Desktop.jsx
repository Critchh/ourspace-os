import { useEffect, useState } from "react";

import {
  FiBookOpen,
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiFeather,
  FiHome,
  FiImage,
  FiLock,
  FiMail,
  FiMap,
  FiMoreHorizontal,
  FiMusic,
} from "react-icons/fi";

import Window from "./Window";
import DailyTracker from "../apps/DailyTracker";
import Future from "../apps/Future";
import Messages from "../apps/Messages";
import Music from "../apps/Music";
import Photos from "../apps/Photos";
import Story from "../apps/Story";
import Vault from "../apps/Vault";
import {
  isSupabaseConfigured,
  supabase,
} from "../lib/supabaseClient";

const dailyEntryChangeEvent = "ourspace:daily-entry-change";

function formatRecapDate(dateKey) {
  if (!dateKey) return "";

  const [year, month, day] = dateKey.split("-").map(Number);

  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getMoodWord(mood) {
  if (mood <= 2) return "Sad";
  if (mood <= 4) return "Tender";
  if (mood <= 6) return "Steady";
  if (mood <= 8) return "Bright";

  return "Ecstatic";
}

function Desktop() {
  const [activeApp, setActiveApp] = useState(null);
  const [latestEntry, setLatestEntry] = useState(null);

  useEffect(() => {
    if (!isSupabaseConfigured) return undefined;

    let mounted = true;

    async function loadLatestEntry() {
      const { data: sessionData } = await supabase.auth.getSession();

      if (!sessionData.session) {
        if (mounted) setLatestEntry(null);

        return;
      }

      const { data, error } = await supabase
        .from("daily_entries")
        .select("id, entry_date, mood, note, reply, updated_at")
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!mounted) return;

      setLatestEntry(error ? null : data);
    }

    function refreshLatestEntry() {
      loadLatestEntry();
    }

    loadLatestEntry();
    window.addEventListener(dailyEntryChangeEvent, refreshLatestEntry);

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setLatestEntry(null);

        return;
      }

      loadLatestEntry();
    });

    return () => {
      mounted = false;
      window.removeEventListener(dailyEntryChangeEvent, refreshLatestEntry);
      subscription.unsubscribe();
    };
  }, []);

  const apps = [
    {
      name: "Photos",
      icon: <FiImage />,
    },
    {
      name: "Our Story",
      icon: <FiBookOpen />,
    },
    {
      name: "Messages",
      icon: <FiMail />,
    },
    {
      name: "Music",
      icon: <FiMusic />,
    },
    {
      name: "Future",
      icon: <FiMap />,
    },
    {
      name: "Vault",
      icon: <FiLock />,
    },
    {
      name: "Daily Tracker",
      icon: <FiCalendar />,
    },
  ];

  const navItems = [
    {
      label: "Home",
      icon: <FiHome />,
      app: null,
    },
    {
      label: "Photos",
      icon: <FiImage />,
      app: "Photos",
    },
    {
      label: "Journal",
      icon: <FiBookOpen />,
      app: "Our Story",
    },
    {
      label: "Daily Tracker",
      icon: <FiFeather />,
      app: "Daily Tracker",
    },
    {
      label: "Letters",
      icon: <FiMail />,
      app: "Messages",
    },
    {
      label: "Future",
      icon: <FiMap />,
      app: "Future",
    },
    {
      label: "Music",
      icon: <FiMusic />,
      app: "Music",
    },
    {
      label: "Vault",
      icon: <FiLock />,
      app: "Vault",
    },
  ];

  return (
    <main className="desktop">
      <header className="top-bar">
        <div className="os-name">
          <span className="heart">♥</span>
          <span>OurSpace OS</span>
        </div>

        <div className="system-status">
          <span>Connected</span>
          <span>♥ 100%</span>
        </div>
      </header>

      <section className="desktop-content">
        <div className="mobile-home">
          <div className="welcome-message">
            <p>Welcome back.</p>
            <h1>OurSpace OS</h1>
            <span>A softer place for our everyday.</span>
          </div>

          <div className="app-grid">
            {apps.map((app) => (
              <button
                className="app-icon"
                key={app.name}
                onClick={() => setActiveApp(app.name)}
              >
                <div className="icon-box">{app.icon}</div>

                <span>{app.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="ourspace-shell">
          <aside className="ourspace-sidebar">
            <div className="sidebar-brand">
              <h1>OurSpace OS.</h1>
              <p>A softer place for our everyday.</p>
            </div>

            <nav className="sidebar-nav" aria-label="OurSpace apps">
              {navItems.map((item) => (
                <button
                  className={
                    activeApp === item.app ||
                    (!activeApp && item.label === "Home")
                      ? "sidebar-nav-item active"
                      : "sidebar-nav-item"
                  }
                  key={item.label}
                  onClick={() => setActiveApp(item.app)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          <section className="ourspace-workspace">
            <div className="workspace-grid">
              <button
                className="workspace-card workspace-entry"
                onClick={() => setActiveApp("Daily Tracker")}
              >
                <div className="card-flower">⌁</div>
                <div className="entry-date">Fri, Sep 25, 2026</div>
                <h2>How are you feeling today?</h2>

                <div className="entry-mood-scale">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((mood) => (
                    <span
                      className={mood === 8 ? "selected" : ""}
                      key={mood}
                    >
                      {mood}
                    </span>
                  ))}
                </div>

                <div className="entry-scale-labels">
                  <span>sad</span>
                  <span>ecstatic</span>
                </div>

                <div className="entry-note-box">
                  <strong>Notes</strong>
                  <p>What's on your mind today?</p>
                  <span>0/500</span>
                </div>

                <div className="entry-save">
                  <FiFeather />
                  Save Today
                </div>
              </button>

              <button
                className="workspace-card workspace-calendar"
                onClick={() => setActiveApp("Daily Tracker")}
              >
                <div className="workspace-card-header">
                  <h2>Calendar</h2>
                  <FiMoreHorizontal />
                </div>

                <div className="calendar-month-row">
                  <FiChevronLeft />
                  <strong>September 2026</strong>
                  <FiChevronRight />
                </div>

                <div className="mini-calendar">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <span className="weekday" key={day}>
                      {day}
                    </span>
                  ))}
                  {[30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 1, 2, 3].map((day, index) => (
                    <strong
                      className={[
                        index < 2 || index > 31 ? "muted" : "",
                        day === 25 && index === 26 ? "selected" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      key={`${day}-${index}`}
                    >
                      {day}
                    </strong>
                  ))}
                </div>
              </button>

              <button
                className="workspace-card workspace-summary"
                onClick={() => setActiveApp("Daily Tracker")}
              >
                <div className="workspace-card-header">
                  <span>Live Recap</span>
                  <FiFeather />
                </div>
                {latestEntry ? (
                  <>
                    <span className="recap-date">
                      {formatRecapDate(latestEntry.entry_date)}
                    </span>
                    <h2>
                      {latestEntry.mood}/10 · {getMoodWord(latestEntry.mood)}
                    </h2>

                    <div className="recap-copy">
                      <span>Hannah</span>
                      <p>{latestEntry.note || "No note yet."}</p>
                    </div>

                    <div className="recap-copy">
                      <span>Ian</span>
                      <p>{latestEntry.reply || "No reply yet."}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <h2>More to come</h2>
                    <p>
                      The newest saved note and reply will show up here.
                    </p>
                  </>
                )}
              </button>
            </div>
          </section>
        </div>
      </section>

      {activeApp && (
        <Window
          key={activeApp}
          title={activeApp}
          onClose={() => setActiveApp(null)}
        >
          {activeApp === "Photos" ? (
            <Photos />
          ) : activeApp === "Our Story" ? (
            <Story />
          ) : activeApp === "Messages" ? (
            <Messages />
          ) : activeApp === "Music" ? (
            <Music />
          ) : activeApp === "Future" ? (
            <Future />
          ) : activeApp === "Vault" ? (
            <Vault />
          ) : activeApp === "Daily Tracker" ? (
            <DailyTracker />
          ) : (
            <div className="app-placeholder">
              <h2>{activeApp}</h2>
              <p>Welcome to the {activeApp} app.</p>
            </div>
          )}
        </Window>
      )}

      <div className="dock">
        {apps.map((app) => (
          <button
            className="dock-icon"
            key={app.name}
            title={app.name}
            onClick={() => setActiveApp(app.name)}
          >
            {app.icon}
          </button>
        ))}
      </div>
    </main>
  );
}

export default Desktop;
