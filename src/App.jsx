
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import AddTransaction from "./pages/AddTransaction";
import Settings from "./pages/Settings";

import { TransactionsProvider } from "./context/TransactionsContext";
import {
  WalletProvider,
  WalletContext,
} from "./context/WalletContext";

function AppContent() {
  const { theme } = useContext(WalletContext);

  return (
    <div className={`app-layout ${theme}-theme`}>
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/add" element={<AddTransaction />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <TransactionsProvider>
        <WalletProvider>
          <AppContent />
        </WalletProvider>
      </TransactionsProvider>
    </BrowserRouter>
  );
}

export default App;
