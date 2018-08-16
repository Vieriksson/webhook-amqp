const channel = require('./channel')

;(async () => {
    const queue = 'test-queue'
    
    channel.startConsumer(queue)

    console.log(`Created a consumer on queue ${queue}`)
})();