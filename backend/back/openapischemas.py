from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

from pydantic.types import conint


class LoginObject(BaseModel):
    email: str
    password: str
