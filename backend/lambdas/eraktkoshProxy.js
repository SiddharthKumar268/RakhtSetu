const https = require('https');

// Real Indian States and Districts Data
const INDIAN_STATES = [
    { state_id: '1', state_name: 'Andhra Pradesh' },
    { state_id: '2', state_name: 'Arunachal Pradesh' },
    { state_id: '3', state_name: 'Assam' },
    { state_id: '4', state_name: 'Bihar' },
    { state_id: '5', state_name: 'Chhattisgarh' },
    { state_id: '6', state_name: 'Goa' },
    { state_id: '7', state_name: 'Gujarat' },
    { state_id: '8', state_name: 'Haryana' },
    { state_id: '9', state_name: 'Himachal Pradesh' },
    { state_id: '10', state_name: 'Jharkhand' },
    { state_id: '11', state_name: 'Karnataka' },
    { state_id: '12', state_name: 'Kerala' },
    { state_id: '13', state_name: 'Madhya Pradesh' },
    { state_id: '14', state_name: 'Maharashtra' },
    { state_id: '15', state_name: 'Manipur' },
    { state_id: '16', state_name: 'Meghalaya' },
    { state_id: '17', state_name: 'Mizoram' },
    { state_id: '18', state_name: 'Nagaland' },
    { state_id: '19', state_name: 'Odisha' },
    { state_id: '20', state_name: 'Punjab' },
    { state_id: '21', state_name: 'Rajasthan' },
    { state_id: '22', state_name: 'Sikkim' },
    { state_id: '23', state_name: 'Tamil Nadu' },
    { state_id: '24', state_name: 'Telangana' },
    { state_id: '25', state_name: 'Tripura' },
    { state_id: '26', state_name: 'Uttar Pradesh' },
    { state_id: '27', state_name: 'Uttarakhand' },
    { state_id: '28', state_name: 'West Bengal' },
    { state_id: '29', state_name: 'Delhi' }
];

const DISTRICTS_BY_STATE = {
    '1': [ // Andhra Pradesh
        { district_id: '1', district_name: 'Visakhapatnam' },
        { district_id: '2', district_name: 'Vijayawada' },
        { district_id: '3', district_name: 'Guntur' },
        { district_id: '4', district_name: 'Nellore' },
        { district_id: '5', district_name: 'Tirupati' }
    ],
    '2': [ // Arunachal Pradesh
        { district_id: '1', district_name: 'Itanagar' },
        { district_id: '2', district_name: 'Tawang' },
        { district_id: '3', district_name: 'Ziro' },
        { district_id: '4', district_name: 'Pasighat' },
        { district_id: '5', district_name: 'Bomdila' }
    ],
    '3': [ // Assam
        { district_id: '1', district_name: 'Guwahati' },
        { district_id: '2', district_name: 'Dibrugarh' },
        { district_id: '3', district_name: 'Silchar' },
        { district_id: '4', district_name: 'Jorhat' },
        { district_id: '5', district_name: 'Tezpur' }
    ],
    '4': [ // Bihar
        { district_id: '1', district_name: 'Patna' },
        { district_id: '2', district_name: 'Gaya' },
        { district_id: '3', district_name: 'Bhagalpur' },
        { district_id: '4', district_name: 'Muzaffarpur' },
        { district_id: '5', district_name: 'Darbhanga' }
    ],
    '5': [ // Chhattisgarh
        { district_id: '1', district_name: 'Raipur' },
        { district_id: '2', district_name: 'Bilaspur' },
        { district_id: '3', district_name: 'Durg' },
        { district_id: '4', district_name: 'Korba' },
        { district_id: '5', district_name: 'Rajnandgaon' }
    ],
    '6': [ // Goa
        { district_id: '1', district_name: 'Panaji' },
        { district_id: '2', district_name: 'Margao' },
        { district_id: '3', district_name: 'Vasco da Gama' },
        { district_id: '4', district_name: 'Mapusa' },
        { district_id: '5', district_name: 'Ponda' }
    ],
    '7': [ // Gujarat
        { district_id: '1', district_name: 'Ahmedabad' },
        { district_id: '2', district_name: 'Surat' },
        { district_id: '3', district_name: 'Vadodara' },
        { district_id: '4', district_name: 'Rajkot' },
        { district_id: '5', district_name: 'Gandhinagar' }
    ],
    '8': [ // Haryana
        { district_id: '1', district_name: 'Gurugram' },
        { district_id: '2', district_name: 'Faridabad' },
        { district_id: '3', district_name: 'Panchkula' },
        { district_id: '4', district_name: 'Ambala' },
        { district_id: '5', district_name: 'Karnal' }
    ],
    '9': [ // Himachal Pradesh
        { district_id: '1', district_name: 'Shimla' },
        { district_id: '2', district_name: 'Manali' },
        { district_id: '3', district_name: 'Dharamshala' },
        { district_id: '4', district_name: 'Kullu' },
        { district_id: '5', district_name: 'Solan' }
    ],
    '10': [ // Jharkhand
        { district_id: '1', district_name: 'Ranchi' },
        { district_id: '2', district_name: 'Jamshedpur' },
        { district_id: '3', district_name: 'Dhanbad' },
        { district_id: '4', district_name: 'Bokaro' },
        { district_id: '5', district_name: 'Deoghar' }
    ],
    '11': [ // Karnataka
        { district_id: '1', district_name: 'Bengaluru' },
        { district_id: '2', district_name: 'Mysuru' },
        { district_id: '3', district_name: 'Mangaluru' },
        { district_id: '4', district_name: 'Hubballi' },
        { district_id: '5', district_name: 'Belagavi' }
    ],
    '12': [ // Kerala
        { district_id: '1', district_name: 'Thiruvananthapuram' },
        { district_id: '2', district_name: 'Kochi' },
        { district_id: '3', district_name: 'Kozhikode' },
        { district_id: '4', district_name: 'Thrissur' },
        { district_id: '5', district_name: 'Kollam' }
    ],
    '13': [ // Madhya Pradesh
        { district_id: '1', district_name: 'Bhopal' },
        { district_id: '2', district_name: 'Indore' },
        { district_id: '3', district_name: 'Gwalior' },
        { district_id: '4', district_name: 'Jabalpur' },
        { district_id: '5', district_name: 'Ujjain' }
    ],
    '14': [ // Maharashtra
        { district_id: '1', district_name: 'Mumbai' },
        { district_id: '2', district_name: 'Pune' },
        { district_id: '3', district_name: 'Nagpur' },
        { district_id: '4', district_name: 'Nashik' },
        { district_id: '5', district_name: 'Aurangabad' }
    ],
    '15': [ // Manipur
        { district_id: '1', district_name: 'Imphal' },
        { district_id: '2', district_name: 'Thoubal' },
        { district_id: '3', district_name: 'Bishnupur' },
        { district_id: '4', district_name: 'Churachandpur' },
        { district_id: '5', district_name: 'Ukhrul' }
    ],
    '16': [ // Meghalaya
        { district_id: '1', district_name: 'Shillong' },
        { district_id: '2', district_name: 'Tura' },
        { district_id: '3', district_name: 'Jowai' },
        { district_id: '4', district_name: 'Nongpoh' },
        { district_id: '5', district_name: 'Nongstoin' }
    ],
    '17': [ // Mizoram
        { district_id: '1', district_name: 'Aizawl' },
        { district_id: '2', district_name: 'Lunglei' },
        { district_id: '3', district_name: 'Champhai' },
        { district_id: '4', district_name: 'Serchhip' },
        { district_id: '5', district_name: 'Kolasib' }
    ],
    '18': [ // Nagaland
        { district_id: '1', district_name: 'Kohima' },
        { district_id: '2', district_name: 'Dimapur' },
        { district_id: '3', district_name: 'Mokokchung' },
        { district_id: '4', district_name: 'Tuensang' },
        { district_id: '5', district_name: 'Wokha' }
    ],
    '19': [ // Odisha
        { district_id: '1', district_name: 'Bhubaneswar' },
        { district_id: '2', district_name: 'Cuttack' },
        { district_id: '3', district_name: 'Rourkela' },
        { district_id: '4', district_name: 'Berhampur' },
        { district_id: '5', district_name: 'Sambalpur' }
    ],
    '20': [ // Punjab
        { district_id: '1', district_name: 'Chandigarh' },
        { district_id: '2', district_name: 'Ludhiana' },
        { district_id: '3', district_name: 'Amritsar' },
        { district_id: '4', district_name: 'Jalandhar' },
        { district_id: '5', district_name: 'Patiala' }
    ],
    '21': [ // Rajasthan
        { district_id: '1', district_name: 'Jaipur' },
        { district_id: '2', district_name: 'Jodhpur' },
        { district_id: '3', district_name: 'Udaipur' },
        { district_id: '4', district_name: 'Kota' },
        { district_id: '5', district_name: 'Ajmer' }
    ],
    '22': [ // Sikkim
        { district_id: '1', district_name: 'Gangtok' },
        { district_id: '2', district_name: 'Namchi' },
        { district_id: '3', district_name: 'Gyalshing' },
        { district_id: '4', district_name: 'Mangan' },
        { district_id: '5', district_name: 'Rangpo' }
    ],
    '23': [ // Tamil Nadu
        { district_id: '1', district_name: 'Chennai' },
        { district_id: '2', district_name: 'Coimbatore' },
        { district_id: '3', district_name: 'Madurai' },
        { district_id: '4', district_name: 'Tiruchirappalli' },
        { district_id: '5', district_name: 'Salem' }
    ],
    '24': [ // Telangana
        { district_id: '1', district_name: 'Hyderabad' },
        { district_id: '2', district_name: 'Warangal' },
        { district_id: '3', district_name: 'Nizamabad' },
        { district_id: '4', district_name: 'Karimnagar' },
        { district_id: '5', district_name: 'Khammam' }
    ],
    '25': [ // Tripura
        { district_id: '1', district_name: 'Agartala' },
        { district_id: '2', district_name: 'Udaipur' },
        { district_id: '3', district_name: 'Dharmanagar' },
        { district_id: '4', district_name: 'Kailashahar' },
        { district_id: '5', district_name: 'Belonia' }
    ],
    '26': [ // Uttar Pradesh
        { district_id: '1', district_name: 'Lucknow' },
        { district_id: '2', district_name: 'Kanpur' },
        { district_id: '3', district_name: 'Agra' },
        { district_id: '4', district_name: 'Varanasi' },
        { district_id: '5', district_name: 'Noida' }
    ],
    '27': [ // Uttarakhand
        { district_id: '1', district_name: 'Dehradun' },
        { district_id: '2', district_name: 'Haridwar' },
        { district_id: '3', district_name: 'Nainital' },
        { district_id: '4', district_name: 'Rishikesh' },
        { district_id: '5', district_name: 'Roorkee' }
    ],
    '28': [ // West Bengal
        { district_id: '1', district_name: 'Kolkata' },
        { district_id: '2', district_name: 'Howrah' },
        { district_id: '3', district_name: 'Siliguri' },
        { district_id: '4', district_name: 'Durgapur' },
        { district_id: '5', district_name: 'Asansol' }
    ],
    '29': [ // Delhi
        { district_id: '1', district_name: 'Central Delhi' },
        { district_id: '2', district_name: 'East Delhi' },
        { district_id: '3', district_name: 'New Delhi' },
        { district_id: '4', district_name: 'North Delhi' },
        { district_id: '5', district_name: 'South Delhi' }
    ]
};

exports.handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    };

    if (event.requestContext.http.method === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        const params = event.queryStringParameters || {};
        const reqType = params.reqType || '';
        
        console.log('Request type:', reqType);
        console.log('Parameters:', JSON.stringify(params));

        // Return dummy data based on request type
        const data = getFallbackData(reqType, params);
        
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(data)
        };
        
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
                error: true,
                message: error.message 
            })
        };
    }
};

function getFallbackData(reqType, params) {
    console.log('Generating data for:', reqType);
    
    // Get all states
    if (reqType === 'getAllStates') {
        return INDIAN_STATES;
    }
    
    // Get districts by state
    if (reqType === 'getDistrictByState') {
        const stateId = params.stateId;
        return DISTRICTS_BY_STATE[stateId] || [];
    }
    
    // Get blood stock availability
    if (reqType === 'getStockAvailability') {
        const bloodGroup = params.bloodGroup;
        
        // Generate realistic blood stock data
        const bloodGroupMap = {
            '1': 'A+', '2': 'A-', '3': 'B+', '4': 'B-',
            '5': 'AB+', '6': 'AB-', '7': 'O+', '8': 'O-'
        };
        
        // If specific blood group requested
        if (bloodGroup && bloodGroupMap[bloodGroup]) {
            const units = Math.floor(Math.random() * 150) + 50;
            return [{
                bloodGroup: bloodGroupMap[bloodGroup],
                availableUnits: units,
                lastUpdated: new Date().toISOString()
            }];
        }
        
        // Return all blood groups with realistic availability
        return [
            { bloodGroup: 'A+', availableUnits: Math.floor(Math.random() * 100) + 100 },
            { bloodGroup: 'A-', availableUnits: Math.floor(Math.random() * 50) + 20 },
            { bloodGroup: 'B+', availableUnits: Math.floor(Math.random() * 100) + 80 },
            { bloodGroup: 'B-', availableUnits: Math.floor(Math.random() * 40) + 15 },
            { bloodGroup: 'AB+', availableUnits: Math.floor(Math.random() * 80) + 50 },
            { bloodGroup: 'AB-', availableUnits: Math.floor(Math.random() * 30) + 10 },
            { bloodGroup: 'O+', availableUnits: Math.floor(Math.random() * 150) + 150 },
            { bloodGroup: 'O-', availableUnits: Math.floor(Math.random() * 50) + 30 }
        ];
    }
    
    return { error: true, message: 'Unknown request type: ' + reqType };
}