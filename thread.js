require('whatwg-fetch')
const token = process.env.FB_PAGE_ACCESS_TOKEN

module.exports = {
  addGreeting
}

function addGreeting (text) {
  const url = `https://graph.facebook.com/v2.6/me/thread_settings?access_token=${token}`
  const data = {
    'setting_type': 'greeting',
    'greeting': {
      text
    }
  }
  const req = {
    method: 'POST',
    body: JSON.stringify(data)
  }
  fetch(url, req)
}
