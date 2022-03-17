/**
 * @file config
 * @author bk
 */

import path from 'path'
import prodEnv from './prod.env'
import stagEnv from './stag.env'
import devEnv from './dev.env'

// 区分是测试环境还是正式环境
const onlineEnv = process.env.BKPAAS_ENVIRONMENT === 'stag' ? stagEnv : prodEnv

export default {
    build: {
        // env 会通过 webpack.DefinePlugin 注入到前端代码里
        env: onlineEnv,
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '{{BK_STATIC_URL}}',
        productionSourceMap: true,
        productionGzip: false,
        localDevPort: JSON.parse(onlineEnv.LOCAL_DEV_PORT),
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report,
        appCode: JSON.parse(onlineEnv.BKPAAS_APP_ID),
    },
    dev: {
        // env 会通过 webpack.DefinePlugin 注入到前端代码里
        env: devEnv,
        // 这里用 JSON.parse 是因为 dev.env.js 里有一次 JSON.stringify，dev.env.js 里的 JSON.stringify 不能去掉
        localDevUrl: JSON.parse(devEnv.LOCAL_DEV_URL),
        localDevPort: JSON.parse(devEnv.LOCAL_DEV_PORT),
        appCode: JSON.parse(devEnv.BKPAAS_APP_ID),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {},
        cssSourceMap: false,
        autoOpenBrowser: false
    }
}
