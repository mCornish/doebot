const request = require('request');
const token = process.env.FB_PAGE_ACCESS_TOKEN;

module.exports = (sender, text) => {
  const messageData = {text: text};
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token: token},
    method: 'POST',
    json: {
      recipient: {id: sender},
      message: messageData
    }
  }, (err, res, body) => {
    const error = err || res.body.error;
    if (error) console.log('Error sending messages: ', error);
  })
}
