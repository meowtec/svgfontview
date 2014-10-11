module.exports = function getModel(dom){

    var svgDom = dom.getElementsByTagName('svg')[0]
    if(!svgDom){
      return
    }
    var fontElem = dom.getElementsByTagName('font')[0]
    if(!fontElem){
      return
    }
    var fontFace = svgDom.getElementsByTagName('font-face')[0]
    var fontFamily
    if(!fontFace){
      fontFamily = 'iconfontname'
      var fontFace = dom.createElement('font-face')
      fontFace.setAttribute('font-family', fontFamily)
      svgDom.getElementsByTagName('font')[0].appendChild(fontFace)
    }else{
      fontFamily = fontFace.getAttribute('font-family')
    }

    var glyphs = svgDom.getElementsByTagName('glyph')
    var icons = []
    for(var i=0; i<glyphs.length; i++){
      var glyph = glyphs[i]
      var char = glyph.getAttribute('unicode')
      if(!char){
        continue
      }
      var unicode = char.charCodeAt(0)
      var hex = unicode.toString(16)
      icons.push({
        char: char,
        unicode: unicode,
        hex: hex,
        entity: '&#' + unicode + ';',
        cssContent: '\\' + hex
      })
    }
    var data = {
      icons: icons,
      count: icons.length,
      font: fontFamily
    }
    return data
}
