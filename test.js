const { transformSync } = require('@babel/core')

const code = `
    console.log('click');
    // 有一些逻辑 只需要在dev环境下运行
    debugger
    if (DEBUG) {
        const a = 10
        const b = 20
        const c = a + b
    }`

const babelConfig = {
    plugins: [['./index.js',{
        isRemove: true
    }]]
}
const output = transformSync(code, babelConfig)
// console.log(output)