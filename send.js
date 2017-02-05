const request = require('request')
const token = process.env.FB_PAGE_ACCESS_TOKEN

module.exports = {
  textMessage,
  genericMessage
}

function textMessage (sender, text) {
  const messageData = {text: text}
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token: token},
    method: 'POST',
    json: {
      recipient: {id: sender},
      message: messageData
    }
  }, (err, res, body) => {
    const error = err || res.body.error
    if (error) console.log('Error sending messages: ', error)
  })
}

function genericMessage (sender) {
  const messageData = {
    'attachment': {
      'type': 'template',
      'payload': {
        'template_type': 'generic',
        'elements': [{
          'title': 'First card',
          'subtitle': 'Element #1 of an hscroll',
          'image_url': 'https://pbs.twimg.com/media/C3yASUVWIAAhXEi.jpg:large',
          'buttons': [{
            'type': 'web_url',
            'url': 'https://www.twitter.com/mikewcornish',
            'title': 'My Tweet'

          }, {
            'type': 'postback',
            'title': 'Postback',
            'payload': 'Payload for first element in a generic bubble'

          }]

        }, {
          'title': 'Second card',
          'subtitle': 'Element #2 of an hscroll',
          'image_url': 'https://pbs.twimg.com/media/C3bGRlgVYAEegIZ.jpg',
          'buttons': [{
            'type': 'postback',
            'title': 'Postback 2',
            'payload': 'Payload ofr second element in a generic bubble'

          }]

        }]

      }

    }
  }

  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token: token},
    method: 'POST',
    json: {
      recipient: {id: sender},
      message: messageData

    }

  }, (err, res, body) => {
    const error = err || res.body.error
    if (error) console.log('Error sending messages: ', error)
  })
}
