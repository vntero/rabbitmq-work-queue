#!/usr/bin/env node
//require the Advance Message Queue Protocol Library
var amqp = require('amqplib/callback_api');
//connect to RabbitMQ server
amqp.connect('amqp://localhost', function (error0, connection) {
    //create a new channel for the API to get things done  
    if (error0) {
        throw error0;
    }
    //To send, we must declare a queue for us to send to; then we can publish a message to the queue
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = 'hello';
        var msg = 'Hello world! Another one!';
        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(" [x] Sent %s", msg);
    });
    //lastly, we close the connection and exit
    setTimeout(function () {
        connection.close();
        process.exit(0);
    }, 500);
});
