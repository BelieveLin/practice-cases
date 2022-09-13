const date = require("./src/dataFormat");
const escape = require("./src/htmlEscape")

module.exports = {
    ...date,
    // dataFormat
    ...escape
    // htmlEscape
    // htmlUnEscape
}