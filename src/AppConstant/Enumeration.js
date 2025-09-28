import ActiveSessionTable from "../components/sessions/ActiveSessionTable";

export const ACTION_TYPE = {
    GetChargingStations: 'GetChargingStations',
    GetStationDetails: 'GetStationDetails',
    Heartbeat: 'Heartbeat',
    RemoteStartTransaction: 'RemoteStartTransaction',
    RemoteStopTransaction: 'RemoteStopTransaction',
    GetAllActiveSessions: 'GetAllActiveSessions',
    GetSessionsHistory: 'GetSessionsHistorys',
    GetOrganisation: 'GetOrganisation',
    GetChargingStatus: 'GetChargingStatus',
    AddOrganisationData: 'AddOrganisationData',
    SetChargingProfile: 'SetChargingProfile',
    SetChargerProfile: 'SetChargerProfile',
    GetSessionAnalyticsData: 'GetSessionAnalyticsData',
    GetChargerProfileTemplate : 'GetChargerProfileTemplate',
    CreateChargerProfileTemplate : 'CreateChargerProfileTemplate',
    UpdateChargerProfileTemplate : 'UpdateChargerProfileTemplate',
    DeleteChargerProfileTemplate : 'DeleteChargerProfileTemplate',
    ChangeAvailability : 'ChangeAvailability',
    ClearChargingProfile : 'ClearChargingProfile'
}
export const ACTION = {
    Get: 'GET',
    Post: 'POST',
    Put: 'PUT',
    Patch: 'PATCH'
}
export const STATUS_MSG = {
    SUCCESS: 'Success',
    ERROR: 'ERROR'
}
export const GOOGLE_API_KEY = "AIzaSyA1aDTfFe3GfKdRcrdj4txAWUcv3zZukRE";
export const CHARGER_STATUS = {
    Available: 'Available',
    InUse: 'In Use',
    Busy: 'Busy',
    Offline: 'Offline',
    Online: 'Online',
    Preparing: 'Preparing'
}
export const CONNECTOR_STATUS = {
    Accepted: 'Accepted',
    Rejected: 'Rejected',
}
export const CONNECTOR_RAEL_STATUS = {
    Accepted: 'Accepted',
    Preparing: 'Preparing',
    Charging: 'Charging',
    SuspendedEV: 'Suspended EV',
    SuspendedEVSE: 'Suspended EVSE',
    Finishing: 'Finishing',
    Reserved: 'Reserved',
    Faulted: 'Faulted'
}
export const GLOBALCONTEXT_KEY = {
    ChargingStations: 'chargingStations',
    SessionHistoryCount: 'SessionHistoryCount',
    SessionHistoryDuration: 'SessionHistoryDuration',
    SessionTotalConsumption: 'SessionTotalConsumption',
    SessionTotalRevenue: 'SessionTotalRevenue',
    ActiveSessions: 'ActiveSessions',
    SessionHistory: 'SessionHistory',
    TotalCapacity: 'TotalCapacity',
    InUsePower: 'InUsePower',
    InUsePowerPercent: 'InUsePowerPercent',
    TotalConsumption: 'TotalConsumption',
    SessionMinTime: 'SessionMinTime',
    SessionMaxTime: 'SessionMaxTime',
    Weekend: 'Weekend',
    WeekDays: 'WeekDays',
    AvgSessionPerDay: 'AvgSessionPerDay'
}
export const CHARGER_PROFILING_KEYS = {
    Limit: 'limit',
    ChargingRateUnit: 'ChargingRateUnit'
}
export const ACCESS_TYPE = {
    Public: 'Public',
    Private: 'Private'
}
export const DATA_FILTER_KEY = {
    WeekDays: 'WeekDays',
    Weekend: 'Weekend'
}

export const WeekDays = {
    Monday: 'Monday',
    Tuesday: 'Tuesday',
    Wednesday: 'Wednesday',
    Thrusday: 'Thrusday',
    Friday: 'Friday'
}
export const WeekendDays = {
    Saturday: 0,
    Sunday: 6
}

export const LOGIN_KEYS = {
    UserName: 'UserName',
    Password: 'Password'
}

export const COMMON_TEXT = {
    StartDate: "StartDate",
    EndDate: "EndDate"
}

export const CONTROLLER_NAME = {
    Operation: 'Operation',
    Command: 'Command',
    Sessions: 'Sessions',
    ChargingProfile: 'ChargingProfile',
    GISService: 'GISService'
}
export const ENVIRONMENT = {
    Developemnt : 'dev',
    Qaulity : 'qa',
    UAT : 'uat'
}

export const ENVIRONMENT_BASE_URL = {
    OCPP_DEV : 'https://dev.aielectron.ai/Ocpp/v1',
    OCPP_QA : 'https://qa.aielectron.ai/Ocpp/v1',
    OCPP_UAT: 'https://uat.aielectron.ai/Ocpp/v1',
    BASE_DEV : 'https://dev-v11.aielectron.ai',
    BASE_QA : 'https://qa-v11.aielectron.ai',
    BASE_UAT : 'https://uat.aielectron.ai'
}

export const CHARGER_PROFILE = {
    ChargerDefaultProfile : 'TxDefaultProfile',
    ChargerMaxProfile : 'ChargePointMaxProfile'
}