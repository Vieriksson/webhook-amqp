const axios = require('axios')
const express = require('express')
const config = require('./config')

// Subscribe to event
const event = 'test-event'
axios.post(`${config.WEBHOOK_URL}/subscribe`, {
    event,
    url: `${config.API_ONE_URL}/event-occurred`
}).then(res => console.log(`Subscribed to ${event}`))


// Create API one
const app = express()

app.get('/event-occurred', (req, res) => {
    console.log('event-occurred and api one was called')
    res.send()
})

app.listen(config.API_ONE_PORT, 
    () => console.log(`Listening to port: ${config.API_ONE_PORT}`))



