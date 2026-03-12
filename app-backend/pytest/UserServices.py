import unittest
from unittest.mock import Mock

from api.services.users import *

class TestServices(unittest.TestCase):
    values = {"UserID": 1, "firstName": "Gilbert", "lastName": "Salazar", 
              "email": "test@gmail.com", 
              "password": "$2b$12$KyhGkEPsS4WWGtDdp/zI/upCPCqG4P535QgYs2Hh1NFq6YZlt6HMe",
              "weeklyHoursRemaining": 6.5, "roleId": 1, "role": "admin"}

    def test_userFetchId_getExistingUserInfo_ReturnInfo(self):
        mockUser = Mock(**self.values)
        mock_session = Mock()
        mock_session.exec.return_value.first.return_value = mockUser
        result = fetch_users_by_id(1, mock_session)
        print("Result:", result)
        assert result is not None
        assert result.email == "test@gmail.com"
        assert result.firstName == "Gilbert"
        mock_session.exec.assert_called()

        
    def test_userFetchId_getNonExistingUserInfo_ReturnInfo(self):
        mock_session = Mock()
        mock_session.exec.return_value.first.return_value = None
        result = fetch_users_by_id(0, mock_session)
        print("Result:", result)
        assert result is None
        mock_session.exec.assert_called()