import os
from dotenv import load_dotenv
load_dotenv()

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from supabase import create_client, Client
from langchain_openai import OpenAIEmbeddings
from langchain.docstore.document import Document
from langchain_community.vectorstores import FAISS
from langchain_community.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA

router = APIRouter()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

embeddings_model = OpenAIEmbeddings(
    model="text-embedding-ada-002", 
    openai_api_key=OPENAI_API_KEY
)

class ChatRequest(BaseModel):
    customer_id: str
    query: str

def get_documents_for_customer(customer_id: str):
    response = supabase.table("customer_context_chunks") \
                       .select("chunk_text") \
                       .eq("customer_id", customer_id) \
                       .execute()
    if not response.data:
        return []
    return [Document(page_content=record["chunk_text"]) for record in response.data]

@router.post("/chat")
async def chat(request: ChatRequest):
    try:
        docs = get_documents_for_customer(request.customer_id)
        if not docs:
            raise HTTPException(status_code=404, detail="No documents found for customer.")
        
        vectorstore = FAISS.from_documents(docs, embeddings_model)
        retriever = vectorstore.as_retriever(search_kwargs={"k": 3})
        
        llm = ChatOpenAI(
            model_name="gpt-3.5-turbo",
            openai_api_key=OPENAI_API_KEY,
            temperature=0.7,
            max_tokens=1000
        )
        
        qa_chain = RetrievalQA.from_chain_type(
            llm=llm,
            chain_type="stuff",
            retriever=retriever
        )
        
        answer = qa_chain.invoke(request.query)
        
        if isinstance(answer, dict) and "result" in answer:
            final_answer = answer["result"]
        else:
            final_answer = answer

        return {"answer": final_answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
