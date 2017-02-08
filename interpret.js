module.exports = (keyword, text) => {
  return interpMap[keyword](text)
}

const interpMap = {
  convert
}

function convert (text) {
  const arr = text.split(' ')

  return {
    amount: arr[1],
    from: arr[2],
    to: arr[4]
  }
}
