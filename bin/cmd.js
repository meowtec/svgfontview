#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2))
var colors = require('colors')
var convert = require('..')
var svgpath = argv._[0]
var htmlpath = argv._[1]

if(!svgpath){
  console.log('usage: svgfontview svg_file_name [ html_file_name ]')
  return
}
if(!htmlpath){
  htmlpath = svgpath + '.html'
}
if(/\/$/.test(htmlpath)){
  htmlpath = htmlpath + svgpath + '.html'
}
convert(svgpath, htmlpath, function (success){
  if(success){
    console.log('HTML doc '.green + htmlpath.yellow + ' has been created.'.green);
  }
})
