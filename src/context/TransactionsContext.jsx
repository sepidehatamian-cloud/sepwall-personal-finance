
import { createContext, useReducer, useEffect } from "react";

export const TransactionsContext = createContext(null);

// Manage transactions
function transactionReducer(state, action) {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return [...state, action.payload];

    case "DELETE_TRANSACTION":
      return state.filter(
        (transaction) => transaction.id !== action.payload
      );

    default:
      return state;
  }
}

// Load saved transactions
function getInitialTransactions() {
  try {
    const savedTransactions = localStorage.getItem("transactions");

    return savedTransactions
      ? JSON.parse(savedTransactions)
      : [];
  } catch {
    return [];
  }
}

// Context Provider
export function TransactionsProvider({ children }) {
  const [transactions, dispatch] = useReducer(
    transactionReducer,
    [],
    getInitialTransactions
  );

  // Save transactions in localStorage
  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  return (
    <TransactionsContext.Provider
      value={{ transactions, dispatch }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
