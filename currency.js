const request = require('request')
const key = process.env.CURRENCY_LAYER_KEY

module.exports = {
  convert
}

function convert (from, to, amount, cb) {
  const currencies = `${from},${to}`
  const url = `http://apilayer.net/api/live?`
  const req = {
    url,
    qs: {
      access_key: key,
      currencies
    },
    method: 'POST',
    json: true
  }

  request(req)
  .on('response', res => {
    res.on('data', data => {
      console.log(data)
      const newAmount = data.quotes[`USD${to}`]
      cb(newAmount)
    })
  })
  .on('error', err => {
    console.log('Error fetching quotes: ', err)
  })
}
