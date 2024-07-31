# 仿问卷星 - 服务端模拟响应

${\bf{\Large{@Description}}}$ 该项目基于 `koa` 搭建一个**后端服务**，用于处理前端请求，并响应基于 `mockjs` 生成的模拟数据。

## 技术栈

```
koa  + mockjs + nodejs + typescript
```
> `koa` 用于开启 http 服务；`mockjs` 使用 Random 模块模拟数据；`typescript` 进行类型控制

### 依赖

```json
"dependencies": {
    "koa": "^2.15.3",
    "koa-router": "^12.0.1",
    "mockjs": "^1.1.0"
},
"devDependencies": {
    "@types/koa": "^2.15.0",
    "@types/koa-router": "^7.4.8",
    "@types/mockjs": "^1.0.10",
    "nodemon": "^3.1.4",
    "typescript": "^5.5.4"
}
```

### 脚本

```json
"scripts": {
    "dev": "tsc && nodemon dist/index.js"
},
```

## 项目结构

```bash
src/
- /index.ts 使用路由规则，启动 3000 端口服务
- /mock 路由规则
- /data 模拟数据
- /type 类型文件
```

## TS 类型

### RouteType 

```ts
type RouteType = {
    url: string;
    method: string;
    response: ResType;
};
```

### ResType 

```ts
type ResType = (ctx?: Context) => {
    errno: number;
    data?: object;
    message?: string;
};
```

### QuestionType 

```ts
type QuestionType = {
    id: string;
    title: string;
    isPublished: boolean;
    isStar: boolean;
    answerCount: number;
    createdAt: string;
    isDeleted: boolean;
};
```

## 路由设计

### 问卷 API

#### 获取单个问卷信息 `get: /api/question/:id`

```json
/* 获取单个问卷信息
  method -> get
  path -> /api/question/:id
  response -> { errno: 0, data: { id, title, ... } }
*/
{
    url: "/api/question/:id",
    method: "get",
    response() {
      return {
        errno: 0,
        data: {
          id: Random.id(),
          title: Random.ctitle(),
        },
      };
    },
},
```

#### 创建问卷 `post: /api/question`

```json
/* 创建问卷
  method -> post
  path -> /api/question
  request body -> 无
  response -> { errno: 0, data: { id } }
*/
{
url: "/api/question",
method: "post",
response() {
  return {
    errno: 0,
    data: {
      id: Random.id(),
    },
  };
},
},
```

#### 查询问卷列表 `get: /api/question`

```json
/* 查询问卷列表
  method -> get
  path -> /api/question
  response -> { errno: 0, data: { list: [...] }, total }
*/
{
url: "/api/question",
method: "get",
response(ctx) {
  return {
    errno: 0,
    data: {
      list: getQuestionList(), // 当前页
      total: 100, // 总数
    },
  };
},
},
```



### 测试 API



