const request = require('request')
const token = process.env.FB_PAGE_ACCESS_TOKEN

module.exports = {
  addGreeting
}

function addGreeting (text) {
  const url = 'https://graph.facebook.com/v2.6/me/thread_settings'
  const data = {
    'setting_type': 'greeting',
    'greeting': {
      text
    }
  }
  request({
    url,
    qs: {access_token: token},
    method: 'POST',
    json: data
  }, (err, res, body) => {
    const error = err || res.body.error
    if (error) console.log('Error sending messages: ', error)
  })
}
