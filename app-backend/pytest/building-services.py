import unittest
from unittest.mock import Mock
from api.services.buildings import *

class TestBuildingServices(unittest.TestCase):
    allBuildingValues = [{"buildingName": "Stephens", "buildingId": 1},{"buildingName": "Becker", "buildingId": 2},
                         {"buildingName": "CollaberationCenter", "buildingId": 3}, {"buildingName": "Library", "buildingId": 4}]
    BuildingValues = {"buildingName": "Stephens", "buildingId": 1}

    def test_fetchBuildings_fetchExistingbuildings_returnInfo(self):
        mockSession = Mock()
        mockBuildings = [Mock(**buildingdata) for buildingdata in self.allBuildingValues]
        mockSession.exec.return_value.all.return_value = mockBuildings
        result = fetch_buildings(mockSession)
        print("fetchBuildings_returnInfo result: ", result[1])
        assert result is not None
        assert result[3].buildingName == "Library"
        mockSession.exec.assert_called()

    def test_fetchBuildings_fetchNonExistingbuildings_returnNothing(self):
        mockSession = Mock()
        mockSession.exec.return_value.all.return_value = []
        result = fetch_buildings(mockSession)
        print("fetchBuildings_returnInfo result: ", result)
        assert result == []
        mockSession.exec.assert_called()
