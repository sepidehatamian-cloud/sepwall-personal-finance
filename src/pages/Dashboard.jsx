
import { Link } from "react-router-dom";
import { useContext, useMemo } from "react";
import { TransactionsContext } from "../context/TransactionsContext";
import { WalletContext } from "../context/WalletContext";

function Dashboard() {
  const { transactions } = useContext(TransactionsContext);

  const { currency, budgetLimit } = useContext(WalletContext);

  const currencyLabel = currency === "Dollar" ? "$" : "Toman";

  function formatMoney(amount) {
    return `${Number(amount || 0).toLocaleString()} ${currencyLabel}`;
  }

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Calculate wallet statistics
  const statistics = useMemo(() => {
    const totalIncome = transactions
      .filter((transaction) => transaction.type === "income")
      .reduce((total, transaction) => total + Number(transaction.amount), 0);

    const totalExpenses = transactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((total, transaction) => total + Number(transaction.amount), 0);

    const monthlyTransactions = transactions.filter((transaction) => {
      const transactionDate = new Date(
        transaction.date + "T00:00:00"
      );

      return (
        transactionDate.getMonth() === currentMonth &&
        transactionDate.getFullYear() === currentYear
      );
    });

    const monthlyIncome = monthlyTransactions
      .filter((transaction) => transaction.type === "income")
      .reduce((total, transaction) => total + Number(transaction.amount), 0);

    const monthlyExpenses = monthlyTransactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((total, transaction) => total + Number(transaction.amount), 0);

    return {
      balance: totalIncome - totalExpenses,
      monthlyIncome,
      monthlyExpenses,
      totalTransactions: transactions.length,
      monthlyCount: monthlyTransactions.length,
    };
  }, [transactions, currentMonth, currentYear]);

  // Calculate budget progress
  const budgetPercentage =
    Number(budgetLimit) > 0
      ? (statistics.monthlyExpenses / Number(budgetLimit)) * 100
      : 0;

  const remainingBudget = Number(budgetLimit) - statistics.monthlyExpenses;

  const isOverBudget =
    Number(budgetLimit) > 0 && statistics.monthlyExpenses > Number(budgetLimit);

  // Get recent transactions
  const recentTransactions = useMemo(() => {
    return [...transactions]
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 4);
  }, [transactions]);

  return (
    <div className="dashboard">

      {/* Header */}
      <header className="dashboard-header">
        <div>
          <span className="section-label">OVERVIEW</span>
          <h1>Welcome back</h1>
          <p>Here is a summary of your wallet this month.</p>
        </div>

        <Link to="/add" className="add-button">
          + Add transaction
        </Link>
      </header>

      {/* Summary Cards */}
      <section className="summary-cards">

        <div className="summary-card">
          <span className="card-icon purple">◇</span>
          <p>Current balance</p>
          <h2>{formatMoney(statistics.balance)}</h2>
          <small>Income minus expenses</small>
        </div>

        <div className="summary-card">
          <span className="card-icon green">↗</span>
          <p>Monthly income</p>
          <h2 className="income">
            {formatMoney(statistics.monthlyIncome)}
          </h2>
          <small>Current month</small>
        </div>

        <div className="summary-card">
          <span className="card-icon red">↘</span>
          <p>Monthly expenses</p>
          <h2 className="expense">
            {formatMoney(statistics.monthlyExpenses)}
          </h2>
          <small>Current month</small>
        </div>

        <div className="summary-card">
          <span className="card-icon blue">≡</span>
          <p>Total transactions</p>
          <h2>{statistics.totalTransactions}</h2>
          <small>{statistics.monthlyCount} this month</small>
        </div>

      </section>

      {/* Bottom Sections */}
      <section className="dashboard-bottom">

        {/* Recent Transactions */}
        <div className="dashboard-panel transactions-panel">
          <div className="panel-header">
            <div>
              <h3>Recent transactions</h3>
              <p>Your latest wallet activity</p>
            </div>

            <Link to="/history">View all</Link>
          </div>

          {recentTransactions.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">↕</span>
              <h4>No transactions yet</h4>
              <p>Add your first income or expense to see it here.</p>

              <Link to="/add" className="secondary-button">
                Add transaction
              </Link>
            </div>
          ) : (
            <div className="dashboard-transaction-list">
              {recentTransactions.map((transaction) => (
                <div
                  className="dashboard-transaction-item"
                  key={transaction.id}
                >
                  <span
                    className={
                      transaction.type === "income"
                        ? "transaction-icon income-icon"
                        : "transaction-icon expense-icon"
                    }
                  >
                    {transaction.type === "income" ? "↗" : "↘"}
                  </span>

                  <div className="transaction-info">
                    <h3>{transaction.title}</h3>
                    <p>{transaction.date}</p>
                  </div>

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
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Monthly Budget */}
        <div className="dashboard-panel budget-panel">
          <div className="panel-header">
            <div>
              <h3>Monthly budget</h3>
              <p>Track your spending limit</p>
            </div>

            <Link to="/settings">Edit</Link>
          </div>

          {Number(budgetLimit) > 0 ? (
            <div className="budget-content">
              <p>Monthly spending limit</p>

              <h2>{formatMoney(budgetLimit)}</h2>

              <div
                style={{
                  width: "100%",
                  height: "10px",
                  backgroundColor: "#e5e7eb",
                  borderRadius: "10px",
                  overflow: "hidden",
                  margin: "18px 0",
                }}
              >
                <div
                  style={{
                    width: `${Math.min(budgetPercentage, 100)}%`,
                    height: "100%",
                    backgroundColor: isOverBudget ? "#ef4444" : "#7057ff",
                    borderRadius: "10px",
                    transition: "width 0.3s ease",
                  }}
                />
              </div>

              <p>
                Spent: <strong>{formatMoney(statistics.monthlyExpenses)}</strong>
              </p>

              {isOverBudget ? (
                <p style={{ color: "#ef4444", marginTop: "10px" }}>
                  ⚠ You have exceeded your monthly budget by{" "}
                  {formatMoney(Math.abs(remainingBudget))}.
                </p>
              ) : (
                <p style={{ marginTop: "10px" }}>
                  Remaining: <strong>{formatMoney(remainingBudget)}</strong>
                </p>
              )}

              <p style={{ marginTop: "8px" }}>
                {budgetPercentage.toFixed(1)}% of budget used
              </p>
            </div>
          ) : (
            <div className="empty-state">
              <span className="empty-icon">◎</span>
              <h4>No budget set</h4>
              <p>Set a monthly limit to keep spending on track.</p>

              <Link to="/settings" className="secondary-button">
                Set budget
              </Link>
            </div>
          )}
        </div>

      </section>

    </div>
  );
}

export default Dashboard;
