var fs = require('fs')
var path = require('path')
var test = require('tap').test
var parse = require('../parser')
var model = require('../model')

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
  t.equal(data, undefined, 'test a wrong icon file')
  t.end();
});

