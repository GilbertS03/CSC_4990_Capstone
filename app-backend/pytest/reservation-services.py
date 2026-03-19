import unittest
from unittest.mock import Mock
from api.services.reservations import *
from datetime import datetime

class TestReservationServices(unittest.TestCase):
    allReservationValues = [
    {"reservationId": 1,"userId": 1,"deviceId": 3,"reservationStatusId": 1,"status" : "active","startTime": 
     datetime(2025, 1, 15, 9, 0, 0),"endTime": datetime(2025, 1, 15, 11, 0, 0)},
    {"reservationId": 2,"userId": 2,"deviceId": 5,"reservationStatusId": 2,"status" : "cancelled","startTime": 
     datetime(2025, 1, 16, 14, 0, 0),"endTime": datetime(2025, 1, 16, 16, 0, 0)}]

    def test_fetchAllReservations_fetchExistingReservations_returnInfo(self):
        mockReservations = [Mock(**reservationData) for reservationData in self.allReservationValues]
        mockSession = Mock()
        mockSession.exec.return_value.all.return_value = mockReservations
        result = fetch_all_reservations(mockSession)
        print("fetchAllReservations_returnInfo Result:", result[1].reservationId)
        assert result is not None
        assert result[1].reservationId == 2
        mockSession.exec.assert_called()

    def test_fetchAllReservations_fetchNonExistingReservations_returnNothing(self):
        mockSession = Mock()
        mockSession.exec.return_value.all.return_value = []
        result = fetch_all_reservations(mockSession)
        assert result == []
        mockSession.exec.assert_called()   

    def test_fetchDeviceStatus_fetchExisitingReservation_returnInfo(self):
        mockReservations = [Mock(**data) for data in self.allReservationValues]
        mockSession = Mock()
        mockSession.exec.return_value.all.return_value = mockReservations
        result = fetch_reservation_statuses(mockSession)
        assert result is not None
        assert result[1].reservationId == 2
        assert len(result) == 2
        mockSession.exec.assert_called()

        ##FilterConstraints might not be working correctly here
    def test_fetchDeviceStatus_userid_fetchExisitingReservation_returnInfo(self):
        mockReservations = [Mock(**data) for data in self.allReservationValues]
        mockSession = Mock()
        mockSession.exec.return_value.all.return_value = mockReservations
        result = fetch_reservation_statuses(mockSession, 1,)
        print("userid_fetchReservationStatuses_returnInfo Result:", result)
        assert result is not None
        assert result[1].reservationId == 2
        assert len(result) == 2
        mockSession.exec.assert_called()

    def test_fetchReservationStatuses_fetchEmptyReservations_returnEmpty(self):
        mockSession = Mock()
        mockSession.exec.return_value.all.return_value = []
        result = fetch_reservation_statuses(mockSession)
        print("fetchReservationStatuses_returnEmpty Result:", result)
        assert result == []
        mockSession.exec.assert_called()    