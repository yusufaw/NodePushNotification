const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../.config');

router.get('/', (req, res, next) => {
    request({
        url: 'https://fcm.googleapis.com/fcm/send',
        method: 'POST',
        headers: {
            'Content-Type': ' application/json',
            'Authorization': `key=${config.firebaseServerKey}`
        },
        body: JSON.stringify({
            "data": {
                "title": "halo semua",
                "body": "hehe"
            },
            "to": "/topics/news"
        })
    }, (error, response, body) => {
        if (error) {
            res.send(error, response, body);
        } else if (response.statusCode >= 400) {
            res.send('HTTP Error: ' + response.statusCode + ' - ' + response.statusMessage + '\n' + body);
        } else {
            res.send('Done!')
        }
    });
});

module.exports = router;
