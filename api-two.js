const axios = require('axios')
const express = require('express')
const config = require('./config')

// Subscribe to event
const event = 'test-event'
axios.post(`${config.WEBHOOK_URL}/subscribe`, {
    event,
    url: `${config.API_TWO_URL}/event-occurred`
}).then(res => console.log(`Subscribed to ${event}`))

// Create API two
const app = express()

app.get('/event-occurred', (req, res) => {
    console.log('event-occurred and api two was called')
    res.send()
})

app.listen(config.API_TWO_PORT, 
    () => console.log(`Listening to port: ${config.API_TWO_PORT}`))