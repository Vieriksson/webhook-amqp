const amqp = require('amqplib')
const axios = require('axios')

const amqpUrl = 'amqp://localhost'

const createPublisher = async queue => {
    const connection = await amqp.connect(amqpUrl)
    const channel = await connection.createChannel()
    return {
        publish: async (message) => {
            await channel.assertQueue(queue)
            await channel.sendToQueue(queue, Buffer.from(message))
        }
    }
}

const startConsumer = async queue => {
    const connection = await amqp.connect(amqpUrl)
    const channel = await connection.createChannel()
    await channel.assertQueue(queue)
    await channel.consume(queue, message => {
        const content = message.content.toString()

        axios.get(content)
        channel.ack(message)
    })
}

module.exports = {
    createPublisher,
    startConsumer
}