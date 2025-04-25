# =========================================
# Name : main.py
# Use : Buyamia Test
# Creator : Kirstan Niamba
# Restriction(s) : None
# =========================================

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import json

# =========================================
# Create FastAPI instance
# =========================================
app = FastAPI()

# =========================================
# Allow CORS for the frontend
# =========================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================================
# Load data from dummyData.json
# =========================================
def load_data():
    with open("dummyData.json") as f:
        data = json.load(f)
    return data

# =========================================
# API endpoint for sales reps
# =========================================
@app.get("/api/sales-reps")
async def get_sales_reps():
    try:
        data = load_data()
        # Accessing the 'salesReps' part of the JSON data
        sales_reps = data.get("salesReps", [])
        return JSONResponse(content=sales_reps)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

# =========================================
# Main entry point for testing the server
# =========================================
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)