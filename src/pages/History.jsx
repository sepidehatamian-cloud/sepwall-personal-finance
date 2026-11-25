import { useContext, useMemo, useState } from "react";
import { TransactionsContext } from "../context/TransactionsContext";
import { WalletContext } from "../context/WalletContext";

function History() {
  const { transactions, dispatch } = useContext(TransactionsContext);
  const { currency } = useContext(WalletContext);

  const [filter, setFilter] = useState("all");

  const currencyLabel = currency === "Dollar" ? "$" : "Toman";

  function formatMoney(amount) {
    return `${Number(amount).toLocaleString()} ${currencyLabel}`;
  }

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    if (filter === "income") {
      return transactions.filter(
        (transaction) => transaction.type === "income"
      );
    }

    if (filter === "expense") {
      return transactions.filter(
        (transaction) => transaction.type === "expense"
      );
    }

    return transactions;
  }, [transactions, filter]);

  // Delete transaction
  function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!confirmed) return;

    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  }

  return (
    <div className="history-page">
      <header className="history-header">
        <div>
          <span className="section-label">ACTIVITY</span>
          <h1>Transaction history</h1>
          <p>Review and manage all your income and expenses.</p>
        </div>
      </header>

      <section className="history-panel">
        <div className="filter-bar">
          <button
            className={`filter-button ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All Transactions
          </button>

          <button
            className={`filter-button ${filter === "income" ? "active" : ""}`}
            onClick={() => setFilter("income")}
          >
            Income
          </button>

          <button
            className={`filter-button ${filter === "expense" ? "active" : ""}`}
            onClick={() => setFilter("expense")}
          >
            Expense
          </button>
        </div>

        {filteredTransactions.length === 0 ? (
          <div className="history-empty">
            <span className="empty-icon">↕</span>
            <h3>No transactions found</h3>
            <p>Your transactions will appear here.</p>
          </div>
        ) : (
          <div className="transaction-list">
            {filteredTransactions.map((transaction) => (
              <div className="transaction-item" key={transaction.id}>
                <div
                  className={`transaction-icon ${transaction.type}`}
                >
                  {transaction.type === "income" ? "↗" : "↘"}
                </div>

                <div className="transaction-info">
                  <h2>{transaction.title}</h2>
                  <p>{transaction.date}</p>
                </div>

                <div className="transaction-actions">
                  <span
                    className={
                      transaction.type === "income"
                        ? "transaction-amount income"
                        : "transaction-amount expense"
                    }
                  >
                    {transaction.type === "income" ? "+" : "-"}
                    {formatMoney(transaction.amount)}
                  </span>

                  <button
                    className="delete-button"
                    onClick={() => handleDelete(transaction.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default History;
