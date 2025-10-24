const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient({ region: 'eu-north-1' });

exports.handler = async (event) => {
    const donor = JSON.parse(event.body);
    const params = { TableName: 'Donors', Item: { donorId: Date.now().toString(), ...donor } };

    try {
        await dynamo.put(params).promise();
        return { statusCode: 200, body: JSON.stringify({ message: 'Donor Registered' }) };
    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
};
