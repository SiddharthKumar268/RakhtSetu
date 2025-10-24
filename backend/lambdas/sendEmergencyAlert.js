const AWS = require('aws-sdk');
const sns = new AWS.SNS({ region: 'eu-north-1' });

exports.handler = async (event) => {
    const { phone, message } = JSON.parse(event.body);
    try {
        await sns.publish({ Message: message, PhoneNumber: phone }).promise();
        return { statusCode: 200, body: JSON.stringify({ message: 'Alert sent!' }) };
    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
};
