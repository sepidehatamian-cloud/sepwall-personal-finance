
import { useContext, useState } from "react";
import { WalletContext } from "../context/WalletContext";

function Settings() {
  const {
    theme,
    setTheme,
    currency,
    setCurrency,
    budgetLimit,
    setBudgetLimit,
  } = useContext(WalletContext);

  const [budgetInput, setBudgetInput] = useState(String(budgetLimit));

  function handleSaveBudget() {
    const amount = Number(budgetInput);

    if (budgetInput.trim() === "" || !Number.isFinite(amount) || amount < 0) {
      alert("Please enter a valid budget amount.");
      return;
    }

    setBudgetLimit(amount);
    alert("Budget saved successfully!");
  }

  return (
    <div className="settings-page">
      <header className="settings-header">
        <span className="section-label">PREFERENCES</span>
        <h1>Settings</h1>
        <p>Personalize how your Smart Wallet works.</p>
      </header>

      <section className="settings-list">

        {/* Appearance */}
        <article className="setting-card">
          <div className="setting-info">
            <h2>Appearance</h2>
            <p>Choose the theme that is most comfortable for you.</p>
          </div>

          <div className="segmented-control">
            <button
              className={theme === "light" ? "active" : ""}
              type="button"
              onClick={() => setTheme("light")}
            >
              ☀ Light
            </button>

            <button
              className={theme === "dark" ? "active" : ""}
              type="button"
              onClick={() => setTheme("dark")}
            >
              ◐ Dark
            </button>
          </div>
        </article>

        {/* Currency */}
        <article className="setting-card">
          <div className="setting-info">
            <h2>Currency</h2>
            <p>Select the currency label used throughout the application.</p>
          </div>

          <div className="segmented-control">
            <button
              className={currency === "Toman" ? "active" : ""}
              type="button"
              onClick={() => setCurrency("Toman")}
            >
              Toman
            </button>

            <button
              className={currency === "Dollar" ? "active" : ""}
              type="button"
              onClick={() => setCurrency("Dollar")}
            >
              Dollar ($)
            </button>
          </div>
        </article>

        {/* Monthly Budget */}
        <article className="setting-card">
          <div className="setting-info">
            <h2>Monthly budget limit</h2>
            <p>Enter 0 if you do not want to use a spending limit.</p>
          </div>

          <div className="budget-form">
            <input
              type="number"
              name="budgetLimit"
              min="0"
              step="any"
              placeholder="0"
              value={budgetInput}
              onChange={(event) => setBudgetInput(event.target.value)}
            />

            <button
              className="primary-button"
              type="button"
              onClick={handleSaveBudget}
            >
              Save budget
            </button>
          </div>
        </article>

      </section>
    </div>
  );
}

export default Settings;
