// vue.config.js
const path = require('path');//引入path模块
function resolve(dir){
    return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
}

module.exports = {
    outputDir: 'dist', // 打包的目录
    lintOnSave: false, // 在保存时校验格式
    productionSourceMap: false, // 生产环境是否生成 SourceMap
    devServer: {
      open: true, // 启动服务后是否打开浏览器
      host: '127.0.0.1',
      port: 2020, // 服务端口
      https: false,
      hotOnly: false,
      proxy: {
        
        '/' : {
            target: 'http://42.248.78.75:3001',
            //target: 'http://113.219.209.183:3001',
            //target : 'http://101.91.115.207:3001/',
            //target : 'http://192.168.14.73:8083/',
            pathRewrite:{
                '^/':'/'
            },
            changeOrigin: true,   
        }
     }
    },
    chainWebpack:(config)=>{
        config.resolve.alias
        .set('@',resolve('./src'))
        //set第一个参数：设置的别名，第二个参数：设置的路径
　　　　
    },
    publicPath: '/smart-city-mobile' 
}