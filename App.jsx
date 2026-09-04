import { useEffect, useMemo, useState } from "react";

const API = "http://127.0.0.1:8000";

const styles = `
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: #f4f7fb;
  color: #172033;
}

button {
  font-family: inherit;
}

.app {
  min-height: 100vh;
  padding: 30px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
  gap: 20px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  width: 50px;
  height: 50px;
  border-radius: 14px;
  background: #172033;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 23px;
  font-weight: 800;
}

.header h1 {
  margin: 0;
  font-size: 30px;
}

.header p {
  margin: 5px 0 0;
  color: #718096;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.agent-status {
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  border: 1px solid #e5eaf1;
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
}

.online-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #22c55e;
}

.run-button {
  border: 0;
  background: #172033;
  color: white;
  padding: 13px 20px;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
}

.run-button:hover {
  opacity: 0.9;
}

.run-button:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  margin-bottom: 22px;
}

.card {
  background: white;
  border: 1px solid #e5eaf1;
  border-radius: 14px;
  padding: 21px;
  box-shadow: 0 3px 14px rgba(20, 30, 50, 0.04);
}

.card-label {
  color: #718096;
  font-size: 13px;
  margin-bottom: 10px;
}

.card-value {
  font-size: 27px;
  font-weight: 800;
  margin-bottom: 7px;
}

.card-note {
  color: #9aa4b2;
  font-size: 12px;
}

.card.highlight {
  border-color: #b7e4c7;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 22px;
  margin-bottom: 22px;
}

.panel {
  background: white;
  border: 1px solid #e5eaf1;
  border-radius: 14px;
  padding: 22px;
  box-shadow: 0 3px 14px rgba(20, 30, 50, 0.04);
}

.panel-title {
  margin: 0;
  font-size: 19px;
}

.panel-subtitle {
  margin: 6px 0 20px;
  color: #718096;
  font-size: 13px;
}

.analytics-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.analytics-box {
  border: 1px solid #edf0f4;
  border-radius: 12px;
  padding: 17px;
}

.analytics-box span {
  display: block;
  color: #718096;
  font-size: 12px;
  margin-bottom: 8px;
}

.analytics-box strong {
  font-size: 21px;
}

.progress {
  height: 9px;
  background: #edf1f5;
  border-radius: 20px;
  margin-top: 13px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  border-radius: 20px;
  background: #172033;
}

.progress-recovered {
  height: 100%;
  border-radius: 20px;
  background: #22c55e;
}

.risk-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.risk-item {
  display: grid;
  grid-template-columns: 80px 1fr 40px;
  align-items: center;
  gap: 10px;
  font-size: 13px;
}

.risk-label {
  font-weight: 700;
}

.risk-bar {
  height: 9px;
  background: #edf1f5;
  border-radius: 20px;
  overflow: hidden;
}

.risk-fill {
  height: 100%;
  border-radius: 20px;
}

.high-fill {
  background: #ef4444;
}

.medium-fill {
  background: #f59e0b;
}

.low-fill {
  background: #22c55e;
}

.ai-panel {
  margin-bottom: 22px;
}

.ai-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.ai-badge {
  background: #eef2ff;
  color: #3730a3;
  padding: 8px 13px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
}

.ai-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.ai-step {
  border: 1px solid #edf0f4;
  border-radius: 12px;
  padding: 17px;
}

.ai-step-number {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #172033;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 12px;
}

.ai-step h3 {
  margin: 0 0 7px;
  font-size: 15px;
}

.ai-step p {
  margin: 0;
  color: #718096;
  font-size: 12px;
  line-height: 1.5;
}

.results,
.table-section {
  background: white;
  border: 1px solid #e5eaf1;
  border-radius: 14px;
  padding: 22px;
  margin-bottom: 22px;
  box-shadow: 0 3px 14px rgba(20, 30, 50, 0.04);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.section-header h2 {
  margin: 0;
  font-size: 19px;
}

.section-header p {
  margin: 6px 0 0;
  color: #718096;
  font-size: 13px;
}

.recovery-rate {
  background: #dcfce7;
  color: #166534;
  padding: 8px 13px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 13px;
}

.filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 18px;
}

.filter {
  border: 1px solid #dfe5ec;
  background: white;
  color: #64748b;
  padding: 8px 13px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
}

.filter.active {
  background: #172033;
  color: white;
  border-color: #172033;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
}

th,
td {
  text-align: left;
  padding: 14px;
  border-bottom: 1px solid #edf0f4;
}

th {
  background: #f8fafc;
  color: #64748b;
  font-size: 12px;
}

td {
  font-size: 13px;
}

.status,
.risk,
.result {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
}

.status.success,
.success-result,
.risk.low {
  background: #dcfce7;
  color: #166534;
}

.status.failed,
.risk.high {
  background: #fee2e2;
  color: #991b1b;
}

.risk.medium,
.pending-result {
  background: #fef3c7;
  color: #92400e;
}

.notification {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 15px;
  border-radius: 10px;
  background: #f8fafc;
  border: 1px solid #edf0f4;
  margin-bottom: 10px;
  font-size: 13px;
}

.notification:last-child {
  margin-bottom: 0;
}

.notification-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #22c55e;
  flex-shrink: 0;
}

.notification.warning .notification-dot {
  background: #f59e0b;
}

.empty {
  text-align: center;
  padding: 25px;
  color: #718096;
  font-size: 13px;
}

.footer {
  text-align: center;
  color: #9aa4b2;
  font-size: 12px;
  padding: 8px;
}

@media (max-width: 1050px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 700px) {
  .app {
    padding: 16px;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-right {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }

  .agent-status,
  .run-button {
    justify-content: center;
    text-align: center;
  }

  .cards,
  .analytics-row,
  .ai-grid {
    grid-template-columns: 1fr;
  }

  .section-header,
  .ai-header {
    align-items: flex-start;
    flex-direction: column;
  }
}
`;

function App() {
  const [transactions, setTransactions] = useState([]);
  const [atRisk, setAtRisk] = useState([]);
  const [recovery, setRecovery] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    fetch(API + "/transactions")
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.error(error));

    fetch(API + "/at-risk")
      .then((response) => response.json())
      .then((data) => setAtRisk(data))
      .catch((error) => console.error(error));
  }, []);

  const revenueAtRisk = atRisk.reduce(
    (total, transaction) => total + Number(transaction.amount),
    0
  );

  const revenueRecovered = recovery
    ? Number(recovery.revenue_recovered)
    : 0;

  const unrecoveredRevenue = revenueAtRisk - revenueRecovered;

  const recoveryRate =
    revenueAtRisk > 0
      ? ((revenueRecovered / revenueAtRisk) * 100).toFixed(1)
      : "0.0";

  const recoveredCount = recovery
    ? recovery.results.filter(
        (item) => item.result === "SUCCESS"
      ).length
    : 0;

  const riskCounts = useMemo(() => {
    const results = recovery ? recovery.results : [];

    return {
      HIGH: results.filter((item) => item.risk === "HIGH").length,
      MEDIUM: results.filter((item) => item.risk === "MEDIUM").length,
      LOW: results.filter((item) => item.risk === "LOW").length,
    };
  }, [recovery]);

  const filteredResults = useMemo(() => {
    if (!recovery) return [];

    if (filter === "ALL") {
      return recovery.results;
    }

    if (filter === "SUCCESS") {
      return recovery.results.filter(
        (item) => item.result === "SUCCESS"
      );
    }

    if (filter === "FAILED") {
      return recovery.results.filter(
        (item) => item.result !== "SUCCESS"
      );
    }

    return recovery.results.filter(
      (item) => item.risk === filter
    );
  }, [recovery, filter]);

  const runAgent = async () => {
    setLoading(true);

    try {
      const response = await fetch(API + "/run-agent", {
        method: "POST",
      });

      const data = await response.json();
      setRecovery(data);
      setFilter("ALL");
    } catch (error) {
      console.error(error);
      alert("Could not connect to RecoverAI backend");
    }

    setLoading(false);
  };

  const formatAction = (action) => {
    if (!action) return "";

    return action
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  const riskPercentage = (value) => {
    const total = recovery
      ? recovery.transactions_processed
      : 0;

    return total > 0 ? `${(value / total) * 100}%` : "0%";
  };

  return (
    <>
      <style>{styles}</style>

      <div className="app">
        <header className="header">
          <div className="brand">
            <div className="logo">R</div>

            <div>
              <h1>RecoverAI</h1>
              <p>Revenue Recovery Agent</p>
            </div>
          </div>

          <div className="header-right">
            <div className="agent-status">
              <span className="online-dot"></span>
              Agent Online
            </div>

            <button
              className="run-button"
              onClick={runAgent}
              disabled={loading}
            >
              {loading
                ? "Analyzing Transactions..."
                : "Run Recovery Agent"}
            </button>
          </div>
        </header>

        <section className="cards">
          <div className="card">
            <div className="card-label">Total Transactions</div>
            <div className="card-value">{transactions.length}</div>
            <div className="card-note">All transactions</div>
          </div>

          <div className="card">
            <div className="card-label">At Risk</div>
            <div className="card-value">{atRisk.length}</div>
            <div className="card-note">Require attention</div>
          </div>

          <div className="card">
            <div className="card-label">Revenue at Risk</div>
            <div className="card-value">
              ₹{revenueAtRisk.toLocaleString()}
            </div>
            <div className="card-note">Potential revenue</div>
          </div>

          <div className="card highlight">
            <div className="card-label">Revenue Recovered</div>
            <div className="card-value">
              ₹{revenueRecovered.toLocaleString()}
            </div>
            <div className="card-note">
              {recoveryRate}% recovery rate
            </div>
          </div>
        </section>

        {recovery && (
          <>
            <section className="dashboard-grid">
              <div className="panel">
                <h2 className="panel-title">
                  Recovery Analytics
                </h2>

                <p className="panel-subtitle">
                  AI-powered revenue recovery performance
                </p>

                <div className="analytics-row">
                  <div className="analytics-box">
                    <span>Revenue at Risk</span>
                    <strong>
                      ₹{revenueAtRisk.toLocaleString()}
                    </strong>

                    <div className="progress">
                      <div
                        className="progress-bar"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  </div>

                  <div className="analytics-box">
                    <span>Revenue Recovered</span>
                    <strong>
                      ₹{revenueRecovered.toLocaleString()}
                    </strong>

                    <div className="progress">
                      <div
                        className="progress-recovered"
                        style={{
                          width: `${recoveryRate}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="analytics-box">
                    <span>Unrecovered Revenue</span>
                    <strong>
                      ₹{unrecoveredRevenue.toLocaleString()}
                    </strong>
                  </div>

                  <div className="analytics-box">
                    <span>Successful Recoveries</span>
                    <strong>{recoveredCount}</strong>
                  </div>
                </div>
              </div>

              <div className="panel">
                <h2 className="panel-title">
                  Risk Distribution
                </h2>

                <p className="panel-subtitle">
                  Transactions classified by AI risk
                </p>

                <div className="risk-list">
                  <div className="risk-item">
                    <div className="risk-label">HIGH</div>

                    <div className="risk-bar">
                      <div
                        className="risk-fill high-fill"
                        style={{
                          width: riskPercentage(
                            riskCounts.HIGH
                          ),
                        }}
                      ></div>
                    </div>

                    <strong>{riskCounts.HIGH}</strong>
                  </div>

                  <div className="risk-item">
                    <div className="risk-label">MEDIUM</div>

                    <div className="risk-bar">
                      <div
                        className="risk-fill medium-fill"
                        style={{
                          width: riskPercentage(
                            riskCounts.MEDIUM
                          ),
                        }}
                      ></div>
                    </div>

                    <strong>{riskCounts.MEDIUM}</strong>
                  </div>

                  <div className="risk-item">
                    <div className="risk-label">LOW</div>

                    <div className="risk-bar">
                      <div
                        className="risk-fill low-fill"
                        style={{
                          width: riskPercentage(
                            riskCounts.LOW
                          ),
                        }}
                      ></div>
                    </div>

                    <strong>{riskCounts.LOW}</strong>
                  </div>
                </div>
              </div>
            </section>

            <section className="panel ai-panel">
              <div className="ai-header">
                <div>
                  <h2 className="panel-title">
                    How RecoverAI Decides
                  </h2>

                  <p className="panel-subtitle">
                    Automated transaction analysis and recovery workflow
                  </p>
                </div>

                <div className="ai-badge">
                  AI AGENT ACTIVE
                </div>
              </div>

              <div className="ai-grid">
                <div className="ai-step">
                  <div className="ai-step-number">1</div>
                  <h3>Analyze Transaction</h3>
                  <p>
                    RecoverAI checks payment status, retry count,
                    overdue days and customer history.
                  </p>
                </div>

                <div className="ai-step">
                  <div className="ai-step-number">2</div>
                  <h3>Assess Risk</h3>
                  <p>
                    The agent classifies each transaction as
                    Low, Medium or High risk.
                  </p>
                </div>

                <div className="ai-step">
                  <div className="ai-step-number">3</div>
                  <h3>Select Recovery Action</h3>
                  <p>
                    The agent chooses an action such as retry,
                    payment update or reminder.
                  </p>
                </div>
              </div>
            </section>

            <section className="panel">
              <h2 className="panel-title">
                Agent Activity
              </h2>

              <p className="panel-subtitle">
                Latest recovery operation
              </p>

              <div className="notification">
                <span className="notification-dot"></span>
                <span>
                  Successfully analyzed{" "}
                  <strong>
                    {recovery.transactions_processed}
                  </strong>{" "}
                  transactions.
                </span>
              </div>

              <div className="notification">
                <span className="notification-dot"></span>
                <span>
                  Recovered{" "}
                  <strong>
                    ₹{revenueRecovered.toLocaleString()}
                  </strong>{" "}
                  in revenue.
                </span>
              </div>

              <div className="notification warning">
                <span className="notification-dot"></span>
                <span>
                  <strong>
                    {recovery.transactions_processed -
                      recoveredCount}
                  </strong>{" "}
                  transactions require further customer action.
                </span>
              </div>
            </section>

            <br />

            <section className="results">
              <div className="section-header">
                <div>
                  <h2>AI Recovery Results</h2>
                  <p>
                    Filter and monitor AI recovery decisions
                  </p>
                </div>

                <div className="recovery-rate">
                  {recoveryRate}% recovered
                </div>
              </div>

              <div className="filters">
                {[
                  ["ALL", "All"],
                  ["FAILED", "Failed"],
                  ["SUCCESS", "Success"],
                  ["HIGH", "High Risk"],
                  ["MEDIUM", "Medium Risk"],
                  ["LOW", "Low Risk"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    className={
                      filter === value
                        ? "filter active"
                        : "filter"
                    }
                    onClick={() => setFilter(value)}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Transaction</th>
                      <th>Amount</th>
                      <th>Risk</th>
                      <th>AI Action</th>
                      <th>Result</th>
                      <th>Recovered</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredResults.length > 0 ? (
                      filteredResults.map((item) => (
                        <tr key={item.transaction_id}>
                          <td>
                            <strong>
                              {item.transaction_id}
                            </strong>
                          </td>

                          <td>
                            ₹
                            {Number(
                              item.amount
                            ).toLocaleString()}
                          </td>

                          <td>
                            <span
                              className={
                                "risk " +
                                item.risk.toLowerCase()
                              }
                            >
                              {item.risk}
                            </span>
                          </td>

                          <td>
                            {formatAction(item.action)}
                          </td>

                          <td>
                            <span
                              className={
                                item.result === "SUCCESS"
                                  ? "result success-result"
                                  : "result pending-result"
                              }
                            >
                              {formatAction(item.result)}
                            </span>
                          </td>

                          <td>
                            <strong>
                              ₹
                              {Number(
                                item.recovered
                              ).toLocaleString()}
                            </strong>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="6"
                          className="empty"
                        >
                          No transactions found for this filter.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        <section className="table-section">
          <div className="section-header">
            <div>
              <h2>Transaction Dashboard</h2>
              <p>
                Monitor payment failures and customer activity
              </p>
            </div>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Transaction</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Failure Reason</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.transaction_id}>
                    <td>
                      <strong>
                        {transaction.transaction_id}
                      </strong>
                    </td>

                    <td>{transaction.customer_id}</td>

                    <td>
                      ₹
                      {Number(
                        transaction.amount
                      ).toLocaleString()}
                    </td>

                    <td>
                      <span
                        className={
                          transaction.payment_status ===
                          "Failed"
                            ? "status failed"
                            : "status success"
                        }
                      >
                        {transaction.payment_status}
                      </span>
                    </td>

                    <td>
                      {transaction.failure_reason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="footer">
          RecoverAI • Automated Revenue Recovery Intelligence
        </div>
      </div>
    </>
  );
}

export default App;