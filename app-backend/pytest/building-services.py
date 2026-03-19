import unittest
from unittest.mock import Mock
from api.services.buildings import *

class TestBuildingServices(unittest.TestCase):
    allBuildingValues = [{"buildingName": "Stephens", "buildingId": 1},{"buildingName": "Becker", "buildingId": 2},
                         {"buildingName": "CollaberationCenter", "buildingId": 3}, {"buildingName": "Library", "buildingId": 4}]
    BuildingValues = {"buildingName": "Stephens", "buildingId": 1}

    allBuildingTimeValues = [
    {"buildingName": "Engineering Hall","openTime": "08:00","closeTime": "20:00"},
    {"buildingName": "Science Center","openTime": "09:00","closeTime": "18:00"}]

    def test_fetchBuildings_fetchExistingBuildings_returnInfo(self):
        mockSession = Mock()
        mockBuildings = [Mock(**buildingdata) for buildingdata in self.allBuildingValues]
        mockSession.exec.return_value.all.return_value = mockBuildings
        result = fetch_buildings(mockSession)
        assert result is not None
        assert result[3].buildingName == "Library"
        mockSession.exec.assert_called()

    def test_fetchBuildings_fetchNonExistingBuildings_returnNothing(self):
        mockSession = Mock()
        mockSession.exec.return_value.all.return_value = []
        result = fetch_buildings(mockSession)
        assert result == []
        mockSession.exec.assert_called()

    def test_fetchBuildingtimes_fetchExistingBuildingTimes_returnInfo(self):
        mockBuildings = [Mock(**data) for data in self.allBuildingTimeValues]
        mockSession = Mock()
        mockSession.exec.return_value.all.return_value = mockBuildings
        result = fetch_building_times(mockSession, limit=10)
        assert result is not None
        assert len(result) == 2
        mockSession.exec.assert_called()

    def test_fetchBuildingtimes_fetchNonExistingBuildingTimes_returnNothing(self):
        mockSession = Mock()
        mockSession.exec.return_value.all.return_value = []
        result = fetch_building_times(mockSession, limit=10)
        assert result == []
        mockSession.exec.assert_called()
