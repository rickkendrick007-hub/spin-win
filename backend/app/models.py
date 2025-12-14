from sqlalchemy import Column, Integer, String, ForeignKey
from app.database import Base

class Campaign(Base):
    __tablename__ = "campaigns"

    id = Column(Integer, primary_key=True, index=True)
    token = Column(String, unique=True, index=True)
    offers = Column(String)  # JSON string
    max_spins = Column(Integer)

class Spin(Base):
    __tablename__ = "spins"

    id = Column(Integer, primary_key=True, index=True)
    campaign_id = Column(Integer, ForeignKey("campaigns.id"))
    user_token = Column(String)
    result = Column(String)

