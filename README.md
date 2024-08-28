# 仿问卷星 - 服务端模拟响应

该项目基于 `koa` 搭建一个**后端服务**，用于处理前端请求，并响应基于 `mockjs` 生成的**模拟数据**。

> 该模拟服务已经部署在 vercel 上，可以通过 https://wenjuan-mock.vercel.app/ 访问 mock 接口

## 1. QuickStart - 启动服务 o(*￣▽￣*)ブ

```bash
npm install
npm serve
```

## 2. 技术栈

```
koa  + mockjs + nodejs + typescript
```
> `koa` 用于开启 http 服务；`mockjs` 使用 Random 模块模拟数据；`typescript` 进行类型控制

## 3. 项目结构

```bash
src/
- /index.ts 使用路由规则，启动 3000 端口服务
- /mock 路由规则
- /data 模拟数据
- /type 类型文件
```

## 4. 接口文档

> 接口响应中的 errno 表示错误码，errno=0 表示成功，否则表示失败。

### 4.1 user

user API 用于处理用户数据

|     功能     |         url          | method |                       request body                       |                           response                           |
| :----------: | :------------------: | :----: | :------------------------------------------------------: | :----------------------------------------------------------: |
| 获取用户信息 |   `/api/user/info`   | `GET`  |                                                          | `{errno: number, data: {username: string, nickname: string}}` |
|   用户注册   | `/api/user/register` | `POST` | `{username: string, password: string, nickname: string}` |                      `{errno: number}`                       |
|   用户登录   |  `/api/user/login`   | `POST` |                  `{username, password}`                  |           `{errno: number, data: {token: string}}`           |

### 4.2 question

question API 用于处理问卷数据

|       功能       |                             url                              |  method  |      request body      |                           response                           |
| :--------------: | :----------------------------------------------------------: | :------: | :--------------------: | :----------------------------------------------------------: |
| 获取特定问卷信息 |                     `/api/question/:id`                      |  `GET`   |                        | `{errno: number, data: {id: string, title: string, desc: string, js: string, css: string, isPublished: boolean: isDeleted: boolean, componentList: Array<ComponentType>}}` |
|     创建问卷     |                       `/api/question`                        |  `POST`  |                        |            `{errno: number, data: {id: string}}`             |
|   查询问卷列表   | `/api/question?keywords=&isDeleted=&isStar=& page=&pageSize=` |  `GET`   |                        | `{errno: number, data: {list: Array<QUestionType>, total: number}}` |
|   更新特定问卷   |                     `/api/question?:id`                      |  PATCH   |                        |                      `{errno: number}`                       |
|   复制特定问卷   |                `/api/question/duplicate/:id`                 |  `POST`  |                        |            `{errno: number, data: {id: string}}`             |
|   删除特定问卷   |                       `/api/question`                        | `DELETE` | `{ids: Array<string>}` |                      `{errno: number}`                       |

> `ComponentType` 类型为
>
> ```ts
> {
>   fe_id: string;
>   type: string;
>   title: string;
>   isHidden: boolean;
>   isLocked: boolean;
>   props: { [key: string]: any; };
> };
> ```

> `QuestionType` 类型为
>
> ```ts
> {
>   id: string;
>   title: string;
>   isPublished: boolean;
>   isStar: boolean;
>   answerCount: number;
>   createdAt: string;
>   isDeleted: boolean;
> };
> ```

### 4.3 statistic

statistic API 用于处理问卷统计数据

|               功能               |                 url                  | method | request body |                           response                           |
| :------------------------------: | :----------------------------------: | :----: | :----------: | :----------------------------------------------------------: |
|      获取特定问卷的答卷列表      |       `/api/stat/:questionId`        | `GET`  |              | `{errno: number, data: {total: number, list: Array<AnswerType>}}` |
| 获取特定问卷的特定组件的统计数据 | `/api/stat/:questionId/:componentId` | `GET`  |              | `{errno: number, data: {stat: Array<{name: string, count: number}>}}` |

> `AnswerType` 的类型为
>
> ```ts
> {
>   _id: string;
>   [component_id: string]: any
> }
> ```

### 4.4 answer

answer API 用于处理用户提交的答卷数据

|        功能        |      url      | method | request body |     response      |
| :----------------: | :-----------: | :----: | :----------: | :---------------: |
| 收集用户提交的答卷 | `/api/answer` | `POST` |     any      | `{errno: number}` |

### 4.5 test

test API 用于测试 Koa 服务是否重新启动

|     url     | method | request body |                response                 |
| :---------: | :----: | :----------: | :-------------------------------------: |
| `/api/test` | `GET`  |              | `{errno: number, data: {name: string}}` |

## 5. 项目配置

### 5.1 项目依赖

> 以下为 package.json 中的部分配置

```json
"dependencies": {
    "@koa/cors": "^3.2.0",
    "koa": "^2.15.3",
    "koa-bodyparser": "^4.4.1",
    "koa-router": "^12.0.1"
},
"devDependencies": {
    "@types/koa": "^2.15.0",
    "@types/koa__cors": "^5.0.0",
    "@types/koa-bodyparser": "^4.3.12",
    "@types/koa-router": "^7.4.8",
    "@types/mockjs": "^1.0.10",
    "mockjs": "^1.1.0",
    "nodemon": "^3.1.4",
    "ts-node": "^10.9.2",
    "typescript": "^5.5.4"
}
```

1. `koa`：一个现代化、轻量级的 Node.js Web 框架。

   ```ts
   const Koa = require('koa');
   const app = new Koa();
   
   app.use(async ctx => {
     ctx.body = 'Hello World';
   });
   
   app.listen(3000);
   console.log('Server running on http://localhost:3000');
   ```

2. `koa-bodyparser`：一个 Koa 的中间件，用于解析请求体的数据，支持 `JSON`、`表单` 等格式。

   ```ts
   const Koa = require('koa');
   const bodyParser = require('koa-bodyparser');
   const app = new Koa();
   
   app.use(bodyParser());
   
   app.use(async ctx => {
     if (ctx.method === 'POST') {
       ctx.body = `Received: ${JSON.stringify(ctx.request.body)}`;
     } else {
       ctx.body = 'Send a POST request';
     }
   });
   
   app.listen(3000);
   console.log('Server running on http://localhost:3000');
   ```

3. `koa-cors`：Koa 的 CORS（跨域资源共享）中间件，用于配置允许哪些外部域可以访问您的资源。

   ```ts
   const Koa = require('koa');
   const cors = require('@koa/cors');
   const app = new Koa();
   
   app.use(cors({
     origin: '*', // 允许所有域
   }));
   
   app.use(async ctx => {
     ctx.body = 'CORS enabled!';
   });
   
   app.listen(3000);
   console.log('Server running on http://localhost:3000');
   ```

4. `koa-router`：Koa 的路由中间件，允许您定义不同路径（路由）及其对应的处理逻辑，是构建 RESTful API 的重要工具。

   ```ts
   const Koa = require('koa');
   const Router = require('koa-router');
   const app = new Koa();
   const router = new Router();
   
   router.get('/', async ctx => {
     ctx.body = 'Home Page';
   });
   
   router.get('/about', async ctx => {
     ctx.body = 'About Page';
   });
   
   app.use(router.routes()).use(router.allowedMethods());
   
   app.listen(3000);
   console.log('Server running on http://localhost:3000');
   ```

5. `mockjs`：一个模拟数据生成器，可以用来生成随机数据或模拟 API 响应，常用于前端开发中的测试和本地开发环境。

6. `nodemon`：一个开发工具，用于自动监测文件变化并重启 Node.js 应用，从而提高开发效率，避免手动重启服务器。

7. `ts-node`：一个 TypeScript 执行器，允许您直接运行 TypeScript 文件，无需先将其编译为 JavaScript，是开发 TypeScript 应用的常用工具。

8. `typescript`：JavaScript 的超集，增加了静态类型检查，帮助开发者发现潜在的错误并提高代码质量。

### 5.2 npm scripts

> 以下为 package.json 中的部分配置

```json
"scripts": {
    "serve": "nodemon --exec ts-node src/index.ts",
    "start": "ts-node src/index.ts",
    "build": "ts-node src/index.ts"
},
```

### 5.3 TS 配置

> 以下为 tsconfig.json 中的配置。tsconfig.json 是 TypeScript 项目的配置文件，用于指定编译器选项、项目的根目录、包含或排除的文件等。它控制着 TypeScript 编译器 (tsc) 如何处理代码，并决定项目中 TypeScript 的行为。

```json
{
  "compilerOptions": { // 指定编译选项
    "target": "es6", // 目标 JavaScript 版本
    "module": "commonjs", // 模块系统
    "outDir": "./dist",
    "strict": true, // 启用所有严格类型检查选项
    "esModuleInterop": true // // 允许与 CommonJS 模块进行互操作
  },
  "include": ["./src/**/*"] // 包含所有 src 目录下的 TypeScript 文件
}
```

### 5.4 Vercel 配置

> 以下为 vercel.json 中的配置。vercel.json 是 Vercel 平台上用于配置项目部署的文件。通过这个文件，你可以控制项目的部署行为、路由规则、环境变量、构建设置等。

```json
{
  "version": 2, // 指定 Vercel 配置文件的版本
  /* 指定构建步骤，定义了 Vercel 如何将源代码编译或打包成可以在服务器上运行的形式。 */
  "builds": [
    {
      /* 定义了构建的入口文件。 */
      "src": "src/index.ts",
      /* 指定了要使用的构建器。
      @vercel/node 是 Vercel 提供的一个 Node.js 构建器，它可以将 Node.js 项目打包为 Serverless 函数。 */
      "use": "@vercel/node",
      "config": {
        /* 指定了在构建过程中需要包含的文件或文件夹。
          这确保了 Vercel 在部署时会把 src 目录下的所有文件以及 node_modules 下的所有依赖都包含进去。 */
        "includeFiles": [
          "src/**/*",
          "node_modules/**/*"
        ]
      }
    }
  ],
  /* 配置路由规则，定义了用户访问某个 URL 时应该如何处理请求。 */
  "routes": [
    /* 所有匹配的请求都会被重定向到 src/index.ts */
    {
      "src": "/(.*)",
      "dest": "src/index.ts"
    }
  ]
}
```

