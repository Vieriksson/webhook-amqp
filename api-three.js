const axios = require('axios')
const express = require('express')
const config = require('./config')

// Subscribe to event
const event = 'another-event'
axios.post(`${config.WEBHOOK_URL}/subscribe`, {
    event,
    url: `${config.API_THREE_URL}/event-occurred`
}).then(res => console.log(`Subscribed to ${event}`))

// Create API three
const app = express()

app.get('/event-occurred', (req, res) => {
    console.log('event-occurred and api three was called')
    res.send()
})

app.listen(config.API_THREE_PORT, 
    () => console.log(`Listening to port: ${config.API_THREE_PORT}`))