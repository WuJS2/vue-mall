# vue-mall

## 创建项目

`vue create vue-mall`

> 注：一定不要将 eslint 包括进来，目前没找到正确的去掉方法。

## 划分目录结构

TODO Mac 上使用 tree 命令看一下

## CSS 文件的引入

1. 引入 `normalize.css`，可从 GitHub 中获取

2. 创建全局 `base.css`，并在 `base.css` 中引入 `normalize.css`

   `@import "./normalize.css";`

3. 在 `App.vue` 中引入 `base.css`

   `@import "./assets/css/base.css";`

## 配置 vue.config.js

在根目录下新建文件 `vue.config.js`，配置路径的别名

```js
module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'assets': "@/assets",
                'common': "@/common",
                'components': "@/components",
                'network': "@/network",
                'views': "@/views",
            },
        }
    },
};
```

## 导入最初的样子

引入 `vue-router`

`npm install --save vue-router`

基于本次完成的代码存档

`git tag -a v0.0.1 -m '第一个小版本'`

`git push origin v0.0.1`

## 功能开发

### 首页

#### 封装导航栏组件 `NavBar.vue`

#### 请求首页默认数据

- 安装 `axios`，`npm install axios --save`

- 封装统一的 `request.js`，

- 封装 `home.js`

- 在 `home.vue` 中引入 `home.js`

  `import {getHomeMultidata,getHomeGoods} from "../../network/home"`

- 请求数据并保存

#### 使用轮播图组件 `Swiper.vue`

#### 封装推荐信息 `RecommendView.vue`

#### 封装本周流行 `FeatureView.vue`

#### 封装 `TabControl.vue`

#### 请求首页商品数据，封装 `GoodsList.vue`

#### 安装 `better-scroll` 插件

`npm install better-scroll --save`

完成滚动效果以及下拉加载更多

1. java 基础

Java基础语法-》面向对象-》集合-》IO-》线程与并发-》异常-》网络编程

2. 数据库
 MySQL-》Oracle-》JDBC-》C3PO-》Druid
 
 3. 前端技术
 HTML->CSS->JavaScript->jQuery->Ajax->Vue->webpack->elementUI->微信小程序
 
 4. 动态网页
 Servlet->JSP->EL->JSTL->Cookie->Session->fillter->Listener

5. 编程强化

设计模式->JVM优化->数据结构和算法->多线程高级->MINA->Netty->NIO

6. 软件项目管理
Maven->SVN->Git->码云->Jenkins->Sonar