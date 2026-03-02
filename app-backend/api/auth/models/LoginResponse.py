from .token import Token

class LoginResponse(Token):
    firstName: str
    lastName: str
    weeklyHoursRemaining: float