## webpack教程

**1.全局安装webpack (安装webpack命令行工具）**

```javascript
yarn global add webpack//global必须在前面，不加版本号相当于安装最新版本
yarn global add  webpack-cli//但webpack的版本为4.0以上时，需要安装才能使用webpack
//安装好全部变量以后可以在c盘的appdata里面的yarn里面的bin里面查看

//检测
webpack -v
//如果没有成功,去配置环境变量
```

**2.本地安装（项目依赖）**

```javascript
//全局安装相当于只是安装了webpack命令，如果需要在我们的项目中使用， 那么还需要本地安装（项目中安装）。
//在本地文件中安装
yarn init -y//初始化，生成package.json文件
yarn add webpack -D//开发依赖
yarn add webpack-cli -D//开发依赖
```

**3.使用webpack(命令行)**

```javascript
1.创建一个文件夹，不能叫webpack。
2.项目文件一般放在src文件下。
3.如果较早的webpack版本，webpack 入口文件 出口文件
  在4.0以后的版本，使用webpack即可
4.入口文件必须叫index.js。
```

**4.使用webpack(配置文件)**

```javas
1.创建一个webpack.config.js文件来配置。
2.配置代码
//引入path模块
const path = require('path')
//导出
module.exports = {
    entry: path.join(__dirname, 'main.js'),//入口文件，文件名随意
    output: {
        path: path.join(__dirname, './dist'),//指定产生的目录
        filename： 'bundle.js'//出口文件,文件名随意
    }
}
3.在终端中直接使用webpack命令。
```

***4.1使用webpack插件webpack-dev-server***

webpack-dev-server 会自动去构建项目，自动打开项目，还会热更新

如果要下载对应的版本，一定要和 webpack-cli 匹配

​	webpack-cli@3.3.12

​	webpack-dev-server@3.11.0

```javascript
//webpack.config.js 中增加一项配置
module.exports = {
    ...
    // 注意有驼峰命名
    devServer: {
        hot:true,//热更新
        open: true,//自动打开
        port: 9527,//设置端口
        contentBase: path.join(__dirname, 'src')//构建项目
    }
}
```

修改 package.json,添加scripts 的字段

```javascript
{
  ....
  "scripts": {
    "dev": "webpack-dev-server"
  },
  "dependencies": {},
  "devDependencies": {
    "webpack": "^5.4.0",
    "webpack-cli": "3.3.12",
    "webpack-dev-server": "3.11.0"
  }
}
```

​	**结果，就是保持了一个打开的虚拟服务，自动构建f和编译了网页，没有创建dist目录，在虚拟服务中创建了一个临时的js文件,使用npm run dev启动项目**

**5.使用插件**

```javascript
`yarn add html-webpack-plugin -D`//下载插件
```

```javascript
//修改配置文件
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // 插件的使用
    plugins: [
        new HtmlWebpackPlugin({template: './src/index.html'})//帮文件引入这个入口文件
    ]
}
```

**6.使用loader**

*webpack 默认只能识别 js，除了js之外的文件，都需要加载loader*

1.使用css-loader

```javascript
//在入口文件引入样式
import './css/base.css'
//下载Loader
yarn add style-loader css-loader -D
//修改webpack.config.js
module.exports = {
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }
        ]
    }
}
```

2.使用less-loader

```javascript
 rules: [
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }
        ]
```

3.使用sass-loader

```javascript
import './css/list.scss'
 rules: [
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }
        ]
```

4.使用file-loader

```javascript
 rules: [
            { test: /\.(png|jpg|gif)$/, use: 'file-loader' }
        ]
```

5.使用url-loader

```javascript
rules: [
            { 
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'images/[name]-[hash:8].[ext]'
                }
            }
        ]
```

6.显示字体图标

```javascript
import './fonts/iconfont.css'
  rules: [
            { test: /\.(eot|svg|ttf|woff|woff2)/, use: 'file-loader' }
        ]
```





