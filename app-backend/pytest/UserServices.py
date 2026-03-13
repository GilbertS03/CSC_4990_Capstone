import unittest
from unittest.mock import Mock

from api.schema.user_schema import UserCreate
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
    
    def test_fetchUser_fetchExistingUsers_returnInfo(self):
        mockUsers = [Mock(**user_data) for user_data in self.allUsersValues]
        mock_session = Mock()
        mock_session.exec.return_value.all.return_value = mockUsers
        result = fetch_users(mock_session)
        print("getAllUsers_returnInfo Result:", result[1])
        assert result is not None
        mock_session.exec.assert_called()

    def test_fetchUser_fetchemptyUsers_returnNone(self):
        mock_session = Mock()
        mock_session.exec.return_value.all.return_value = []
        result = fetch_users(mock_session)
        print("getemptyUsers_returnNone Result:", result)
        assert result == []
        mock_session.exec.assert_called()
        

    def test_fetchUserRole_fetchExistingUserRole_returnRole(self):
        mockUser = Mock(**self.UserValues)
        mock_session = Mock()
        mock_session.exec.return_value.first.return_value = mockUser
        result = fetch_user_role(mock_session, "test@gmail.com")
        print("fetchUserRole_returnRole Result:", result.role)
        assert result is not None
        assert result.role == "admin"
        mock_session.exec.assert_called()

    def test_fetchUserRole_fetchNonExistingUserRole_returnNone(self):
        mock_session = Mock()
        mock_session.exec.return_value.first.return_value = None
        result = fetch_user_role(mock_session, "test@gmail.com")
        print("fetchUserRole_returnRole Result:", result)
        assert result is None
        mock_session.exec.assert_called()

    def test_userFetchId_fetchExistingUserId_returnInfo(self):
        userID= 1
        mockUser = Mock(**self.UserValues)
        mock_session = Mock()
        mock_session.exec.return_value.first.return_value = mockUser
        result = fetch_users_by_id(userID, mock_session)
        print("getExistingUserInfo_returnInfo Result:", result)
        assert result is not None
        assert result.email == "test@gmail.com"
        assert result.firstName == "Gilbert"
        mock_session.exec.assert_called()

        
    def test_userFetchId_fetchNonExistingUserId_returnNothing(self):
        userId = 0
        mock_session = Mock()
        mock_session.exec.return_value.first.return_value = None
        result = fetch_users_by_id(userId, mock_session)
        print("getNonExistingUserInfo_returnNothing Result:", result)
        assert result is None
        mock_session.exec.assert_called()

    def test_userCreate_createUserInfo_returnNewUser(self):
        newUser = UserCreate(email ="test@gmail.com",firstName= "Niko",lastName= "Ruiz",password= "123CookieMonster")
        mock_session = Mock()
        result = create_user(newUser,mock_session)
        print("createUserInfo_returnInfo Result:", result)
        assert result is not None
        assert result.email == "test@gmail.com"
        assert result.firstName == "Niko"

    def test_userCreate_createEmptyUserInfo_returnError(self):
        mock_session = Mock()
        with self.assertRaises(Exception):
            newUser = UserCreate()
            create_user(newUser, mock_session)
        mock_session.add.assert_not_called()
        mock_session.commit.assert_not_called()

    def test_fetchUserByEmail_fetchExistingEmail_returnInfo(self):
        userEmail= "test@gmail.com"
        mockUser = Mock(**self.UserValues)
        mock_session = Mock()
        mock_session.exec.return_value.first.return_value = mockUser
        result = fetch_user_by_email( mock_session,userEmail)
        print("FetchExistingEmail_returnInfo result: " , result.firstName)
        assert result is not None
        assert result.firstName == "Gilbert"
        mock_session.exec.assert_called()

    def test_fetchUserByEmail_fetchNonExistingEmail_returnNothing(self):
        userEmail= "test@gmail.com"
        mock_session = Mock()
        mock_session.exec.return_value.first.return_value = None
        result = fetch_user_by_email( mock_session,userEmail)
        print("FetchNonExistingEmail_returnNone result: " , result)
        assert result is None
        mock_session.exec.assert_called()
