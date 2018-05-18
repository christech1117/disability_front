'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '" https://easy-mock.com/mock/5afcf0d4b3da6b4aafaeba72/disability"',
})
