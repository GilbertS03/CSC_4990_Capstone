from email.message import EmailMessage
import smtplib
import ssl
from ..schema.user_schema import UserPublic
from ..schema.reservation_schema import CreateReservation
from dotenv import load_dotenv
import os

load_dotenv()

class EmailService:
    def __init__(self):
        self.sender_email = os.getenv('LIBRARY_EMAIL')
        self.password = os.getenv('LIBRARY_EMAIL_PASSWORD')

    def  dropped_reservation(self, user: UserPublic, reservation: CreateReservation, reason: str):
        start_time = reservation.startTime.strftime("%A, %B %d, %Y, %I:%M %p")
        subject = "Computer reservation has been canceled"
        body = f"Your reservation for {start_time} has been canceled for: {reason}"
        self.__send_email(subject, body, user.email)

    def create_reservation(self, user: UserPublic, reservation: CreateReservation):
        start_time = reservation.startTime.strftime("%B %d, %Y - %I:%M %p")
        end_time = reservation.endTime.strftime("%B %d, %Y - %I:%M %p")
        subject = "Reservation Creation"
        body = f"Reservation Creation Successful, {user.firstName}!\nDevice: {reservation.deviceId}.\n{start_time}\n{end_time}"
        self.__send_email(subject, body, user.email)

    def __send_email(self, subject: str, body: str, receiver_email: str):
        message = EmailMessage()
        message.set_content(body)
        message['Subject'] = subject
        message['From'] = self.sender_email
        message['To'] = receiver_email

        context = ssl.create_default_context()
        try:
            with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
                server.login(self.sender_email, self.password)
                server.send_message(message)
                print("Email sent successfully!")
        except smtplib.SMTPException as e:
            print(f"Error: {e}")