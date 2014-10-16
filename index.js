var fs = require('fs')
var path = require('path')
var ejs = require('ejs')
var parse = require('./lib/parser')
var model = require('./lib/model')
var diff = require('./lib/diff')
var colors = require('colors')

var getModelByPath = function(path){
  var content = fs.readFileSync(path).toString()
  var dom = parse(content)
  return model(dom)
}

exports.view = function(svgpath, htmlpath, callback){
  var data = getModelByPath(svgpath)
  if(!data){
    console.error('svg file has some wrong.'.red)
    return
  }
  ejs.renderFile(path.resolve(__dirname, './html/index.htm'), {
    data: data,
    svgXML: data.dom.getElementsByTagName('svg')[0].toString()
  }, function(error, html){
    if(!error){
      fs.writeFile(htmlpath, html)
      callback && callback(true)
    }else{
      callback && callback(false)
    }
  })
}
exports.diff = function(svgpath1, svgpath2, htmlpath, callback){
  var diffResult = diff(getModelByPath(svgpath1), getModelByPath(svgpath2))
  if(!diffResult){
    console.error('svg file has some wrong.'.red)
    return
  }
  ejs.renderFile(path.resolve(__dirname, './html/diff.htm'), {
    data: diffResult,
    newSvgXML: diffResult.newData.dom.getElementsByTagName('svg')[0].toString(),
    oldSvgXML: diffResult.oldData.dom.getElementsByTagName('svg')[0].toString()
  }, function(error, html){
    if(!error){
      fs.writeFile(htmlpath, html)
      callback && callback(true)
    }else{
      callback && callback(false)
    }
  })
}
// d = exports.diff('/Users/berton/workspace/git/svgfontview/test/svg/iconfont.svg', '/Users/berton/workspace/git/svgfontview/test/svg/iconfont2.svg', '/Users/berton/workspace/git/svgfontview/test/svg/iconfont_diff.htm')

