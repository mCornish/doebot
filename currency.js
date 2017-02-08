const request = require('request')
const store = require('store')
const key = process.env.CURRENCY_LAYER_KEY

module.exports = {
  convert
}

function convert ({from, to, amount}, cb) {
  getRate(from, to, exRate => {
    const newAmount = amount * exRate
    cb(newAmount)
  })
}

function getRate (from, to, cb) {
  if (store.get(to)) return store.get(to)

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

  request(req, (err, res, body) => {
    if (err) return console.log('Error: ', err)
    const exRate = body.quotes[`USD${to}`]
    store.set(to, exRate)
    cb(exRate)
  })
  // .on('error', err => {
  //   console.log('Error fetching quotes: ', err)
  // })
}
