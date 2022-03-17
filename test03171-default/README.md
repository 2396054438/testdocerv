spa-template使用指南
------------------------

它是基于 `Vue.js` 研发的蓝鲸体系前端分离工程的单页面应用模板，包括了：

- 基础工程化能力，开箱即用，无需过多配置，开发完成直接在V3可部署
- 基础 mock 服务，帮助开发者快速伪造接口数据，测试前端
- 蓝鲸前端/设计规范，提供统一设计及代码检测
- bk-magic-vue 组件库，提供丰富的组件
- 蓝鲸前端通用逻辑，包含登录模块、异步请求管理等
- 最佳实践以及开发示例

# 本地开发
#### 安装依赖包
```
npm install
```

#### 配置host
```
127.0.0.1 dev.bkapp.tencent.com
```

#### 启动服务
```
npm run dev
```

#### 打开链接dev.bkapp.tencent.com

> 开发域名及端口的配置都在`build/dev.env.js`能修改

# 前后端分离
当前代码仅仅是应用前端，作为前后端分离架构，还需要后端服务，前后端以ajax+json进行数据处理，因此，需要

#### 新建后端服务模块
#### 配置APP ID
- 编辑根目录下/build/dev.env.js，修改`BKPAAS_APP_ID`，用于本地开发，线上部署时会自动注入
- 编辑根目录下index.dev.html，修改`BKPAAS_APP_ID`，用于本地开发，线上部署时会自动注入

#### 配置后端接口
- 本地开发修改`build/dev.env.js`下的`AJAX_URL_PREFIX`字段，作为接口的url前缀
- 线上部署测试环境修改`build/stag.env.js`下的`AJAX_URL_PREFIX`字段，作为接口的url前缀
- 线上部署测正式境修改`build/prod.env.js`下的`AJAX_URL_PREFIX`字段，作为接口的url前缀

#### 配置用户登录态信息接口，作为前端判断登录状态的验证
> 打开首页，前端会以/user 来发起用户信息请求，如果没登录会重定向回登录页面

需要后端接口在 `/user` 路径下实现获取当前登录用户的接口, 接口规范如下
```json
{
    "code": 0,
    "data": {
        "username": "test",
        "avatar_url": "http://test/avatar.jpg"
    },
    "message": "用户信息获取成功"
}
```

#### 后端服务需要解决跨域问题，推荐使用CORS方案
详情查看MDN https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS

# 打包构建（生成dist目录）
```
npm run build
```

# 打包构建分析
```
npm run build:analyzer
```

#### 常见问题

##### 登录
- 整个框架自带登录实现，在刚打开时，如果没有登录会直接跳到登录页，如果打开后，登录过期（接口返回401状态）会弹出登录窗口

## 详细说明

```bash
npm run doc
```
