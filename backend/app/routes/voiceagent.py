import requests
from fastapi import APIRouter, HTTPException

router = APIRouter()

@router.post("/call")
async def voice_agent():
    url = "https://largely-ready-pup.ngrok-free.app/outbound-call"
    headers = {"Content-Type": "application/json"}
    payload = {
        "prompt": "You are a friendly and efficient voice assistant calling on behalf of Jack. Your role is to contact suppliers to ask about availability, pricing, delivery timelines, and bulk discounts for specific construction or interior design materials. Introduce yourself as part of Jack’s team if needed. Ask one question at a time, listen carefully, and follow up based on their response. Ask about the different prices. You can also ask if they have a product catalog, if the item is in stock or special order, and the lead time if ordered this week. At the end, briefly summarize what was confirmed. DO NOT TRY TO HELP THE PERSON YOU ARE TALKING TO, THEY ARE HELPING YOU.",
        "first_message": "Hi there! I'm calling on behalf of Jack, a homeowner remodeling his home, and I'm looking to get some information about countertops for his kitchen. Could ya help me out?",
        "number": "+14088384380"
    }

    try:
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()
        return {"status": "success", "data": response.json()}
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=str(e))
