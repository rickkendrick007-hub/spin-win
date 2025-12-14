import json
import random
from app.models import Campaign, Spin
from app.utils import generate_token


def create_campaign(db, offers, max_spins):
    campaign = Campaign(
        token=generate_token(),
        offers=json.dumps(offers),
        max_spins=max_spins
    )
    db.add(campaign)
    db.commit()
    db.refresh(campaign)
    return campaign

def spin_wheel(db, campaign, user_token):
    existing = db.query(Spin).filter_by(
        campaign_id=campaign.id,
        user_token=user_token
    ).first()

    if existing:
        return None

    used_spins = db.query(Spin).filter_by(campaign_id=campaign.id).count()
    if used_spins >= campaign.max_spins:
        return None

    offers = json.loads(campaign.offers)
    result = random.choice(offers)

    spin = Spin(
        campaign_id=campaign.id,
        user_token=user_token,
        result=result
    )

    db.add(spin)
    db.commit()
    return result
