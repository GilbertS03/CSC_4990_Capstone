import unittest
from unittest.mock import Mock
from api.services.settings import *

class TestSettingsServices(unittest.TestCase):
    allSettingsValues = [{"settingName": "studentWeeklyLimit", "settingValue": 20},
                         {"settingName": "facultyWeeklyLimit", "settingValue": 50}]

    def test_fetchSettings_fetchExistingSettings_returnAll(self):
        mockSettings = [Mock(**data) for data in self.allSettingsValues]
        mockSession = Mock()

        mockSession.exec.return_value.all.return_value = mockSettings

        result = fetch_settings(mockSession)

        self.assertIsNotNone(result)
        self.assertEqual(len(result), 2)
        mockSession.exec.assert_called_once()

    def test_fetchSettings_fetchEmptySettings_returnEmpty(self):
        mockSession = Mock()

        mockSession.exec.return_value.all.return_value = []

        result = fetch_settings(mockSession)

        self.assertEqual(result, [])
        mockSession.exec.assert_called_once()

    def test_fetchSettingValueByName_fetchExistingSetting_returnValue(self):
        mockSetting = Mock(settingName="studentWeeklyLimit", settingValue=20)
        mockSession = Mock()

        mockSession.exec.return_value.one_or_none.return_value = mockSetting

        result = fetch_settingValue_by_name(mockSession, "studentWeeklyLimit")

        self.assertEqual(result, 20)
        mockSession.exec.assert_called_once()

    def test_fetchSettingValueByName_fetchNonExistingSetting_returnError(self):
        mockSession = Mock()
        mockSession.exec.return_value.one_or_none.return_value = None
        
        self.assertIsNone(fetch_settingValue_by_name(mockSession, "nonExistentSetting"))

    def test_updateSettingValue_updateExistingSetting_returnUpdated(self):
        mockSetting = Mock(settingName="studentWeeklyLimit", settingValue=20)
        mockSession = Mock()

        mockSession.exec.return_value.one_or_none.return_value = mockSetting

        result = update_settingValue(mockSession, "studentWeeklyLimit", 30)

        self.assertIsNotNone(result)
        self.assertEqual(result.settingValue, 30)
        mockSession.add.assert_called_once_with(mockSetting)
        mockSession.commit.assert_called_once()

    def test_updateSettingValue_updateNonExistingSetting_returnNone(self):
        mockSession = Mock()

        mockSession.exec.return_value.one_or_none.return_value = None

        result = update_settingValue(mockSession, "nonExistentSetting", 30)

        self.assertIsNone(result)
        mockSession.add.assert_not_called()
        mockSession.commit.assert_not_called()