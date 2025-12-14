from fastapi import FastAPI, Depends, HTTPException, Cookie
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware


from app.database import SessionLocal, engine
from app.models import Base, Campaign
from app.schemas import CampaignCreate
from app.crud import create_campaign, spin_wheel
from app.utils import generate_token

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "https://YOUR_NETLIFY_URL.netlify.app"
],
    allow_credentials=True,
    allow_methods=["*"],  # allow POST, GET, OPTIONS
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/admin/campaign")
def create_campaign_api(data: CampaignCreate, db: Session = Depends(get_db)):
    campaign = create_campaign(db, data.offers, data.max_spins)
    return {"link": f"http://localhost:5173/spin/{campaign.token}"}

@app.post("/spin/{token}")
def spin(token: str, user_token: str = Cookie(None), db: Session = Depends(get_db)):
    campaign = db.query(Campaign).filter_by(token=token).first()
    if not campaign:
        raise HTTPException(status_code=404, detail="Invalid campaign")

    if not user_token:
        user_token = generate_token()

    result = spin_wheel(db, campaign, user_token)
    if not result:
        raise HTTPException(status_code=403, detail="No spins available or already used")

    return {"result": result}

import json

@app.get("/campaign/{token}")
def get_campaign(token: str, db: Session = Depends(get_db)):
    campaign = db.query(Campaign).filter_by(token=token).first()
    if not campaign:
        raise HTTPException(status_code=404, detail="Invalid campaign")

    used_spins = db.query(Spin).filter_by(campaign_id=campaign.id).count()

    return {
        "offers": json.loads(campaign.offers),
        "remaining_spins": campaign.max_spins - used_spins
    }

