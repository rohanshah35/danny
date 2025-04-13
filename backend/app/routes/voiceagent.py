import requests
from fastapi import APIRouter, HTTPException

router = APIRouter()

@router.post("/call")
async def voice_agent():
    url = "https://largely-ready-pup.ngrok-free.app/outbound-call"
    headers = {"Content-Type": "application/json"}
    payload = {
        "prompt": "You are Eric, an outbound car sales agent. You are calling to sell a new car to the customer. Be friendly and professional and answer all questions.",
        "first_message": "Hello Thor, my name is Eric, I heard you were looking for a new car! What model and color are you looking for?",
        "number": "+14088384380"
    }

    try:
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()
        return {"status": "success", "data": response.json()}
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=str(e))
