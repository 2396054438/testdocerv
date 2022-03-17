/**
 * @file prod server
 * 静态资源
 * 模块渲染输出
 * 注入全局变量
 * 添加html模板引擎
 */
import express from 'express'
import path from 'path'
import artTemplate from 'express-art-template'
import history from './connect-history-api-fallback.js'
import cookieParser from 'cookie-parser'
import axios from 'axios'
import ajaxMiddleware from './ajax-middleware'
import config from './config'

const app = new express()
const PORT = process.env.PORT || config.build.localDevPort || 5000
const http = axios.create({
	withCredentials: true
})

http.interceptors.response.use(response => response, error => Promise.reject(error))

// 注入全局变量
const GLOBAL_VAR = {
    SITE_URL: process.env.BKPAAS_SUB_PATH,
    BK_SUB_DOAMIN: process.env.BK_ENGINE_APP_DEFAULT_SUBDOMAINS,
    BK_SUB_PATH: (process.env.BKPAAS_SUB_PATH || '').replace(/\//g, ''),
	BK_STATIC_URL: process.env.BKPAAS_SUB_PATH,
	REMOTE_STATIC_URL: process.env.BKPAAS_REMOTE_STATIC_URL || '',
	// 蓝鲸平台访问URL
	BKPAAS_URL: process.env.BKPAAS_URL || '',
	// 当前应用的环境，预发布环境为 stag，正式环境为 prod
	BKPAAS_ENVIRONMENT: process.env.BKPAAS_ENVIRONMENT || '',
	// EngineApp名称，拼接规则：bkapp-{appcode}-{BKPAAS_ENVIRONMENT}
	BKPAAS_ENGINE_APP_NAME: process.env.BKPAAS_ENGINE_APP_NAME || '',
	// MagicBox静态资源URL
	BKPAAS_REMOTE_STATIC_URL: process.env.BKPAAS_REMOTE_STATIC_URL || '',
	// 外部版对应tencent，混合云版对应clouds
	BKPAAS_ENGINE_REGION: process.env.BKPAAS_ENGINE_REGION || '',
	// APP CODE
	BKPAAS_APP_ID: process.env.BKPAAS_APP_ID || ''
}

// APA 重定向回首页，由首页Route响应处理
// https://github.com/bripkens/connect-history-api-fallback#index
app.use(history({
	index: '/',
	rewrites: [
        {
            // connect-history-api-fallback 默认会对 url 中有 . 的 url 当成静态资源处理而不是当成页面地址来处理
            // 兼容 /cs/28aa9eda67644a6eb254d694d944307e/cluster/BCS-MESOS-10001/node/10.121.23.12 这样以 IP 结尾的 url
            // from: /\d+\.\d+\.\d+\.\d+$/,
            from: /\/(\d+\.)*\d+$/,
            to: '/'
        },
        {
            // connect-history-api-fallback 默认会对 url 中有 . 的 url 当成静态资源处理而不是当成页面地址来处理
            // 兼容 /bcs/projectId/app/214/taskgroups/0.application-1-13.test123.10013.1510806131114508229/containers/containerId
            from: /\/\/+.*\..*\//,
            to: '/'
        },
        {
        	from: '/user',
        	to: '/user'
        }
    ]
}))

app.use(cookieParser())

// 首页
app.get('/', (req, res) => {
    const index = path.join(__dirname, '../dist/index.html')
    const scriptName = (req.headers['x-script-name'] || '').replace(/\//g, '')
    // 使用子路径
    if (scriptName) {
        GLOBAL_VAR.BK_STATIC_URL = scriptName
    }
    // 使用系统分配域名
    else {
        GLOBAL_VAR.BK_STATIC_URL = ''
    }
	res.render(index, GLOBAL_VAR)
})

app.use(ajaxMiddleware)
// 配置静态资源
app.use('/static', express.static(path.join(__dirname, '../dist/static')))

// 配置视图
app.set('views', path.join(__dirname, '../dist'))

// 配置模板引擎
// http://aui.github.io/art-template/zh-cn/docs/
app.engine('html', artTemplate)
app.set('view engine', 'html')

// 配置端口
app.listen(PORT, () => {
	console.log(`App is running in port ${PORT}`)
})
