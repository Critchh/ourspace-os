import { useState } from "react";

import {
  FiImage,
  FiHeart,
  FiMail,
  FiMusic,
  FiMap,
  FiLock,
} from "react-icons/fi";

import Window from "./Window";
import Photos from "../apps/Photos";
import Story from "../apps/Story";
import Messages from "../apps/Messages";
import Vault from "../apps/Vault";
import Future from "../apps/Future";
import Music from "../apps/Music";

function Desktop() {
  const [activeApp, setActiveApp] = useState(null);

  const apps = [
    {
      name: "Photos",
      icon: <FiImage />,
    },
    {
      name: "Our Story",
      icon: <FiHeart />,
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
        <div className="welcome-message">
          <p>Welcome back.</p>
          <h1>Happy Anniversary </h1>
          <span>Everything here was made for you.</span>
        </div>

        <div className="app-grid">
          {apps.map((app) => (
            <button
              className="app-icon"
              key={app.name}
              onClick={() => setActiveApp(app.name)}
            >
              <div className="icon-box">
                {app.icon}
              </div>

              <span>{app.name}</span>
            </button>
          ))}
        </div>
      </section>

{activeApp && (
  <Window
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