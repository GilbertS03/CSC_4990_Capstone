import smtplib
import ssl
from dotenv import load_dotenv
from email.message import EmailMessage
import os
load_dotenv()

def EmailDroppedReservation():
    subject = "Beans"
    body = "Game of Thrones describes a long struggle for power between noble families while a threat" 
    " looms over their kingdoms, an external enemy that destroys everything in its path: the White Walkers"
    receiver_email = "alejandronino999@gmail.com"
    SendEmail(subject, body, receiver_email)

def SendEmail(subject, body, receiver_email):
    sender_email ="csc4990librarysmtp@gmail.com"
    password = os.getenv('PASSWORD')
    message = EmailMessage()
    message.set_content(body)
    message['Subject'] = subject
    message['From'] = sender_email
    message['To'] = receiver_email

    context = ssl.create_default_context()

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
            server.login(sender_email, password)
            server.send_message(message)
            print("Email sent successfully!")
    except smtplib.SMTPException as e:
        print(f"Error: {e}")

EmailDroppedReservation()