var fs = require('fs')
var path = require('path')
var ejs = require('ejs')
var parse = require('./parser')
var model = require('./model')
var colors = require('colors')

module.exports = function(svgpath, htmlpath, callback){
  var svgContent = fs.readFileSync(svgpath).toString()
  var dom = parse(svgContent)
  var data = model(dom)
  if(!data){
    console.error('svg file has some wrong.'.red)
    return
  }
  data.svgXML = dom.getElementsByTagName('svg')[0].toString()
  ejs.renderFile(path.resolve(__dirname, './html/index.htm'), data, function(error, html){
    if(!error){
      fs.writeFile(htmlpath, html)
      callback && callback(true)
    }else{

    }
  })
}
