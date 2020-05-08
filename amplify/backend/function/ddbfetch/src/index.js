'use strict';

var AWS = require('aws-sdk');
AWS.config.update({region: 'eu-west-1'});

// Create DynamoDB service object
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

var params = {
    //ExpressionAttributeValues: {':ts'},
    ExpressionAttributeValues: {':y': {S: 'y'}, ':ts': {N: '1585699200'}},
    IndexName: 'allts',
    TableName: 'rssaws',
    KeyConditionExpression: "allts = :y and timest > :ts",
};
    
ddb.query(params, function(err, data) {
if (err) {
    console.log("Error", err);
} else {
    data.Items.forEach(function(element, index, array) {
        console.log(element.timest.S + " " + element.source.S + " " + element.title.S );
    });
}
});