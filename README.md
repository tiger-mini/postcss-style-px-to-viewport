# postcss-style-px-to-viewport
主要是弥补postcss-px-to-viewport未对行内样式处理

自实现一个webpack loader 将vue模板中行内样式的px单位转为vw单位

### install

```npm
npm install postcss-style-px-to-viewport --save-dev
or
yarn add postcss-style-px-to-viewport -D
```

### Use

```javascript
{
  chainWebpack: (config) => {
      config.module
      .rule('vue')
      .test(/\.vue$/)
      .use('postcss-style-px-to-viewport')
      .loader('postcss-style-px-to-viewport')
      .option({
          // ...
      })
    }
}
```
或
```text
{
    test: /\.(vue|jsx?)$/,
    loader: 'postcss-style-px-to-viewport',
    options: {
       // ...
    }
}
```

### Example

原HTML代码
```html
<div width="200px" style="font-size: 16px;">设置下文字大小 但是用的是style样式</div>
```
loader转换后
```html
<div width="53.33333vw" style="font-size: 4.26667vw;">设置下文字大小 但是用的是style样式</div>
```

### 效果
![code](./assets/code.png)
![runtime](./assets/runtime.gif)

### option
默认配置
```javascript
defaultsProp = {
  unitToConvert: 'px', 
  ignoreUnitCase: true, // 默认会忽略大小写来转换unitToConvert的配配置 如px、PX、Px、pX各个情况。如果设置为false 这只匹配 px
  viewportWidth: 375,
  unitPrecision: 5,
  viewportUnit: 'vw',
  fontViewportUnit: 'vw',
  minPixelValue: 1
}
```

### 参与

目前只匹配了vue项目，对于其他项目与问题欢迎完善与共建
