from .. services import users
import PyOTP
import time
import smtplib
import ssl
from dotenv import load_dotenv
from email.message import EmailMessage
import os
load_dotenv()

def EmailDroppedReservation(id, reason):
    ##unable to work due to Session not being created by the api engine before being called 
    userInfo = users.fetch_users_by_id(id)
    print(userInfo)
    subject = "Computer reservation has been canceled"
    body = "Your reservation has been canceled for" + reason
    receiverEmail = useremail
    SendEmail(subject, body, receiverEmail)

def AuthSystem(id):
     userInfo = users.fetch_users_by_id(id)
     totp = pyotp.TOTP('base32secret3232')

def SendEmail(subject, body, receiverEmail):
    senderEmail = os.getenv('BACKENDEMAIL')
    password = os.getenv('BACKENDEMAILPASSWORD')
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
