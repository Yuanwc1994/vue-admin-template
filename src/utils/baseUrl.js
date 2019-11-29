let baseUrl;
if (process.env.NODE_ENV === "production") { //生产环境
    if (process.env.VUE_APP_TYPE === 'prod1') {
        baseUrl = "https://api.dpmall.com/dpmall-web"; //正式机1
    } else if (process.env.VUE_APP_TYPE === 'prod2') {
        baseUrl = "https://mos.dpmall.com/dpmall-web"; //正式机2
    } else if (process.env.VUE_APP_TYPE === 'test') {
        baseUrl = "http://zxbcs.dpmall.com/dpmall-web"; //测试机
    } else {
        baseUrl = "http://172.20.15.70:8080/dpmall-web"; //阿乐环境
    }
} else { //开发环境
    baseUrl = "api/s";  //代理地址api
}
console.log('开发/线上环境：', process.env.NODE_ENV);
console.log('数据库(类型)：', process.env.VUE_APP_TYPE);
console.log('baseUrl地址：', baseUrl);
export default baseUrl
