"""HTTP API entry point for the pensions observatory."""

from typing import Literal

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="Observatorio de pensiones API", version="0.1.0")


class HealthResponse(BaseModel):
    """Body returned by the health check endpoint."""

    status: Literal["ok"]


@app.get("/health")
def health() -> HealthResponse:
    """Report that the API process is up and able to answer requests."""
    return HealthResponse(status="ok")
