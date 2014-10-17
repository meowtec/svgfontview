#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2))
var colors = require('colors')
var svgfontview = require('..')
var argv0 = argv._[0],
  argv1 = argv._[1],
  argv2 = argv._[2],
  argv3 = argv._[3]

if(!argv0){
  console.log('usage: svgfontview svg_file_name [ html_file_name ]')
  return
}
if(argv0 === 'diff'){
  // diff
  // argv1 svg1
  // argv2 svg2
  // argv3 html
  var svg2Name = argv2.split('/').pop()
  var htmlpath = argv3
  if(!htmlpath){
    htmlpath = argv1 + '_' + svg2Name + '_diff.html'
  }
  svgfontview.diff(argv1, argv2, htmlpath, function (success){
    if(success){
      console.log('HTML file '.green + htmlpath.yellow + ' has been created.'.green);
    }else{
      console.log('shit.'.red)
    }
  })
}else{
  // convert
  var svgpath = argv0,
    htmlpath = argv1
  if(!argv1){
    htmlpath = svgpath + '.html'
  }
  if(/\/$/.test(htmlpath)){
    htmlpath = htmlpath + svgpath + '.html'
  }
  svgfontview.view(svgpath, htmlpath, function (success){
    if(success){
      console.log('diff file '.green + htmlpath.yellow + ' has been created.'.green);
    }else{
      console.log('shit.'.red)
    }
  })
}
