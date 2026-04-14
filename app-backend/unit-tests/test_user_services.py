import unittest
from unittest.mock import Mock

from api.schema.user_schema import UserCreate
from api.services.users import *

class TestUserServices(unittest.TestCase):
    UserValues = {"userId": 1, "firstName": "Gilbert", "lastName": "Salazar", 
              "email": "test@gmail.com", 
              "password": "$2b$12$KyhGkEPsS4WWGtDdp/zI/upCPCqG4P535QgYs2Hh1NFq6YZlt6HMe",
              "weeklyHoursRemaining": 6.5, "roleId": 1, "role": "admin"}
    
    allUsersValues = [{"userId": 1, "firstName": "Gilbert", "lastName": "Salazar", 
              "email": "test@gmail.com", 
              "password": "$2b$12$KyhGkEPsS4WWGtDdp/zI/upCPCqG4P535QgYs2Hh1NFq6YZlt6HMe",
              "weeklyHoursRemaining": 3, "roleId": 2, "role": "student"}, 
             {"userId": 2, "firstName": "Chris", "lastName": "Maldonado", 
              "email": "test2@gmail.com", 
              "password": "$2b$12$KyhGkEPsS4WWGtDdp/zI/suwYTw4P535QgYs2HhfghGs73Fs6HMe",
              "weeklyHoursRemaining": 9, "roleId": 5, "role": "admin"}]
    
    def test_fetchUser_fetchExistingUsers_returnInfo(self):
        mockUsers = [Mock(**userData) for userData in self.allUsersValues]
        mockSession = Mock()
        mockSession.exec.return_value.all.return_value = mockUsers
        result = fetch_users(mockSession)
        assert result is not None
        mockSession.exec.assert_called()

    def test_fetchUser_fetchemptyUsers_returnNone(self):
        mockSession = Mock()
        mockSession.exec.return_value.all.return_value = []
        result = fetch_users(mockSession)
        assert result == []
        mockSession.exec.assert_called()
        

    def test_fetchUserRole_fetchExistingUserRole_returnRole(self):
        mockUser = Mock(**self.UserValues)
        mockSession = Mock()
        mockSession.exec.return_value.first.return_value = mockUser
        result =fetch_user_role(mockSession, "test@gmail.com")
        assert result is not None
        assert result.role == "admin"
        mockSession.exec.assert_called()

    def test_fetchUserRole_fetchNonExistingUserRole_returnNone(self):
        mockSession = Mock()
        mockSession.exec.return_value.first.return_value = None
        result = fetch_user_role(mockSession, "test@gmail.com")
        assert result is None
        mockSession.exec.assert_called()

    def test_userFetchId_fetchExistingUserId_returnInfo(self):
        userID= 1
        mockUser = Mock(**self.UserValues)
        mockSession = Mock()
        mockSession.exec.return_value.one.return_value = mockUser
        result = fetch_users_by_id(userID, mockSession)
        assert result is not None
        assert result.email == "test@gmail.com"
        assert result.firstName == "Gilbert"
        mockSession.exec.assert_called()

        
    def test_userFetchId_fetchNonExistingUserId_returnNothing(self):
        userId = 0
        mockSession = Mock()
        mockSession.exec.return_value.one.return_value = None
        result = fetch_users_by_id(userId, mockSession)
        assert result is None
        mockSession.exec.assert_called()

    def test_userCreate_createUserInfo_returnNewUser(self):
        newUser = UserCreate(email ="test@gmail.com",firstName= "Niko",lastName= "Ruiz",password= "123CookieMonster")
        mockSession = Mock()
        result = create_user(newUser,mockSession)
        assert result is not None
        assert result.email == "test@gmail.com"
        assert result.firstName == "Niko"

    def test_userCreate_createEmptyUserInfo_returnError(self):
        mockSession = Mock()
        with self.assertRaises(Exception):
            newUser = UserCreate()
            create_user(newUser, mockSession)
        mockSession.add.assert_not_called()
        mockSession.commit.assert_not_called()

    def test_fetchUserByEmail_fetchExistingEmail_returnInfo(self):
        userEmail= "test@gmail.com"
        mockUser = Mock(**self.UserValues)
        mockSession = Mock()
        mockSession.exec.return_value.first.return_value = mockUser
        result = fetch_user_by_email( mockSession,userEmail)
        assert result is not None
        assert result.firstName == "Gilbert"
        mockSession.exec.assert_called()

    def test_fetchUserByEmail_fetchNonExistingEmail_returnNothing(self):
        userEmail= "test@gmail.com"
        mockSession = Mock()
        mockSession.exec.return_value.first.return_value = None
        result = fetch_user_by_email( mockSession,userEmail)
        assert result is None
        mockSession.exec.assert_called()