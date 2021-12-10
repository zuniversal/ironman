# umi project

## Getting Started

Install dependencies,

```bash
$ npm i
```

Start the dev server,

```bash
$ npm start
```



## 目录说明

```

  ├─common - 通用型公共组件 （需要根据项目进一步编写完善 尚未完结 ）
    ├─SearchForm 搜索组件
    ├─SmartEcharts echarts图标
    ├─SmartForm 抽象表单
    ├─SmartFormModal 
    ├─SmartHOC 可选择性高阶组件
    ├─SmartModal 模态框
    └─SmartTable 表格组件

  ├─components - 基础组件
    - 主要包括各页面的基本 表格 表单 等组件 及 其它的Widgets小部件 目录 
      命名方式： 页面 + 功能（如 搜索型 Search ）+ Form/Table 等

  ├─configs - 项目公共配置
  ├─constants - 项目通用常量
  ├─format - 格式化form表单要提交的数据 接口详情数据等
  ├─layouts - 布局入口容器组件 
  ├─hooks - 钩子目录 
  ├─locales - 国际化
  ├─models - 状态管理
  ├─pages - 页面容器 - 处理管控页面逻辑 数据 组装组件
  ├─services - 请求服务
  ├─static - 静态资源
  ├─tamp - 不需要查看的目录 临时存放 (后续加入的文件目录) 
  └─utils - 通用工具方法

```





## 项目结构

```
mock 前端mock数据文件
routes 管理模块的路由
components 通用组件封装
models 管理models
pages/portal 整个项目的入口文件，登录、首页等
pages/om 运维管理平台页面
pages/cs 客户服务平台页面
pages/sm 系统管理平台页面
```

## 技术

- 使用 [ES2015+](http://es6.ruanyifeng.com/)、[React 16.8+](http://facebook.github.io/react/) ，[Ant Design](https://ant.design/) 作为基础
- [umijs](https://umijs.org/) 作为前端应用框架，[dva](https://dvajs.com/) 管理数据状态，在 umijs 中使用 dva 可以参考[内置的插件](https://umijs.org/zh-CN/plugins/plugin-dva)
- less 作为 css 的预处理器，尽可能使用 flex 进行布局，禁止使用浮动布局
- 可视化图表使用 [echarts](https://echarts.apache.org/zh/index.html)

## 代码规范

- 严格遵守项目中默认配置的 `eslint` 规则，不能出现任何 `error` 级别的错误
- 变量名、函数名使用驼峰规则语义化命名，避免使用缩写
- 正则表达式、复杂逻辑处必须写上注释
- 合理拆分组件、文件，避免一个文件过长
- 通用的枚举类型定义为常量使用

## 提交规范

- 使用 git 提交代码时，commit message 要写明具体的修改目的
- 保持 commit 的习惯，做完一个小的 feature 后就提交，避免积攒大量改动到一个 commit 中
- 提交后需要发起 Merge Request 进行 Code Review，过程中可能会提一些修改建议，待问题全部解决后代码即可入库

## 开发

- 调用的所有后端接口封装到 `service` 中
- 没有特殊需求时，所有的异步请求都是用 dva 的 effects 来实现
- 所有的表单必须有符合规则的校验，并给出明确的提示
- 表单提交做好防止短时间内重复提交的限制
- 页面数据加载做好 loading 效果和错误的兜底处理
- 非必要场景尽量不要直接操作 DOM，若出现需写明注释
- 开发前会给到接口文档，可以根据需要进行接口的 mock 方便开发

## 联调

- 配合后端人员进行联调，过程中可能会出现一些接口的微调（尽量避免），这时需要前端配合调整
- 联调完成一个模块后在提交前，将 mock 的代码移除
