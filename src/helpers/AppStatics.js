
const AppStatics = {
    API_BASE_URL: 'https://api.bmore911.com/api',
    DISTRICTS : [
        { 0: { name: 'North', value: 'ND' } },
        { 1: { name: 'West', value: 'WD' } },
        { 2: { name: 'South', value: 'SD' } },
        { 3: { name: 'East', value: 'ED' } },
        { 4: { name: 'North East', value: 'NE' } },
        { 5: { name: 'North West', value: 'NW' } },
        { 6: { name: 'South East', value: 'SE' } },
        { 7: { name: 'South West', value: 'SW' } }
    ],
    PRIORITIES : [
        { 0: { name: 'Non-Emergency', value: 0 } },
        { 1: { name: 'Low', value: 1 } },
        { 2: { name: 'Medium', value: 2 } },
        { 3: { name: 'High', value: 3 } }
    ],
    MAP_STYLE:
        [
            {
                'featureType': 'all',
                'elementType': 'labels',
                'stylers': [
                    {
                        'visibility': 'simplified'
                    },
                    {
                        'color': '#a9a9a9'
                    }
                ]
            },
            {
                'featureType': 'all',
                'elementType': 'labels.icon',
                'stylers': [
                    {
                        'visibility': 'off'
                    }
                ]
            },
            {
                'featureType': 'administrative',
                'elementType': 'all',
                'stylers': [
                    {
                        'visibility': 'simplified'
                    }
                ]
            },
            {
                'featureType': 'administrative',
                'elementType': 'geometry.stroke',
                'stylers': [
                    {
                        'lightness': 17
                    },
                    {
                        'weight': 1.2
                    },
                    {
                        'color': '#5c5c5c'
                    }
                ]
            },
            {
                'featureType': 'administrative',
                'elementType': 'labels.text.fill',
                'stylers': [
                    {
                        'visibility': 'simplified'
                    },
                    {
                        'color': '#5c5c5c'
                    }
                ]
            },
            {
                'featureType': 'administrative.country',
                'elementType': 'labels.text.fill',
                'stylers': [
                    {
                        'color': '#e5c163'
                    }
                ]
            },
            {
                'featureType': 'administrative.locality',
                'elementType': 'labels.text.fill',
                'stylers': [
                    {
                        'color': '#c4c4c4'
                    }
                ]
            },
            {
                'featureType': 'administrative.neighborhood',
                'elementType': 'labels.text.fill',
                'stylers': [
                    {
                        'color': '#e5c163'
                    }
                ]
            },
            {
                'featureType': 'landscape',
                'elementType': 'geometry',
                'stylers': [
                    {
                        'color': '#000106'
                    },
                    {
                        'lightness': '0'
                    }
                ]
            },
            {
                'featureType': 'poi',
                'elementType': 'geometry',
                'stylers': [
                    {
                        'color': '#04071a'
                    },
                    {
                        'lightness': '0'
                    },
                    {
                        'visibility': 'on'
                    }
                ]
            },
            {
                'featureType': 'road.highway',
                'elementType': 'geometry.fill',
                'stylers': [
                    {
                        'color': '#efb509'
                    },
                    {
                        'lightness': '0'
                    }
                ]
            },
            {
                'featureType': 'road.highway',
                'elementType': 'geometry.stroke',
                'stylers': [
                    {
                        'visibility': 'off'
                    }
                ]
            },
            {
                'featureType': 'road.highway',
                'elementType': 'labels.text.fill',
                'stylers': [
                    {
                        'color': '#ffffff'
                    },
                    {
                        'visibility': 'simplified'
                    }
                ]
            },
            {
                'featureType': 'road.highway',
                'elementType': 'labels.text.stroke',
                'stylers': [
                    {
                        'color': '#e5c163'
                    },
                    {
                        'visibility': 'simplified'
                    }
                ]
            },
            {
                'featureType': 'road.arterial',
                'elementType': 'geometry',
                'stylers': [
                    {
                        'color': '#000000'
                    },
                    {
                        'lightness': 18
                    }
                ]
            },
            {
                'featureType': 'road.arterial',
                'elementType': 'geometry.fill',
                'stylers': [
                    {
                        'color': '#00cffa'
                    },
                    {
                        'weight': '0.75'
                    }
                ]
            },
            {
                'featureType': 'road.arterial',
                'elementType': 'labels.text.fill',
                'stylers': [
                    {
                        'color': '#ffffff'
                    },
                    {
                        'visibility': 'on'
                    }
                ]
            },
            {
                'featureType': 'road.arterial',
                'elementType': 'labels.text.stroke',
                'stylers': [
                    {
                        'color': '#2c2c2c'
                    },
                    {
                        'visibility': 'simplified'
                    }
                ]
            },
            {
                'featureType': 'road.local',
                'elementType': 'geometry',
                'stylers': [
                    {
                        'color': '#000000'
                    },
                    {
                        'lightness': '1'
                    },
                    {
                        'weight': '0.15'
                    }
                ]
            },
            {
                'featureType': 'road.local',
                'elementType': 'labels.text.fill',
                'stylers': [
                    {
                        'color': '#ffffff'
                    },
                    {
                        'visibility': 'on'
                    }
                ]
            },
            {
                'featureType': 'road.local',
                'elementType': 'labels.text.stroke',
                'stylers': [
                    {
                        'visibility': 'simplified'
                    }
                ]
            },
            {
                'featureType': 'transit',
                'elementType': 'geometry',
                'stylers': [
                    {
                        'color': '#000000'
                    },
                    {
                        'lightness': '0'
                    }
                ]
            },
            {
                'featureType': 'water',
                'elementType': 'geometry',
                'stylers': [
                    {
                        'color': '#3c3c3c'
                    },
                    {
                        'lightness': '0'
                    }
                ]
            }
        ]
}


export default AppStatics