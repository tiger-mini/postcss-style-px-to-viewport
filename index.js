const loaderUtils = require('loader-utils');

// 匹配到 template 标签
const template = /<template>([\s\S]+)<\/template>/gi;
const stylePXRegExp = /(\d+)px/;

let defaultsProp = {
    unitToConvert: 'px',
    ignoreUnitCase: true, // 转换单位是否忽略大小写
    viewportWidth: 750,
    unitPrecision: 5,
    viewportUnit: 'vw',
    fontViewportUnit: 'vw',
    minPixelValue: 1
};

module.exports = function(source) {

    const opts = loaderUtils.getOptions(this);
    const dpo = {...defaultsProp, ...opts};

    let newSource = '';
    if (template.test(source)) {
        newSource = source.match(template)[0];
    }

    const pxReg = new RegExp(stylePXRegExp.source, dpo.ignoreUnitCase ? 'ig' : 'g');
    if(pxReg.test(newSource)) {
        const _source = newSource.replace(pxReg, createPxReplace(dpo.viewportWidth, dpo.minPixelValue, dpo.unitPrecision, dpo.viewportUnit))
        return source.replace(template, _source)
    }

    return source
}

function createPxReplace (viewportSize, minPixelValue, unitPrecision, viewportUnit) {
    return function ($0, $1) {
        if (!$1) return
        const pixels = parseFloat($1)
        if (pixels <= minPixelValue) return
        return toFixed((pixels / viewportSize * 100), unitPrecision) + viewportUnit
    }
}
function toFixed (number, precision) {
    const multiplier = Math.pow(10, precision + 1),
        wholeNumber = Math.floor(number * multiplier)
    return Math.round(wholeNumber / 10) * 10 / multiplier
}
