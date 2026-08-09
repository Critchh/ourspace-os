import { useState } from "react";
import { FiHeart, FiArrowLeft } from "react-icons/fi";

function Messages() {
  const [selectedMessage, setSelectedMessage] = useState(null);

const messages = [
  {
    id: 1,
    title: "For When I'm Busy at Work",
    preview: "For the moments when I can't reply right away.",
    content: `My love,

I'm here for you. Forgive me if I can't reply or respond to you at the moment.

Leave me a long message about how you're feeling today, or tell me if there's something bothering you. I promise I will read it and respond to you on my break or after work.

Even when I'm busy and can't be there at that exact moment, I am still here for you, baby.

I love you so much. `,
  },

  {
    id: 2,
    title: "For When You Feel Underappreciated",
    preview: "For when you need to be reminded how much you mean to me.",
    content: `My darling,

You are the best thing that has ever happened to me.

I know things aren't always butterflies and sunshine for us, but you are still the most wonderful thing in my life. It is you who keeps me going, and I always keep you and our memories closest to my heart.

I appreciate how hard you work, too — for Hera and Hestia, and for us.

I appreciate your love, your patience, your kindness, and everything you do for me, even the things I might sometimes forget to acknowledge.

I appreciate you more than I probably manage to say. `,
  },

  {
    id: 3,
    title: "For When You Miss Me",
    preview: "For when the distance feels a little heavier.",
    content: `My baby,

I miss you too. Every moment that we're not together.

Sometimes I remember you during the most random moments, and it brings me to tears because of how much I miss you.

But just remember that this isn't permanent, my love.

The time will come when we wake up next to each other again. We'll eat together, watch the most random series we can find, and play games side by side — without lagging because we'll finally be on the same server already lol.

We'll get those ordinary days together that we've been waiting for.

It will come, sooner rather than later. `,
  },

  {
    id: 4,
    title: "For When We Fight",
    preview: "For the moments when loving each other feels a little harder.",
    content: `My love,

I'm sorry for the times I let my emotions get in the way of what you need, or what we need.

I'm sorry for the times I resort to being defensive before taking the time to understand what you really meant.

I'm sorry that I can't always be at my best for you, but know that I am working on it.

I want to be your light. I want to be the softness that you yearn for and the shoulder you can lean on — without judgment and without fights.

Even when we disagree, even when things become difficult, I never want you to question how deeply I love you.

I love you forever, my baby. `,
  },
];

  if (selectedMessage) {
    return (
      <div className="letter-view">
        <button
          className="letter-back"
          onClick={() => setSelectedMessage(null)}
        >
          <FiArrowLeft />
          Back to Messages
        </button>

        <div className="letter-paper">
          <FiHeart className="letter-heart" />

          <p className="app-kicker">FOR YOU</p>

          <h2>{selectedMessage.title}</h2>

          <div className="letter-text">
            {selectedMessage.content}
          </div>

          <div className="letter-signature">
            With love, Ian
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="messages-app">
      <div className="messages-header">
<p className="app-kicker">OPEN WHEN...</p>
<h2>Messages for You</h2>
<p>
  For the moments when I can't be right there beside you.
</p>
      </div>

      <div className="message-grid">
        {messages.map((message) => (
          <button
            className="message-card"
            key={message.id}
            onClick={() => setSelectedMessage(message)}
          >
            <div className="message-icon">
              <FiHeart />
            </div>

            <div>
              <h3>{message.title}</h3>
              <p>{message.preview}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Messages;