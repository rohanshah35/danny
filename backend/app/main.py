from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.llm import router as llm_router
from app.routes.voiceagent import router as voiceagent_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(llm_router, prefix="/llm")
app.include_router(voiceagent_router, prefix="/voiceagent")

@app.get("/")
async def root():
    return {"message": "FastAPI LLM chatbot backend running."}
