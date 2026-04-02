from .. services import users
from .. services import reservations
import smtplib
from sqlmodel import Session
import ssl
from dotenv import load_dotenv
from email.message import EmailMessage
import os
from datetime import datetime
load_dotenv()

def email_dropped_reservation(userId: int, resId:int, reason: str, session:Session):
    userInfo = users.fetch_users_by_id(userId)
    reservationInfo = reservations.fetch_reservation_by_id(Session,resId)
    dt = datetime.fromisoformat(reservationInfo["startTime"].replace("Z", "+00:00"))
    day = dt.strftime("%A, %B %d, %Y")
    time = dt.strftime("%I:%M %p")  
    print(userInfo)
    subject = "Computer reservation has been canceled"
    body = "Your reservation for " + day + "," + time + " has been canceled for: "  + reason
    receiverEmail = userInfo.email
    send_email(subject, body, receiverEmail)

def send_email(subject: str, body: str, receiverEmail: str):
    senderEmail = os.getenv('LIBRARY_EMAIL')
    password = os.getenv('LIBRARY_EMAIL_PASSWORD')
    message = EmailMessage()
    message.set_content(body)
    message['Subject'] = subject
    message['From'] = senderEmail
    message['To'] = receiverEmail

    context = ssl.create_default_context()

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
            server.login(senderEmail, password)
            server.send_message(message)
            print("Email sent successfully!")
    except smtplib.SMTPException as e:
        print(f"Error: {e}")
