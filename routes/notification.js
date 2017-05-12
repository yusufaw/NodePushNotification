const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../.config');
const admin = require('firebase-admin');
var registrationToken = config.firebaseServerKey;

var serviceAccount = require("../firebase-config.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

var payload = {
    data: {
        "title": "halo semuanya",
        "body": "hehe"
    }
};


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
            console.log(response);
            res.send('Done!')
        }
    });
});

router.get('/oke', (req, res, next) => {
    admin.messaging().sendToDevice('', payload)
        .then(function(response) {
            // See the MessagingDevicesResponse reference documentation for
            // the contents of response.
            console.log("Successfully sent message:", response);
            res.send('')
        })
        .catch(function(error) {
            console.log("Error sending message:", error);
        });
});

module.exports = router;
