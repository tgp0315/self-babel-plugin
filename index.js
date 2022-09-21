module.exports = ({types: t}) => {
  return {
    visitor: {
      // 逻辑
      Identifier(path) {
        // 判断父节点是否是if判断
        const parentIsIf = t.isIfStatement(path.parentPath)
        // 判断节点
        const isDebug = path.node.name === 'DEBUG'
        // console.log(isDebug, parentIsIf)
        if (isDebug && parentIsIf) {
          // 把identifier 转换成 string
          const stringNode = t.stringLiteral(path.node.name)
          path.replaceWith(stringNode)
        }
      },
      // 删除生产环境的debugger
      DebuggerStatement(path, state) {
        const { isRemove } = state.opts
        if (isRemove) {
          // console.log(path.remove, state, 'path')
          path.remove()
        }
      },

      // Statement(path) {
      //   const type = path.node.type;
      //   console.log(type)
      //   //直接删除的是一个声明语句
      //   if (type === "DebuggerStatement") {
      //     console.log(path.node)
      //   }
      // },
      // 特定环境下去掉console
      CallExpression(path, state) {
        const { callee } = path.node
        const { removeConsole } = state.opts
        const isConsoleLog =
          t.isMemberExpression(callee) &&
          callee.object.name === "console" &&
          callee.property.name === "log"
        if (isConsoleLog && removeConsole) {
          path.remove();
        }
      }
    }
  }
}

