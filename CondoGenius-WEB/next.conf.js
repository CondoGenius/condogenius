
require('dotenv').config()

module.exports = {
    env: {
        API_GATEWAY_URL: process.env.API_GATEWAY_URL,
        API_GATEWAY_URL_LOCAL: process.env.API_GATEWAY_URL_LOCAL,
        API_URL_TEST: 'http://localhost:7008/api'
    }
}