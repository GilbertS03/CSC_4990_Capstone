import unittest
from unittest.mock import Mock
from api.services.devices import *

class TestDeviceServices(unittest.TestCase):
    singleDeviceValue = {"deviceId": 0,"roomId": 1, "deviceTypeId": 2, "deviceStatusId":0, "positionX":2, "positionY":10}
    allDeviceValues = [{"deviceId": 0, "roomId": 101, "deviceType": "GamingComputer", "deviceStatus": "available"},
                    {"deviceId": 1, "roomId": 101, "deviceType": "GamingComputer", "deviceStatus": "unavailable"},
                    {"deviceId": 2, "roomId": 102, "deviceType": "StandardComputer", "deviceStatus": "Out of Service"},
                    ]
    allPositionValues = [{"deviceId": 0, "roomId": 101, "deviceType": "GamingComputer", "deviceStatus": "available", "positionX" : 10, "positionY" : 15},
                         {"deviceId": 1, "roomId": 101, "deviceType": "GamingComputer", "deviceStatus": "unavailable", "positionX" : 10, "positionY" : 5},
                        {"deviceId": 2, "roomId": 102, "deviceType": "StandardComputer", "deviceStatus": "Out of Service", "positionX" : 5, "positionY" : 15}]

    def test_fetchDevices_fetchExistingDevices_returnInfo(self):
        mockSession = Mock()
        mockDevices = [Mock(**devicedata) for devicedata in self.allDeviceValues]
        mockSession.exec.return_value.all.return_value = mockDevices
        result = fetch_all_devices(mockSession)
        assert result is not None
        assert result[1].deviceType == "GamingComputer"
        mockSession.exec.assert_called()

    def test_fetchDevices_fetchNonExistingDevices_returnNothing(self):
        mockSession = Mock()
        mockSession.exec.return_value.all.return_value = []
        result = fetch_all_devices(mockSession)
        assert result == []
        mockSession.exec.assert_called()
    
    def test_fetchDevicePostion_FetchExistingPostion_returnInfo(self):
        postionlimit = 2
        mockSession = Mock()
        mockDevices = [Mock(**positionData) for positionData in self.allPositionValues]
        mockSession.exec.return_value.all.return_value = mockDevices
        result = fetch_device_positions(mockSession, postionlimit)
        assert result is not None
        assert len(result) == 3
        mockSession.exec.assert_called()

    def test_fetchDevicePostion_FetchNonExistingPostion_returnNothing(self):
        postionlimit = 2
        mockSession = Mock()
        mockSession.exec.return_value.all.return_value = []
        result = fetch_device_positions(mockSession, postionlimit)
        assert result == []
        assert len(result) == 0
        mockSession.exec.assert_called()
    
    def test_createDevice_returnNewDevice(self):
        mockSession = Mock()
        mockDeviceCreate = Mock(**self.singleDeviceValue)
        result = create_device(mockSession, mockDeviceCreate)
        assert result is not None
        mockSession.add.assert_called_once()
        mockSession.commit.assert_called_once()

    def test_editDevicePosition_existingDevice_returnSuccess(self):
        mockSession = Mock()
        mockDevice = Mock(**self.singleDeviceValue)
        result = edit_device_position(mockSession, mockDevice.id, 12, 12)
        assert result is not None
        assert result.positionX == 12
        assert result.positionY == 12
        mockSession.add.assert_called_once()
        mockSession.commit.assert_called_once()

    #TODO: Tests
    #statuses
    #delete devices