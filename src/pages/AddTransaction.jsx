
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TransactionsContext } from "../context/TransactionsContext";

function AddTransaction() {
  const { dispatch } = useContext(TransactionsContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const numericAmount = Number(amount);
    const selectedDate = new Date(`${date}T00:00:00`);

    if (
      !title.trim() ||
      !amount.trim() ||
      !Number.isFinite(numericAmount) ||
      numericAmount <= 0 ||
      !["income", "expense"].includes(type) ||
      !date ||
      Number.isNaN(selectedDate.getTime())
    ) {
      alert("Please fill in all fields correctly.");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      title: title.trim(),
      amount: numericAmount,
      type,
      date,
    };

    dispatch({
      type: "ADD_TRANSACTION",
      payload: newTransaction,
    });

    setTitle("");
    setAmount("");
    setType("");
    setDate("");

    navigate("/");
  }

  return (
    <div className="add-transaction-page">
      <header className="add-transaction-header">
        <span className="section-label">NEW ENTRY</span>
        <h1>Add transaction</h1>
        <p>Record a new income or expense in your wallet.</p>
      </header>

      <section className="transaction-form-card">
        <form className="transaction-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Transaction title</label>
            <input
              id="title"
              type="text"
              placeholder="For example: Monthly salary"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              type="number"
              min="0"
              step="any"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Transaction type</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="" disabled>Choose a type</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <button className="primary-button full-button" type="submit">
            Add transaction
          </button>
        </form>
      </section>
    </div>
  );
}

export default AddTransaction;
