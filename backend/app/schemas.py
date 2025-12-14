from pydantic import BaseModel
from typing import List

class CampaignCreate(BaseModel):
    offers: List[str]
    max_spins: int

class SpinResult(BaseModel):
    result: str
