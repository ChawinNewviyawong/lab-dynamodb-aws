var app = require('express').Router();
var dynamo = require('../controller/dynamo');

app.get('/createTable', (req, res, next) => {

    dynamo.createTable().then((result) => {
        res.status(201);
        res.json(result.message);
    })
        .catch((error) => {
            console.error(`Unable to create table. Error JSON: ${error}`);
            res.status(500);
            res.json({
                code: 500,
                message: `Unable to create table. Error JSON: ${error}`
            });
        });

});

app.post('/insertData', (req, res, next) => {

    dynamo.insertData(req.body.tableName, req.body.year, req.body.titleName, req.body.info).then((result) => {
        res.status(201);
        res.json(result.message);
    })
        .catch((error) => {
            console.error(`Unable to add item. Error JSON: ${error} `);
            res.status(500);
            res.json({
                code: 500,
                message: `Unable to add item. Error JSON: ${error}`
            });
        });
});

app.post('/readData', (req, res, next) => {

    dynamo.readData(req.body.tableName, req.body.year, req.body.titleName).then((result) => {
        res.status(201);
        res.json(result.message);
    })
        .catch((error) => {
            console.error(`Unable to read item. Error JSON: ${error} `);
            res.status(500);
            res.json({
                code: 500,
                message: `Unable to read item. Error JSON: ${error}`
            });
        });
});

app.post('/updateData', (req, res, next) => {

    dynamo.updateData(req.body.tableName, req.body.year, req.body.titleName).then((result) => {
        res.status(201);
        res.json(result.message);
    })
        .catch((error) => {
            console.error(`Unable to update item. Error JSON: ${error} `);
            res.status(500);
            res.json({
                code: 500,
                message: `Unable to update item. Error JSON: ${error}`
            });
        });

});

app.post('/deleteData', (req, res, next) => {

    dynamo.deleteData(req.body.tableName, req.body.year, req.body.titleName).then((result) => {
        res.status(201);
        res.json(result.message);
    })
        .catch((error) => {
            console.error(`Unable to delete item. Error JSON: ${error} `);
            res.status(500);
            res.json({
                code: 500,
                message: `Unable to delete item. Error JSON: ${error}`
            });
        });

});

app.post('/queryByYear', (req, res, next) => {

    dynamo.queryByYear(req.body.tableName, req.body.year).then((result) => {
        res.status(201);
        res.json(result.message);
    })
        .catch((error) => {
            console.error(`Unable to query. Error: ${error} `);
            res.status(500);
            res.json({
                code: 500,
                message: `Unable to query. Error: ${error}`
            });
        });

});

module.exports = app;