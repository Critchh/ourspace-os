import { useState } from "react";
import {
  FiLock,
  FiUnlock,
  FiHeart,
} from "react-icons/fi";

function Vault() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("locked");

  const ACCESS_CODE = "08/10/2024";

  function unlockVault() {
    if (code === ACCESS_CODE) {
      setStatus("verifying");

      setTimeout(() => {
        setStatus("unlocked");
      }, 1800);
    } else {
      setStatus("error");

      setTimeout(() => {
        setStatus("locked");
      }, 1400);
    }
  }

  if (status === "verifying") {
    return (
      <div className="vault-status">
        <div className="vault-loader"></div>

        <p>VERIFYING ACCESS KEY</p>
        <span>Decrypting something special...</span>
      </div>
    );
  }

  if (status !== "unlocked") {
    return (
      <div className="vault-lock-screen">
        <div className="vault-lock-icon">
          <FiLock />
        </div>

        <p className="app-kicker">PRIVATE FILE</p>

        <h2>Anniversary Vault</h2>

        <p className="vault-description">
          For your eyes only.
          <br />
          Enter the date that started our story. 
        </p>

        <input
          className={
            status === "error"
              ? "vault-input error"
              : "vault-input"
          }
          type="text"
          placeholder="MM/DD/YYYY"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              unlockVault();
            }
          }}
        />

        <button
          className="vault-unlock-button"
          onClick={unlockVault}
        >
          <FiUnlock />
          Unlock Vault
        </button>

        {status === "error" && (
          <p className="vault-error">
            Access denied. Think back to where it all began. 
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="final-message">
      <div className="final-message-header">
        <div className="final-unlock-icon">
          <FiUnlock />
        </div>

        <p className="vault-access">ACCESS GRANTED</p>

        <span>August 10, 2026</span>
      </div>

      <article className="final-letter">
        <FiHeart className="final-letter-heart" />

        <p className="app-kicker">FOR THE LOVE OF MY LIFE</p>

        <h2>Happy Anniversary, My Love.</h2>

        <div className="final-letter-text">
          <p>
            On this 10th day of August, in the year 2026,
          </p>

          <p>
            I write to the love of my life — the one who captures
            my heart, my soul, and everything in between.
          </p>

          <p>
            This website app is how I profess my love to you, at
            least when I cannot physically be there. Each and every
            line of code written here is a translation of how much
            I love you. Every second I spent putting this website
            together was fulfilling to me because it is about us
            and our love.
          </p>

          <p>
            There were so many moments while making this that made
            me both sad and happy. Sad because I cannot spend our
            day together with you, but happy because reminiscing
            about us and everything we've experienced together has
            made my heart warm.
          </p>

          <p>
            I love you — from the moments we slay monsters in MHW,
            to the moments we drink coffee at the most random
            places, to our thrift shop escapades down in Maricielo,
            our grocery shopping, our mini dates going to the mall
            or eating somewhere close, and our AHS binge-watching
            moments.
          </p>

          <p>
            This is the definition of love for me: to love someone
            no matter how far apart we are, and no matter what kind
            of activities we're doing. As long as I do it with you,
            as long as I am with you — that is love for me.
          </p>

          <p>
            You are the most precious thing I have on this Earth,
            and I plan to keep it that way until the day I pass.
          </p>

          <p>
            I thank you for your loving heart and your warmth. I
            want to thank you for being you, for existing, and for
            allowing me into your life. Thank you for staying here
            with me despite the rocky roads and all the twists and
            turns along the path of our relationship.
          </p>

          <p>
            Our future is close, my love. The life that we dream of
            is getting closer. I know that, especially at the
            beginning, it isn't always going to be glamorous. But
            it is through our dedication to one another that we can
            survive this time spent apart.
          </p>

          <p>
            A most wonderful day to us — two people who were so far
            apart, yet somehow found a way to find each other.
          </p>

          <p>
            If this isn't proof that the Red String Theory is real,
            then I don't know what is.
          </p>

          <p>
            There is absolutely no one and nothing else I wish for
            more in this life than to be with you. To be with the
            person who was here with me when I had nothing. To
            build everything we have, and everything we will have,
            together as a family.
          </p>

          <p>
            This is the love that I wish for, and this is the love
            I will keep fighting for.
          </p>

          <div className="final-toast">
            <p>To us.</p>
            <p>To Hannah and Ian.</p>
            <p>To Dear Maria and Critch.</p>
          </div>

          <p className="final-anniversary">
            A Happy Anniversary to us, my love. 
          </p>
        </div>

        <div className="final-signature">
          <span>Forever yours,</span>
          <strong>Ian</strong>
        </div>
      </article>
    </div>
  );
}

export default Vault;