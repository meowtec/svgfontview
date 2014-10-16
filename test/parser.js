var fs = require('fs')
var path = require('path')
var test = require('tap').test
var parse = require('../lib/parser')
var model = require('../lib/model')
var svgfont = require('..')

test('parse svg file to dom', function(t){
  var content = fs.readFileSync('./svg/fontello.svg').toString()
  t.ok(content.length, 'content is a string')
  var result = parse(content)
  t.ok(result, 'svg file can be parsed')
  t.equal(result.getElementsByTagName('glyph').length, 6, 'fontello.svg have 6 glyphs')

  var data = model(result)
  t.equal(data.font, 'fontello', 'fontello.svg font family is fontello')
  t.equal(data.count, 6, 'fontello data.count is 6')
  t.equal(data.icons[0].unicode, 59392, 'fontello first font is 59392')
  t.end();
});

test('wrong svg file', function(t){
  var content = fs.readFileSync('./svg/error.svg').toString()
  var result = parse(content)
  var data = model(result)
  t.equal(data.success, false, 'test a wrong icon file')
  t.end();
});
/*
test('diff', function(t){
  var diff = svgfont.diff('./svg/fontello_6_2.svg', './svg/fontello_6_3.svg')
  t.equal(diff.unchange.length, 6, '6 glphy unchange')
  t.equal(diff.onlyone.length, 2, 'file one has 2 uni glphy')
  t.end()
  //t.equal(diff.onlytwo.length, 3, 'file two has 3 uni glphy')
})
*/
