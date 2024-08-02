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

```
method -> get
path -> /api/question/:id
response -> { errno: 0, data: { id, title, ... } }
```

#### 创建问卷 `post: /api/question`

```
method -> post
path -> /api/question
request body -> 无
response -> { errno: 0, data: { id } }
```

#### 查询问卷列表 `get: /api/question`

```
method -> get
path -> /api/question
response -> { errno: 0, data: { list: [...] }, total }
```
#### 更新问卷 `patch: /api/question/:id`

```
method -> patch
path -> /api/question/:id
request body -> { title, isStar, ... }
response -> { errno: 0 }
```

#### 复制问卷 `post: /api/question/:id`

```
method -> post
path -> /api/question/:id
response -> { errno: 0, data: { id } }
```

#### 删除问卷 `delete: /api/question`

```
method -> delete
path -> /api/question
request body -> { ids: [ ... ] }
response -> { errno: 0 }
```

### 用户 API

#### 获取用户信息 `get: /api/user/info`

``` 
method -> get
path -> /api/user/info
response -> { errno: 0, data: { ... } } 
```

#### 注册 `post: /api/user/register`

```
method -> post
path -> /api/user/register
request body -> { username, password, nickname }
response -> { errno: 0 } 
```

#### 登录 `post: /api/user/login`

```
method -> post
path -> /api/user/login
request body -> { username, password }
response -> { errno: 0, data: { token } } (JWT token)
```

### 测试 API

#### 测试数据 `get: /api/test`

```
method -> get
path: /api/test
reponse -> { errno: 0, data: { name } }
```