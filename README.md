svgfontview
===========

Preview svg font file.

#### Install
```sh
npm install svgfontview -g
```

#### Usage
```
svgfontview myfontfile.svg myfontfile.svg.html
```

#### Here is an example
```sh
git clone git@github.com:meowtec/svgfontview.git
cd svgfontview/test/svg/
svgfontview fontello.svg
open fontello.svg.html
svgfontview diff iconfontello_1.svg iconfontello_2.svg 
open iconfontello_1.svg_iconfontello_2.svg_diff.html
```
![svgiconpreview](https://raw.githubusercontent.com/meowtec/svgfontview/master/preview.png)
![svgiconpreview diff](https://raw.githubusercontent.com/meowtec/svgfontview/master/preview2.png)
