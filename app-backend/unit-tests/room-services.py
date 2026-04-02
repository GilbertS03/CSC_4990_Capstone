import unittest
from unittest.mock import Mock
from api.services.rooms import *


class TestRoomServices(unittest.TestCase):
    allRoomValues = [
        {"roomId": 1,   "roomName": "computerLab",  "buildingId": 4, "layoutHeight": 10, "layoutWidth": 10},
        {"roomId": 102, "roomName": "SpartanSpot",  "buildingId": 7, "layoutHeight": 20, "layoutWidth": 15},
        {"roomId": 120, "roomName": "TrueBlu",      "buildingId": 9, "layoutHeight": 30, "layoutWidth": 20},
    ]
    allLayoutValues = [
         {"roomName": "computerLab", "layoutHeight": 10, "layoutWidth": 10,}, 
         {"roomName": "SpartanSpot", "layoutHeight": 20, "layoutWidth": 15},
         {"roomName": "TrueBlu", "layoutHeight": 30, "layoutWidth": 20}
    ]
    allDeviceValues = [
        {"deviceId":1, "deviceStatusId":1},
        {"deviceId":2, "deviceStatusId":1}
    ]
    allDeviceStatusValues = [
        {"deviceStatusId": 1, "roomId": 1, "deviceStatus": "available"},
        {"deviceStatusId": 2, "roomId": 1, "deviceStatus": "not available"}
    ]
    
    def test_fetchRooms_fetchExistingRooms_returnInfo(self):
        mockSession = Mock()
        mockRooms = [Mock(**roomdata) for roomdata in self.allRoomValues]
        mockSession.exec.return_value.all.return_value = mockRooms
        result = fetch_rooms(mockSession)
        assert result is not None
        assert result[2].roomName == "TrueBlu"
        mockSession.exec.assert_called()

    def test_fetchRooms_fetchNonExistingRooms_returnNothing(self):
        mockSession = Mock()
        mockSession.exec.return_value.all.return_value = []
        result = fetch_rooms(mockSession)
        assert result == []
        mockSession.exec.assert_called()

    def test_fetchRoomLayouts_fetchExistingLayouts_returnInfo(self):
        mockSession = Mock()
        mockRooms = [Rooms(**roomdata) for roomdata in self.allLayoutValues]
        mockSession.exec.return_value.all.return_value = mockRooms
        result = fetch_room_layouts(mockSession, limit=3)
        assert result is not None
        assert result[2].layoutHeight == 30
        assert result[2].roomName == "TrueBlu"
        mockSession.exec.assert_called()

    def test_fetchRoomLayouts_fetchNonExistingLayouts_returnNothing(self):
        mockSession = Mock()
        mockSession.exec.return_value.all.return_value = []
        result = fetch_room_layouts(mockSession, limit=1)
        assert result == []
        mockSession.exec.assert_called()

    def test_fetchRoomsByBuildingId_fetchExistingRooms_returnInfo(self):
        mockSession = Mock()
        mockSession.exec.return_value.all.return_value = [{"roomId": 1,   "roomName": "computerLab",  "buildingId": 4, "layoutHeight": 10, "layoutWidth": 10}]
        result = fetch_rooms_by_building(4, mockSession)
        assert result is not None
        assert result[0].roomId == 1
        mockSession.exec.assert_called()

    def test_fetchRoomsByBuildingId_fetchNonExistingRooms_returnNothing(self):
        mockSession = Mock()
        mockSession.exec.return_value.all.return_value = []
        result = fetch_rooms_by_building(4, mockSession)
        assert result == []
        mockSession.exec.assert_called()

    def test_fetchAvailableDeviceCountByRoom_fetchExistingCount_returnInfo(self):
        mockSession = Mock()
        mockSession.exec.return_value.first.return_value = 2
        result = fetch_available_devices_by_room(1, mockSession)
        assert result is not None
        assert result == 2
        mockSession.exec.assert_called()

    def test_fetchAvailableDeviceCountByRoom_fetchNotExistingCount_returnNothing(self):
        mockSession = Mock()
        mockSession.exec.return_value.first.return_value = None
        result = fetch_available_devices_by_room(102, mockSession)
        assert result is None
        mockSession.exec.assert_called()