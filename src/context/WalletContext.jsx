
import { createContext, useState, useEffect } from "react";

export const WalletContext = createContext(null);

export function WalletProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem("currency") || "Toman";
  });

  const [budgetLimit, setBudgetLimit] = useState(() => {
    return Number(localStorage.getItem("budgetLimit")) || 0;
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem("budgetLimit", budgetLimit);
  }, [budgetLimit]);

  return (
    <WalletContext.Provider
      value={{
        theme,
        setTheme,
        currency,
        setCurrency,
        budgetLimit,
        setBudgetLimit,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}
