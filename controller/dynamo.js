var AWS = require("aws-sdk");

function updateAWSConfig() {
    AWS.config.update({
        region: "us-east-2",
        endpoint: "dynamodb.us-east-2.amazonaws.com"
    });
}

function createTable() {

    updateAWSConfig();

    var dynamodb = new AWS.DynamoDB();

    var params = {
        TableName: "Musics",
        KeySchema: [
            { AttributeName: "year", KeyType: "HASH" },
            { AttributeName: "title", KeyType: "RANGE" }
        ],
        AttributeDefinitions: [
            { AttributeName: "year", AttributeType: "N" },
            { AttributeName: "title", AttributeType: "S" }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 10,
            WriteCapacityUnits: 10
        }
    }

    return new Promise((resolve, reject) => {

        dynamodb.createTable(params, function (err, data) {
            if (err) {
                console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
                reject({ message: err });
            } else {
                console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
                resolve({ message: data });
            }
        });

    });

}

function insertData(tableName, year, titleName, info) {
    updateAWSConfig();

    var docClient = new AWS.DynamoDB.DocumentClient();

    var params = {
        TableName: tableName,
        Item: {
            "year": year,
            "title": titleName,
            "info": {
                "plot": info.plot,
                "rating": info.rating
            }
        }
    };

    console.log("Adding a new item...");

    return new Promise((resolve, reject) => {

        docClient.put(params, function (err, data) {
            if (err) {
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                reject({ message: err })
            } else {
                console.log("Added item:", JSON.stringify(data, null, 2));
                resolve({ message: data });
            }
        });

    });

}

function readData(tableName, year, titleName) {

    updateAWSConfig();

    var docClient = new AWS.DynamoDB.DocumentClient();

    var params = {
        TableName: tableName,
        Key: {
            "year": year,
            "title": titleName
        }
    };

    return new Promise((resolve, reject) => {

        docClient.get(params, function (err, data) {
            if (err) {
                console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
                reject({ message: err })
            } else {
                console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
                resolve({ message: data });
            }
        });

    });

}

function updateData(tableName, year, titleName) {
    updateAWSConfig();

    var docClient = new AWS.DynamoDB.DocumentClient();

    var params = {
        TableName: tableName,
        Key: {
            "year": year,
            "title": titleName
        },
        UpdateExpression: "set info.rating = :r, info.plot=:p, info.actors=:a",
        ExpressionAttributeValues: {
            ":r": 5.5,
            ":p": "Everything happens all at once.",
            ":a": ["Larry", "Moe", "Curly"]
        },
        ReturnValues: "UPDATED_NEW"
    };

    console.log("Updating the item...");
    return new Promise((resolve, reject) => {

        docClient.update(params, function (err, data) {
            if (err) {
                console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                reject({ message: err });
            } else {
                console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                resolve({ message: data });
            }
        });

    });
}

function deleteData(tableName, year, titleName) {
    updateAWSConfig();

    var docClient = new AWS.DynamoDB.DocumentClient();

    var params = {
        TableName: tableName,
        Key: {
            "year": year,
            "title": titleName
        }
    }

    console.log("Attempting a conditional delete...");
    return new Promise((resolve, reject) => {

        docClient.delete(params, function(err, data) {
            if (err) {
                console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
                reject({ message: err });
            } else {
                console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
                resolve({ message: data });
            }
        });
    });
}

module.exports = {
    createTable,
    insertData,
    readData,
    updateData,
    deleteData
};