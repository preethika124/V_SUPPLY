from fastapi import FastAPI
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
from groq import Groq
import os


app = FastAPI()
from dotenv import load_dotenv

load_dotenv()
client = Groq(
    api_key=os.getenv(
        "GROQ_API_KEY"
    )
)

class ProductRequest(
    BaseModel
):
    name:str

    price:str
    unit:str


@app.post(
    "/generate-description"
)
async def generate_description(
    request: ProductRequest
):

    prompt = f"""
    Generate a professional
    B2B marketplace product
    description.

    Product Name:
    {request.name}

    Price:
    {request.price}

    Unit:
    {request.unit}

    Requirements:
    - 60 to 80 words
    - Professional tone
    - Mention quality
    - Mention wholesale buyers
    - Mention reliability
    """

    response = client.chat.completions.create(

        model=
        "llama-3.3-70b-versatile",

        messages=[
            {
                "role":"user",
                "content":prompt
            }
        ],

        temperature=0.5

    )

    description = (
        response
        .choices[0]
        .message
        .content
    )

    return {
        "description":
        description
    }


model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

class EmbeddingRequest(BaseModel):
    text: str

@app.get("/")
async def root():
    return {
        "message": "Embedding service running"
    }

@app.post("/generate-embedding")
async def generate_embedding(
    data: EmbeddingRequest
):

    embedding = (
        model.encode(
            data.text
        ).tolist()
    )

    return {
        "embedding": embedding
    }