# RecoverAI – Revenue Recovery Agent

RecoverAI is an automated revenue recovery system designed to identify failed transactions, assess recovery risk, and recommend suitable recovery actions.

## 🚀 Project Overview

Failed payments can result in significant revenue loss for businesses. RecoverAI analyzes transaction data and automatically determines the risk level and appropriate recovery action for each transaction.

The system combines a **FastAPI backend**, **Pandas data processing**, **rule-based recovery logic**, and a **React dashboard** to provide an end-to-end revenue recovery solution.

## ✨ Key Features

* Analyze transaction data from CSV
* Identify failed and at-risk transactions
* Assess transaction recovery risk
* Recommend suitable recovery actions
* Calculate recovered revenue
* Display recovery rate and analytics
* Filter transactions by status and risk level
* Interactive React dashboard
* FastAPI REST API
* Automated recovery agent execution
* Transaction and recovery result monitoring

## 🏗️ System Architecture

```text
CSV Transaction Data
        ↓
      Pandas
        ↓
   FastAPI Backend
        ↓
  Recovery Agent
        ↓
  Risk Assessment
        ↓
 Recovery Action
        ↓
   React Dashboard
        ↓
     Analytics
```

## 🛠️ Technology Stack

### Frontend

* React.js
* Vite
* JavaScript
* HTML
* CSS

### Backend

* Python
* FastAPI
* Pandas
* Uvicorn

### Recovery Engine

* Rule-Based Risk Assessment
* Automated Recovery Decision Logic

### Data

* CSV
  
## 📂 Project Structure

```text
RecoverAI-Revenue-Recovery-Agent/
│
├── agent.py
├── data.csv
├── main.py
├── App.jsx
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── .gitignore
├── .oxlintrc.json
├── favicon.svg
└── README.md

```

## 🔄 How It Works

1. Transaction data is loaded from `data.csv`.
2. RecoverAI identifies failed and at-risk transactions.
3. The recovery agent analyzes transaction factors such as:

   * Payment status
   * Failure reason
   * Retry count
   * Overdue days
   * Customer type
   * Previous success rate
4. The system assigns a recovery risk level.
5. A suitable recovery action is selected using rule-based decision logic.
6. The recovery result is calculated.
7. The React dashboard displays transaction information, recovery results, and analytics.

## 🔌 API Endpoints

### Home

```text
GET /
```

Returns the RecoverAI API status.

### Transactions

```text
GET /transactions
```

Returns all transaction records.

### At-Risk Transactions

```text
GET /at-risk
```

Returns failed transactions identified as being at risk.

### Run Recovery Agent

```text
POST /run-agent
```

Runs the recovery agent and returns recovery results and analytics.

## 📊 Sample Results

The sample dataset contains **10 transactions**.

* **Total Transactions:** 10
* **At-Risk Transactions:** 9
* **Revenue at Risk:** ₹83,991
* **Revenue Recovered:** ₹47,493
* **Recovery Rate:** 56.5%
* **Successful Recoveries:** 7

## 💻 How to Run the Project

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_LINK
cd RecoverAI
```

Replace `YOUR_GITHUB_REPOSITORY_LINK` with your actual GitHub repository URL.

### 2. Run the Backend

Open a terminal and navigate to the backend folder:

```bash
cd backend
python -m uvicorn main:app --reload
```

The backend will run at:

```text
http://127.0.0.1:8000
```

### 3. Run the Frontend

Open another terminal and navigate to the frontend folder:

```bash
cd frontend
npm install
npm run dev
```

Open the frontend URL displayed in the terminal.

For example:

```text
http://localhost:5174
```

## 🎯 Project Objective

The main objective of RecoverAI is to automate the revenue recovery process by analyzing failed transactions, assessing their recovery risk, and selecting suitable recovery actions.

This helps businesses identify potentially lost revenue and take appropriate recovery actions in a structured and automated manner.

## ⚙️ Recovery Decision Process

RecoverAI uses transaction information to determine the appropriate recovery strategy.

```text
Transaction
     ↓
Check Payment Status
     ↓
Analyze Transaction Factors
     ↓
Assess Risk
     ↓
Select Recovery Action
     ↓
Calculate Recovery Result
```

The recovery decision considers factors such as payment failure reason, retry count, overdue days, customer type, and previous payment success rate.

## 📈 Dashboard

The React dashboard provides an overview of:

* Total transactions
* At-risk transactions
* Revenue at risk
* Revenue recovered
* Recovery rate
* Successful recoveries
* Risk distribution
* Agent activity
* AI recovery results
* Transaction details

Users can also filter recovery results based on transaction status and risk level.

## 🧩 Challenges & Technical Obstacles

During development, several technical challenges were encountered.

### React–FastAPI Integration

Connecting the React frontend with the FastAPI backend required proper API communication and CORS configuration. This was solved by configuring CORS and creating dedicated API endpoints for transaction and recovery data.

### CSV Data Processing

Transaction data needed to be loaded and processed correctly from the CSV file. Pandas was used to read, filter, and process the transaction data efficiently.

### Frontend State Management

Displaying dynamic recovery results and analytics required proper state management in React. React state and calculated values were used to update the dashboard dynamically.

### Environment and Dependency Issues

Development environment and dependency issues were resolved by checking installed versions, configuring the correct environment, and using the appropriate commands for running the backend and frontend.

## 🔮 Future Enhancements

* Integration with real payment gateways
* Email and SMS recovery notifications
* Machine learning-based risk prediction
* Customer-specific recovery strategies
* PostgreSQL database integration
* Authentication and user management
* Advanced revenue analytics
* Cloud deployment
* Real-time transaction monitoring

## 🏁 Conclusion

RecoverAI demonstrates an end-to-end full-stack solution for automated revenue recovery.

The project combines transaction data processing, FastAPI APIs, rule-based recovery decision logic, and an interactive React dashboard to identify at-risk transactions and analyze potential revenue recovery.

It provides a practical foundation for building more advanced automated revenue recovery systems in the future.

