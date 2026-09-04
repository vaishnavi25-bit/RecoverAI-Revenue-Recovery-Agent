def analyze_transaction(row):

    score = 0

    if row["payment_status"] == "Failed":
        score += 30

    if row["retry_count"] >= 2:
        score += 20

    if row["days_overdue"] >= 7:
        score += 20

    if row["amount"] >= 10000:
        score += 15

    if row["previous_success_rate"] < 0.70:
        score += 15

    if score >= 60:
        risk = "HIGH"
    elif score >= 40:
        risk = "MEDIUM"
    else:
        risk = "LOW"

    if row["failure_reason"] == "Card Expired":
        action = "UPDATE_PAYMENT_METHOD"

    elif row["retry_count"] < 2:
        action = "RETRY_PAYMENT"

    elif row["days_overdue"] > 7:
        action = "ESCALATE"

    else:
        action = "SEND_REMINDER"

    return {
        "risk": risk,
        "score": score,
        "action": action
    }


def execute_recovery(row, decision):

    action = decision["action"]

    if action == "RETRY_PAYMENT":

        if row["retry_count"] < 2:
            result = "SUCCESS"
            recovered = row["amount"]
        else:
            result = "ESCALATED"
            recovered = 0

    elif action == "UPDATE_PAYMENT_METHOD":

        result = "CUSTOMER_ACTION_REQUIRED"
        recovered = 0

    elif action == "SEND_REMINDER":

        result = "SUCCESS"
        recovered = row["amount"]

    else:

        result = "ESCALATED"
        recovered = 0

    return result, recovered