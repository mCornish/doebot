'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const send = require('./send')
const thread = require('./thread')
const interpret = require('./interpret')
const currency = require('./currency')

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Thread Settings
thread.addGreeting('Currency with currency')

app.get('/', (req, res) => {
  res.send('Hello world, I am Doe Bot.')
})

// For Facebook verification
app.get('/webhook/', (req, res) => {
  if (req.query['hub.verify_token'] === 'a_doe_a_deer_a_female_deer') {
    return res.send(req.query['hub.challenge'])
  }
  return res.send('Error, wrong token')
})

// Process messages
app.post('/webhook/', (req, res) => {
  const messagingEvents = req.body.entry[0].messaging
  messagingEvents.forEach((event, i) => {
    const sender = event.sender.id
    if (event.message && event.message.text) {
      const text = event.message.text
      if (text.toLowerCase().indexOf('convert') > -1) {
        const options = interpret('convert', text)
        currency.convert(options, amount => {
          send.textMessage(sender, 'CAD: ' + amount)
        })
      } else if (event.postback) {
        const text = JSON.stringify(event.postback)
        send.textMessage(sender, 'Postback received: ' + text.substring(0, 200), token)
      } else {
        send.textMessage(sender, 'Text received, echo: ' + text.substring(0, 200))
      }
    }
  })
  res.sendStatus(200)
})

const token = process.env.FB_PAGE_ACCESS_TOKEN

// Spin up the server
app.listen(app.get('port'), () => {
  console.log('Running on port', app.get('port'))
})
