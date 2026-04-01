import unittest
import imaplib
import email
from unittest.mock import MagicMock, patch
from api.emailSystem.emailsystem import email_dropped_reservation
from dotenv import load_dotenv
import os
import time


load_dotenv()

def get_latest_email():
    mail = imaplib.IMAP4_SSL("imap.gmail.com")
    mail.login(os.getenv('GMAIL_TEST_EMAIL'), os.getenv('GMAIL_TEST_PASSWORD'))
    mail.select("inbox")

    _, messages = mail.search(None, f'FROM "{os.getenv("LIBRARY_EMAIL")}"')
    latest = messages[0].split()[-1]

    _, msg_data = mail.fetch(latest, "(RFC822)")
    msg = email.message_from_bytes(msg_data[0][1])

    subject = msg["subject"]
    body = msg.get_payload(decode=True).decode("utf-8")

    mail.logout()
    return subject, body


class TestDeviceServices(unittest.TestCase):
    
    def test_email_dropped_reservation(self):
        with (patch("api.services.users.fetch_users_by_id") as mock_fetch_user,
              patch("api.services.reservations.fetch_reservation_by_id") as mock_fetch_res):

            fake_user = MagicMock()
            fake_user.email = os.getenv('GMAIL_TEST_EMAIL')
            mock_fetch_user.return_value = fake_user

            fake_reservation = {"startTime": "2025-04-01T10:00:00Z"}
            mock_fetch_res.return_value = fake_reservation

            email_dropped_reservation(userId=1, resId=1, reason="building closure", Session=MagicMock())

        time.sleep(5)
        subject, body = get_latest_email()

        self.assertEqual(subject, "Computer reservation has been canceled")
        self.assertIn("Tuesday, April 01, 2025", body)