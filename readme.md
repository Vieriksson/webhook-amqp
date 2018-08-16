Webhook/AMQP
=========
A prototype of an asynchronous webhook using a message queue

## Requirements

> [RabbitMQ Server](https://www.rabbitmq.com/download.html)

## Getting started

### Install dependencies

```bash
yarn install
```

### Start a local rabbitmq server

```bash
rabbitmq-server
```

### Start the webhook

```bash
node webhook
```

### Start the subscriber api:s
> ###### *Api one and two subscribes to random-event. Api three subscribes to another-event.*

```bash
node api-one
node api-two
node api-three
```

### Create consumer

```bash
node consumer
```

### Publish events
> ###### *Make sure to publish to the events that api-one, api-two and api-three subscribes to.*

```bash
curl http://localhost:3000/publish/random-event
curl http://localhost:3000/publish/another-event
```

-----
> *Note that you can publish events before starting the consumer. The consumer will pick up the events in the queue as soon as it starts.*