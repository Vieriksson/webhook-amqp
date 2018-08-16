const bodyParser = require('body-parser')
const express = require('express')
const config = require('./config')
const channel = require('./channel')

;(async () => {
    const queue = 'test-queue'
    const subscribers = {}
    const publisher = await channel.createPublisher(queue)

    const app = express()
    app.use(bodyParser.json())

    app.post('/subscribe', (req, res) => {
        const { event, url } = req.body
    
        subscribers[event] = subscribers[event] || []
        subscribers[event] = [...new Set([url, ...subscribers[event]])]
    
        console.log(`Subscriber ${url} added to event: ${event}`)
        res.send()
    })
    
    app.get('/publish/:event', (req, res) => {
        const { event } = req.params
    
        const eventSubscribers = subscribers[event] || []
    
        eventSubscribers.forEach(subscriber => {
            publisher.publish(subscriber)
        })
    
        console.log(`Published ${eventSubscribers.length} calls to the queue: ${queue}, for event: ${event}`)
        res.send()
    })
    
    app.get('/subscribers', (req, res) => res.json(subscribers))
    
    app.listen(config.WEBHOOK_PORT,
        () => console.log(`Listening to port: ${config.WEBHOOK_PORT}`))

})();
