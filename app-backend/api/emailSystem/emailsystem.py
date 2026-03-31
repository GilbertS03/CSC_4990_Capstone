from .. services import users
import smtplib
from sqlmodel import Session
import ssl
from dotenv import load_dotenv
from email.message import EmailMessage
import os
load_dotenv()

def EmailDroppedReservation(userId: int, reason: str):
    userInfo = users.fetch_users_by_id(userId,Session)
    print(userInfo)
    subject = "Computer reservation has been canceled"
    body = "Your reservation at [insert time and date] has been canceled for: " + reason
    receiverEmail = userInfo.email
    SendEmail(subject, body, receiverEmail)

def SendEmail(subject: str, body: str, receiverEmail: str):
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
