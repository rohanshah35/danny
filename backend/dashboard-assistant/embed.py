import os
from dotenv import load_dotenv

load_dotenv()

import openai
from supabase import create_client, Client
from langchain.embeddings import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
import numpy as np

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

openai.api_key = OPENAI_API_KEY

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

embeddings_model = OpenAIEmbeddings(model="text-embedding-ada-002", openai_api_key=OPENAI_API_KEY)

def fetch_documents():
    response = supabase.table("customer_context").select("id, customer_id, document_text").execute()
    return response.data

def insert_chunk(customer_id: str, chunk_text: str, embedding: list):
    payload = {
        "customer_id": customer_id,
        "chunk_text": chunk_text,
        "embedding": embedding
    }
    supabase.table("customer_context_chunks").insert(payload).execute()

def process_documents():
    docs = fetch_documents()
    if not docs:
        return
    
    text_splitter = CharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    
    for doc in docs:
        customer_id = doc.get("customer_id")
        document_text = doc.get("document_text")
        doc_id = doc.get("id")
        if not document_text:
            continue
        
        chunks = text_splitter.split_text(document_text)
        
        for chunk in chunks:
            try:
                embedding = embeddings_model.embed_query(chunk)
                if isinstance(embedding, np.ndarray):
                    embedding = embedding.tolist()
                insert_chunk(customer_id, chunk, embedding)
            except Exception:
                pass

if __name__ == "__main__":
    process_documents()
