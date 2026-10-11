
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

function Home() {
  return (
    <main className="hero">
      <p className="eyebrow">YOUR PERSONAL CYBER SAFETY ASSISTANT</p>
      <h1>Stay Safe in the<br />Digital World.</h1>
      <p className="subtitle">
        Tell us your cyber problem. Get practical steps
        to protect yourself and your accounts.
      </p>
      <Link to="/assistant" className="primary-btn">
        Chat with CyberSafe →
      </Link>
    </main>
  );
}

function getSolution(message) {
  const text = message.toLowerCase();

  if (
    text.includes("money") ||
    text.includes("paise") ||
    text.includes("payment") ||
    text.includes("upi") ||
    text.includes("bank fraud") ||
    text.includes("transaction")
  ) {
    return {
      title: "Possible Financial Fraud",
      steps: [
        "Contact your bank using its official app or phone number and report the transaction.",
        "In India, call 1930 promptly to report financial cyber fraud. You can also file a complaint at cybercrime.gov.in.",
        "If your UPI or banking access may be compromised, ask your bank to secure or block the affected service.",
        "Save transaction IDs, messages and screenshots as evidence."
      ],
      note: "Never share your OTP, UPI PIN or banking password with anyone."
    };
  }

  
if (
  text.includes("hack") ||
  text.includes("hacked") ||
  text.includes("instagram") ||
  text.includes("facebook") ||
  text.includes("account stolen") ||
  text.includes("disabled") ||
  text.includes("suspended") ||
  text.includes("locked")
) {
  return {
    title: "Let's Fix Your Account",
    steps: [
      "First, share your Instagram profile URL or username. Never share your password or OTP.",
      "Tell me the exact error message Instagram shows when you try to log in.",
      "Tell me whether you can log in and whether an appeal option is available.",
      "Based on your answers, I'll guide you through the appropriate official recovery steps."
    ],
    note: "Official help: https://help.instagram.com/ | Hacked account: https://www.instagram.com/hacked/"
  };
}


  if (
    text.includes("otp") ||
    text.includes("password") ||
    text.includes("pin share") ||
    text.includes("shared my")
  ) {
    return {
      title: "Protect Your Credentials",
      steps: [
        "If you shared a banking OTP, PIN or password, contact your bank immediately through an official channel.",
        "Change any exposed password from the official website or app.",
        "Secure your account and review recent transactions or login activity.",
        "If money was lost, report it promptly through the appropriate official fraud-reporting channel."
      ],
      note: "Never share OTPs, passwords or UPI PINs, even with someone claiming to be support staff."
    };
  }

  if (
    text.includes("message") ||
    text.includes("link") ||
    text.includes("sms") ||
    text.includes("whatsapp") ||
    text.includes("scam") ||
    text.includes("phishing")
  ) {
    return {
      title: "Suspicious Message or Link",
      steps: [
        "Do not click the link or download any attachment.",
        "Do not reply with personal details, OTPs or passwords.",
        "Verify the sender using a separate, trusted official channel.",
        "If you already clicked the link, do not enter any more details. If you entered a password, change it through the official website and secure the account."
      ],
      note: "A professional-looking message or website can still be fraudulent."
    };
  }

  if (
    text.includes("job") ||
    text.includes("salary") ||
    text.includes("recruitment") ||
    text.includes("work from home")
  ) {
    return {
      title: "Possible Job Scam",
      steps: [
        "Verify the employer and job opening through its official website.",
        "Be cautious if someone demands a registration fee or payment to guarantee a job.",
        "Do not share banking credentials, OTPs or unnecessary identity documents.",
        "Keep screenshots and payment records if you suspect fraud."
      ],
      note: "A job offer should be verified independently before you pay or share sensitive information."
    };
  }

  return {
    title: "Let's Understand Your Problem",
    steps: [
      "Tell me which app, account or device is involved.",
      "Explain what happened and what you did just before the problem started.",
      "Mention whether you clicked a link, shared any details or lost money, if applicable."
    ],
    note: "Do not include your real password, OTP, PIN, full card number or other sensitive information."
  };
}

function Assistant() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    {
      sender: "bot",
      text: "Hi! I'm CyberSafe Assistant. Tell me what happened, and I'll help you with practical next steps."
    }
  ]);

  function sendMessage(value = message) {
    const question = value.trim();
    if (!question) return;

    const solution = getSolution(question);

    setChat(previous => [
      ...previous,
      { sender: "user", text: question },
      {
        sender: "bot",
        title: solution.title,
        steps: solution.steps,
        note: solution.note
      }
    ]);

    setMessage("");
  }

  return (
    <main className="assistant-page">
      <Link to="/" className="back-link">← Back to Home</Link>

      <div className="assistant-heading">
        <div className="assistant-icon">◈</div>
        <div>
          <p className="eyebrow">CYBER SAFETY SUPPORT</p>
          <h1>CyberSafe Assistant</h1>
          <p className="subtitle">
            Describe your problem to get relevant guidance.
          </p>
        </div>
      </div>

      <section className="chat-card">
        <div className="chat-top">
          <span className="status-dot"></span>
          CyberSafe Support
          <span className="basic-label">Basic assistant</span>
        </div>

        <div className="chat-messages" aria-live="polite">
          {chat.map((item, index) => (
            <div
              key={index}
              className={`chat-row ${item.sender === "user" ? "user-row" : ""}`}
            >
              {item.sender === "bot" && (
                <div className="bot-avatar">◈</div>
              )}

              <div className={`chat-bubble ${item.sender}`}>
                {item.text && <p>{item.text}</p>}

                {item.title && <h3>{item.title}</h3>}

                {item.steps && (
                  <ol>
                    {item.steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                )}

                {item.note && <p className="safety-note">{item.note}</p>}
              </div>
            </div>
          ))}
        </div>

        <div className="quick-prompts">
          <p>Try asking:</p>
          {[
            "Money deducted from my account",
            "My Instagram got hacked",
            "I received a suspicious link"
          ].map(prompt => (
            <button
              type="button"
              key={prompt}
              className="quick-prompt"
              onClick={() => sendMessage(prompt)}
            >
              {prompt}
            </button>
          ))}
        </div>

        <form
          className="chat-input-area"
          onSubmit={event => {
            event.preventDefault();
            sendMessage();
          }}
        >
          <input
            value={message}
            onChange={event => setMessage(event.target.value)}
            placeholder="Describe your cyber problem..."
            aria-label="Describe your cyber problem"
          />
          <button type="submit" className="send-btn" aria-label="Send message">
            ↑
          </button>
        </form>

        <p className="chat-disclaimer">
          Basic keyword-based guidance, not a live AI service.
          For immediate danger or financial loss, contact the relevant
          official service. Never enter passwords or OTPs here.
        </p>
      </section>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/" className="brand">◈ CyberSafe</Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/assistant">Chat Assistant</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assistant" element={<Assistant />} />
        <Route path="/scam-checker" element={<Assistant />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
