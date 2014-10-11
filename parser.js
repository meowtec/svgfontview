var DOMParser = require('xmldom').DOMParser
module.exports = function parse(content){
  var domParser = new DOMParser()
  var dom = domParser.parseFromString(content, 'text/xml')
  return dom
}
