const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient({ region: 'eu-north-1' });

exports.handler = async () => {
    const params = { TableName: 'BloodStock' };
    try {
        const data = await dynamo.scan(params).promise();
        return { statusCode: 200, body: JSON.stringify(data.Items) };
    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
};
