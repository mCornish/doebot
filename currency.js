require('whatwg-fetch')
const key = process.env.CURRENCY_LAYER_KEY

module.exports = {
  convert
}

function convert (from, to, amount, cb) {
  const currencyString = `currencies=${from},${to}`
  const url = `http://apilayer.net/api/live?access_key=${key}&${currencyString}`

  const promise = fetch(url)

  if (cb) {
    promise.then(cb)
  }

  return promise
}
