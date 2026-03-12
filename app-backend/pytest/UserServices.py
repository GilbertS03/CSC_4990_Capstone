import unittest
from unittest.mock import Mock

from api.services.users import *

class TestServices(unittest.TestCase):
    UserValues = {"UserID": 1, "firstName": "Gilbert", "lastName": "Salazar", 
              "email": "test@gmail.com", 
              "password": "$2b$12$KyhGkEPsS4WWGtDdp/zI/upCPCqG4P535QgYs2Hh1NFq6YZlt6HMe",
              "weeklyHoursRemaining": 6.5, "roleId": 1, "role": "admin"}
    
    allUsersValues = [{"UserID": 1, "firstName": "Gilbert", "lastName": "Salazar", 
              "email": "test@gmail.com", 
              "password": "$2b$12$KyhGkEPsS4WWGtDdp/zI/upCPCqG4P535QgYs2Hh1NFq6YZlt6HMe",
              "weeklyHoursRemaining": 3, "roleId": 2, "role": "student"}, 
             {"UserID": 2, "firstName": "Chris", "lastName": "Maldonado", 
              "email": "test2@gmail.com", 
              "password": "$2b$12$KyhGkEPsS4WWGtDdp/zI/suwYTw4P535QgYs2HhfghGs73Fs6HMe",
              "weeklyHoursRemaining": 9, "roleId": 5, "role": "admin"}]
    
    def test_fetchUser_getAllUsers_returnInfo(self):
        mockUsers = [Mock(**user_data) for user_data in self.allUsersValues]
        mock_session = Mock()
        mock_session.exec.return_value.all.return_value = mockUsers
        result = fetch_users(mock_session)
        print("getAllUsers_returnInfo Result:", result[1])
        assert result is not None

    def test_fetchUser_getemptyUsers_returnNone(self):
        mock_session = Mock()
        mock_session.exec.return_value.all.return_value = []
        result = fetch_users(mock_session)
        print("getemptyUsers_returnNone Result:", result)
        assert result == []

    def test_fetchUserRole_getExistingUserRole_returnRole(self):
        mockUser = Mock(**self.UserValues)
        mock_session = Mock()
        mock_session.exec.return_value.first.return_value = mockUser
        result = fetch_user_role(mock_session, "test@gmail.com")
        print("fetchUserRole_returnRole Result:", result.role)
        assert result is not None
        assert result.role == "admin"


    def test_userFetchId_getExistingUserInfo_returnInfo(self):
        mockUser = Mock(**self.UserValues)
        mock_session = Mock()
        mock_session.exec.return_value.first.return_value = mockUser
        result = fetch_users_by_id(1, mock_session)
        print("getExistingUserInfo_returnInfo Result:", result)
        assert result is not None
        assert result.email == "test@gmail.com"
        assert result.firstName == "Gilbert"
        mock_session.exec.assert_called()

        
    def test_userFetchId_getNonExistingUserInfo_returnNothing(self):
        mock_session = Mock()
        mock_session.exec.return_value.first.return_value = None
        result = fetch_users_by_id(0, mock_session)
        print("getNonExistingUserInfo_returnNothing Result:", result)
        assert result is None
        mock_session.exec.assert_called()