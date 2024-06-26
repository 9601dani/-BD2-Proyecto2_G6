const { response } = require('express')

const changeImagePath = (req, res = response, next) => {
    console.log('Middleware changeImagePath');
    console.log(response.json)
}

module.exports = { changeImagePath };
