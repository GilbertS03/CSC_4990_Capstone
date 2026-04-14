import unittest
from unittest.mock import Mock, patch
from api.services.reservations import *
from datetime import datetime

class TestReservationServices(unittest.TestCase):
    allReservationValues = [
    {"reservationId": 1,"userId": 1,"deviceId": 3,"reservationStatusId": 1,"status" : "active","startTime": 
     datetime(2025, 1, 15, 9, 0, 0),"endTime": datetime(2025, 1, 15, 11, 0, 0)},
    {"reservationId": 2,"userId": 2,"deviceId": 2,"reservationStatusId": 2,"status" : "cancelled","startTime": 
     datetime(2025, 1, 18, 14, 0, 0),"endTime": datetime(2025, 1, 18, 16, 0, 0)},
     {"reservationId": 3,"userId": 4,"deviceId": 1,"reservationStatusId": 4,"status" : "active","startTime": 
     datetime(2025, 1, 17, 14, 0, 0),"endTime": datetime(2025, 1, 17, 16, 0, 0)},
     {"reservationId": 4,"userId": 3,"deviceId": 7,"reservationStatusId": 2,"status" : "completed","startTime": 
     datetime(2025, 1, 16, 14, 0, 0),"endTime": datetime(2025, 1, 16, 16, 0, 0)}]

    userValues = {"userId": 1, "firstName": "Gilbert", "lastName": "Salazar",
                  "email": "test@gmail.com", "weeklyHoursRemaining": 6.5, "role": "admin"}
    insufficentHoursUserValues = {"userId": 1, "firstName": "Gilbert", "lastName": "Salazar",
                  "email": "test@gmail.com", "weeklyHoursRemaining": 0, "role": "admin"} 
    
    reservationValues = {"reservationId": 1,"deviceId": 3,"roomId": 1,"startTime": datetime(2025, 1, 1, 10, 30, 45),"endTime": datetime(2025, 1, 1, 12, 45, 59)}
   
    def test_fetchAllReservations_fetchExistingReservations_returnInfo(self):
        mockReservations = [Mock(**reservationData) for reservationData in self.allReservationValues]
        mockSession = Mock()
        mockSession.exec.return_value.all.return_value = mockReservations
        result = fetch_all_reservations(mockSession)
        assert result is not None
        assert result[1].reservationId == 2
        mockSession.exec.assert_called()

    def test_fetchAllReservations_fetchNonExistingReservations_returnNothing(self):
        mockSession = Mock()
        mockSession.exec.return_value.all.return_value = []
        result = fetch_all_reservations(mockSession)
        assert result == []
        mockSession.exec.assert_called()   
##TODO still broken values alway return entire list

    def test_fetchReservationStatus_inBoundary_fetchExisitingReservation_returnInfo(self):
        mockReservations = [Mock(**data) for data in self.allReservationValues]
        mockSession = Mock()
        mockSession.exec.return_value.all.return_value = mockReservations
        middleResult = fetch_reservation_statuses(mockSession, userId=2, status="cancelled")
        upperResult = fetch_reservation_statuses(mockSession, userId=3, status="completed")
        lowerResult = fetch_reservation_statuses(mockSession, userId=1, status="active")
        print(len(middleResult), len(upperResult), len(lowerResult))
        assert middleResult is not None
        assert upperResult is not None
        assert lowerResult is not None
        assert middleResult[0].reservationId == 1
        assert upperResult[0].reservationId == 1
        assert lowerResult[0].reservationId == 1
        mockSession.exec.assert_called()

    def test_fetchReservationStatuses_fetchEmptyReservations_returnEmpty(self):
        mockSession = Mock()
        mockSession.exec.return_value.all.return_value = []
        result = fetch_reservation_statuses(mockSession)
        assert result == []
        mockSession.exec.assert_called()    
    
    def test_createReservation_sufficientHours_returnNewReservation(self):
        mockUser = Mock(**self.userValues)
        mockReservation = Mock(**self.reservationValues)
        mockSession = Mock()
        with patch("api.services.reservations.subtract_user_hours", return_value=4.25):
            result = create_reservation(mockSession, mockReservation, mockUser)
        assert result is not None
        mockSession.add.assert_called_once()
        mockSession.commit.assert_called_once()
    
    def test_createReservation_insufficientHours_returnNone(self):
        mockReservation = Mock(**self.reservationValues)
        mockUser = Mock(**self.insufficentHoursUserValues)
        mockSession = Mock() 
        with patch("api.services.reservations.subtract_user_hours") as mockSubtract:
            result = create_reservation(mockSession, mockReservation, mockUser)
        assert result is None
        mockSubtract.assert_not_called()
        mockSession.add.assert_not_called()

    def test_dropReservation_existingReservation_returnSuccess(self):
        mock_session = Mock()
        user = UserPublic(**self.userValues)
        mock_reservation = Mock(**self.reservationValues)
        mock_session.exec.return_value.one.return_value = mock_reservation
        mock_session.get.return_value = mock_reservation
        with patch("api.services.reservations.calc_hour_diff", return_value=2.0), \
        patch("api.services.reservations.add_user_hours", return_value=8.5):
            result = drop_reservation(mock_session, resId=1, user=user)
        assert result is not None
        assert mock_reservation.reservationStatusId == 2
        mock_session.add.assert_called_once_with(mock_reservation)
        mock_session.commit.assert_called_once()
        mock_session.get.assert_called_once_with(Reservations, 1)

    def test_deleteReservation_existingReservation_returnTrue(self):
        mock_session = Mock()
        mock_reservation = Mock(**self.reservationValues)
    
        with patch("api.services.reservations.convert_res_to_db_model", return_value=mock_reservation):
            mock_session.get.return_value = None
            result = delete_reservation(mock_session, resId=1)

        assert result is True
        mock_session.delete.assert_called_once_with(mock_reservation)
        mock_session.commit.assert_called_once()

    def test_deleteReservation_deleteFailed_returnFalse(self):
        mock_session = Mock()
        mock_reservation = Mock(**self.reservationValues)

        with patch("api.services.reservations.convert_res_to_db_model", return_value=mock_reservation):
            mock_session.get.return_value = mock_reservation
            result = delete_reservation(mock_session, resId=1)

        assert result is False
        mock_session.delete.assert_called_once_with(mock_reservation)
        mock_session.commit.assert_called_once()