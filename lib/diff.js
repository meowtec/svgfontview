module.exports = function diff (data1, data2){
  data1.dom.getElementsByTagName('font-face')[0].setAttribute('font-family', 'iconfont-1')
  data2.dom.getElementsByTagName('font-face')[0].setAttribute('font-family', 'iconfont-2')
  data1.font = 'iconfont-1'
  data2.font = 'iconfont-2'
  var _data1 = {}
  var unchange = []
  var change = []
  var remove = []
  var newAdd = []
  data1.icons.forEach(function(item){
    _data1[item.unicode] = item
  })
  data2.icons.forEach(function(item){
    var unicode = item.unicode
    if(_data1[unicode]){
      if(_data1[unicode].path == item.path){
        // 未变化的
        unchange.push(item)
      }else{
        // 已经变化的
        change.push(item)
      }
      delete _data1[unicode]
    }else{
      // svg 2独有的
      newAdd.push(item)
    }
    item.path = null
  })
  for(var i in _data1){
    remove.push(_data1[i])
    _data1[i].path = null
  }
  return {
    unchange: unchange,
    change: change,
    remove: remove,
    newAdd: newAdd,
    oldData: data1,
    newData: data2
  }
}
