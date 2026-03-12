import unittest
from unittest.mock import Mock

from api.services.users import *

class TestServices(unittest.TestCase):
    valuesUser = {"UserID": 1, "firstName": "Gilbert", "lastName": "Salazar", 
              "email": "test@gmail.com", 
              "password": "$2b$12$KyhGkEPsS4WWGtDdp/zI/upCPCqG4P535QgYs2Hh1NFq6YZlt6HMe",
              "weeklyHoursRemaining": 6.5, "roleId": 1, "role": "admin"}
    
    valuesAllUsers = {{"UserID": 1, "firstName": "Gilbert", "lastName": "Salazar", 
              "email": "test@gmail.com", 
              "password": "$2b$12$KyhGkEPsS4WWGtDdp/zI/upCPCqG4P535QgYs2Hh1NFq6YZlt6HMe",
              "weeklyHoursRemaining": 3, "roleId": 2, "role": "student"}, {"UserID": 2, "firstName": "Chris", "lastName": "Maldonado", 
              "email": "test2@gmail.com", 
              "password": "$2b$12$KyhGkEPsS4WWGtDdp/zI/suwYTw4P535QgYs2HhfghGs73Fs6HMe",
              "weeklyHoursRemaining": 9, "roleId": 5, "role": "admin"}}
    
    def test_fetchUser_getAllUsers_returnInfo(self):
        mockUser = Mock(**self.valuesAllUsers)
        mock_session = Mock()
        mock_session.exec.return_value.first.return_value = mockUser
        result = fetch_users_by_id(1, mock_session)
        print("Result:", result)
        assert result is not None

    def test_userFetchId_getExistingUserInfo_returnInfo(self):
        mockUser = Mock(**self.valuesUser)
        mock_session = Mock()
        mock_session.exec.return_value.first.return_value = mockUser
        result = fetch_users(1, mock_session)
        print("Result:", result)
        assert result is not None
        assert result.email == "test@gmail.com"
        assert result.firstName == "Gilbert"
        mock_session.exec.assert_called()

        
    def test_userFetchId_getNonExistingUserInfo_returnNothing(self):
        mock_session = Mock()
        mock_session.exec.return_value.first.return_value = None
        result = fetch_users_by_id(0, mock_session)
        print("Result:", result)
        assert result is None
        mock_session.exec.assert_called()