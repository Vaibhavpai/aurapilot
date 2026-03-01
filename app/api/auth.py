from fastapi import APIRouter, HTTPException, Depends, status
from ..models.schemas import User, UserCreate, UserLogin, Token, GoogleLoginRequest
from ..core.database import users_collection
from ..core.auth_utils import get_password_hash, verify_password, create_access_token
from google.oauth2 import id_token
from google.auth.transport import requests
import os
import uuid
from datetime import datetime

router = APIRouter(prefix="/auth", tags=["auth"])

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")

@router.post("/signup", response_model=Token)
async def signup(user_data: UserCreate):
    # Check if user already exists
    existing_user = await users_collection.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create new user
    user_dict = user_data.dict()
    user_dict["hashed_password"] = get_password_hash(user_dict.pop("password"))
    user_dict["_id"] = str(uuid.uuid4())
    user_dict["created_at"] = datetime.utcnow()
    user_dict["is_active"] = True
    user_dict["avatar"] = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop"
    
    await users_collection.insert_one(user_dict)
    
    # Generate token
    access_token = create_access_token(data={"sub": user_data.email})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/login", response_model=Token)
async def login(credentials: UserLogin):
    user = await users_collection.find_one({"email": credentials.email})
    if not user or not verify_password(credentials.password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    access_token = create_access_token(data={"sub": user["email"]})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/google-login", response_model=Token)
async def google_login(request: GoogleLoginRequest):
    try:
        # Verify Google ID token
        idinfo = id_token.verify_oauth2_token(request.token, requests.Request(), GOOGLE_CLIENT_ID)
        
        email = idinfo['email']
        name = idinfo.get('name', email.split('@')[0])
        picture = idinfo.get('picture', "")
        
        # Check if user exists, otherwise create
        user = await users_collection.find_one({"email": email})
        if not user:
            user_dict = {
                "_id": str(uuid.uuid4()),
                "email": email,
                "username": email.split('@')[0],
                "full_name": name,
                "avatar": picture or "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop",
                "is_active": True,
                "created_at": datetime.utcnow()
            }
            await users_collection.insert_one(user_dict)
        
        access_token = create_access_token(data={"sub": email})
        return {"access_token": access_token, "token_type": "bearer"}
        
    except ValueError as e:
        raise HTTPException(status_code=401, detail=f"Invalid Google token: {str(e)}")

@router.get("/me", response_model=User)
async def get_me(token: str):
    # Note: In a real app, use a proper security dependency
    from ..core.auth_utils import decode_token
    payload = decode_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    email = payload.get("sub")
    user = await users_collection.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return user
