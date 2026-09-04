from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from agent import analyze_transaction, execute_recovery

app = FastAPI(title="RecoverAI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

df = pd.read_csv("data.csv")

@app.get("/")
def home():
    return {
        "message": "RecoverAI Revenue Recovery Agent"
    }

@app.get("/transactions")
def transactions():
    return df.to_dict(orient="records")

@app.get("/at-risk")
def at_risk():
    risky = df[df["payment_status"] == "Failed"]
    return risky.to_dict(orient="records")

@app.post("/run-agent")
def run_agent():
    results = []

    for _, row in df.iterrows():
        decision = analyze_transaction(row)

        result, recovered = execute_recovery(
            row,
            decision
        )

        results.append({
            "transaction_id": row["transaction_id"],
            "customer_id": row["customer_id"],
            "amount": row["amount"],
            "risk": decision["risk"],
            "action": decision["action"],
            "result": result,
            "recovered": recovered
        })

    total_recovered = sum(
        r["recovered"] for r in results
    )

    return {
        "transactions_processed": len(results),
        "revenue_recovered": total_recovered,
        "results": results
    }