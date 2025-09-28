export const SearchInOptions = [
    { Text: 'Charging Station', Value: 'Charging Station' },
    { Text: 'Site', Value: 'Site' },
];
export const TemplateSearchInOptions = [
    {Text: 'TemplateName', Value:'TemplateName'}
]
export const FILTER_KEY = {
    Organization : 'Organization',
    Sites : 'Sites',
    SiteAreas : 'Site Areas',
    ChargingStation : 'Charging Station',
    ChargerId: 'ChargerId',
    Offset : 'Offset',
    ChargerType : 'ChargerType',
    ChargerPurpose:'ChargerPurpose',
    ChargerPurposeKind:'ChargerPurposeKind',
    ReccuranceType : 'ReccuranceType'
}

export const ORGANISATION_Label_KEYS = {
    OrganizationName : 'Organization Name',
    Address : 'Address (optional)',
    Country : 'Country',
    State : 'State (optional)',
    City : 'City',
    Region : 'Region (optional)',
    Department : 'Department (optional)',
    ContactPerson : 'Contact Person (optional)',
    ContactDetail : 'Contact Detail (optional)'
}
export const ORGANISATION_KEYS = {
    OrganizationName : 'orgName',
    Address : 'address',
    Country : 'country',
    State : 'state',
    City : 'city',
    Region : 'region',
    Department : 'dept',
    ContactPerson : 'contactPerson',
    ContactDetail : 'contactDetail',
    UploadFile : 'uploadedFile'
}
export const CountryOptions = [
    { Text: 'United States', Value: 'USA' },
    { Text: 'Canada', Value: 'CA' },
    { Text: 'United Kingdom', Value: 'UK' },
    { Text: 'Australia', Value: 'AU' },
    { Text: 'Germany', Value: 'DE' },
    { Text: 'France', Value: 'FR' },
    { Text: 'Japan', Value: 'JP' },
    { Text: 'India', Value: 'IN' },
    { Text: 'Brazil', Value: 'BR' },
    { Text: 'South Africa', Value: 'ZA' },
];
export const StateOptions = [
    { Text: 'California', Value: 'CA' },
    { Text: 'Texas', Value: 'TX' },
    { Text: 'New York', Value: 'NY' },
    { Text: 'Florida', Value: 'FL' },
    { Text: 'Illinois', Value: 'IL' },
    { Text: 'Pennsylvania', Value: 'PA' },
    { Text: 'Ohio', Value: 'OH' },
    { Text: 'Georgia', Value: 'GA' },
    { Text: 'North Carolina', Value: 'NC' },
    { Text: 'Michigan', Value: 'MI' },
];
export const OhioCityOptions = [
    { Text: 'Columbus', Value: 'Columbus' },
    { Text: 'Cleveland', Value: 'Cleveland' },
    { Text: 'Cincinnati', Value: 'Cincinnati' },
    { Text: 'Toledo', Value: 'Toledo' },
    { Text: 'Akron', Value: 'Akron' },
    { Text: 'Dayton', Value: 'Dayton' },
    { Text: 'Parma', Value: 'Parma' },
    { Text: 'Canton', Value: 'Canton' },
    { Text: 'Youngstown', Value: 'Youngstown' },
    { Text: 'Lorain', Value: 'Lorain' },
];

export const TABS = {
    Organization : 'Organization',
    SiteAndSiteArea:'Site & Site Area'
}
export const SITE_LABEL = {
    SiteName : 'Site Name',
    PostalCode : 'Postal Code',
    Latitude : 'Latitude',
    Longitude : 'Longitude',
    ContactNumber : 'Contact Number (optional)',
    AlternateNumber : 'Alternate Number (optional)',
    EmailID : 'Email ID (optional)',
}
export const SITEAREA_LABEL = {
    SiteAreaName : 'Site Area Name',
    SmartCharging : 'Smart Charging Available',
    Voltage : 'Voltage',
    NumberOfPhase : 'Number of Phases',
    MaxCurrent : 'Max Current per Phase',
    TotalCurrent : 'Max Total Current',
    MapPower : 'Max Power',
    ChargingPlan : 'Charging Plan'
}
export const BUTTON_TEXT = {
    RemoveSite : 'Remove Site',
    AddSite : 'Add another sites',
    AddSiteArea: 'Add another siteArea',
    SiteArea : 'Add SiteArea',
    RemoveSiteArea : 'Remove SiteArea'
}
export const STATIC_TEXT = {
    AddSite :'Add Site',
    OrgName : 'Organization Name',
    OrgID : 'Organization ID'
}
export const GETCHARGING_STATUS_URL = 'https://dev-v11.aielectron.ai/ChargeEv/GetChargingStatus';
export const CHARGING_ERROR_MSG = "Please ensure the charger is plugged in before attempting to start remote charging";

export const OFFSET_FILTER_OPTIONS = [
    { Text: 'Current Month', Value: 'currentmonth' },
    { Text: '3 Month', Value: '3month' },
    { Text: '6 Month', Value: '6month' }
];
export const ERROR_MSG = 'The end date cannot be earlier than the start date. Please select a valid date range.'