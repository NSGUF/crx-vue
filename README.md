# crx-vue手脚架

## 1.Project setup
```
yarn install
yarn run serve
yarn run build
```
>打包好的dist直接打包成crx即可

## 2.server为服务器位置（koa2+typeorm+mongodb）
```
cd server
yarn
yarn run server
```

PS：先启动好服务，然后修改crx-vue/src/utils/config.ts中的服务的ip和端口；然后完成第1步，最后去chrome中打包成crx


## 3.开发中遇到的问题

1. RepositoryNotFoundError: No repository for "User" was found. Looks like this entity is not registered in current "default" connection?
      at new RepositoryNotFoundError (C:\Users\Administrator\Desktop\crx-vue\server\node_modules\_typeorm@0.2.18@typeorm\error\RepositoryNotFoundError.js:11:28)
      at EntityManager.getRepository (C:\Users\Administrator\Desktop\crx-vue\server\node_modules\_typeorm@0.2.18@typeorm\entity-manager\EntityManager.js:555:19)
      at C:\Users\Administrator\Desktop\crx-vue\server\dist\controller\UserController.js:17:59
      at Generator.next (<anonymous>)
      at C:\Users\Administrator\Desktop\crx-vue\server\dist\controller\UserController.js:7:71
      at new Promise (<anonymous>)
      at __awaiter (C:\Users\Administrator\Desktop\crx-vue\server\dist\controller\UserController.js:3:12)
      at getUsers (C:\Users\Administrator\Desktop\crx-vue\server\dist\controller\UserController.js:16:16)
      at dispatch (C:\Users\Administrator\Desktop\crx-vue\server\node_modules\_koa-compose@3.2.1@koa-compose\index.js:44:32)
      at next (C:\Users\Administrator\Desktop\crx-vue\server\node_modules\_koa-compose@3.2.1@koa-compose\index.js:45:18)
> 把entity里面的类名改成小写开头，用tsc编译会发现实体类自动变成小写，导致对应的大写名找不到；  
2. TypeError: Cannot read property 'createValueMap' of u
>把对应Entity的id改成@ObjectIdColumn
