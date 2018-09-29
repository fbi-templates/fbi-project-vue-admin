# fbi-project-vue-admin

基于 [vue](https://github.com/vuejs/vue) 和
[element](https://github.com/ElemeFE/element) 的管理系统模板。参考了强大的
[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)。

## 依赖

- [fbi](https://github.com/AlloyTeam/fbi) `v3.0+`
- [node](https://nodejs.org/en/) `v7.6+`

## 特性

- 权限验证：支持路由、页面区块、按钮的权限验证。使
  用[vue-role-manager](https://github.com/neikvon/vue-role-manager)。
- 国际化支持
- UI 尺寸设置
- 简单的本地数据 Mock，对源代码无侵入，随开发服务器启动
- 多个参考示例，位于`src/examples`，不用担心，它们只在本地开发时可见，不会参与生
  产构建

## 使用

1. **添加模板**

   ```bash
   $ fbi add https://github.com/fbi-templates/fbi-project-vue-admin.git
   ```

1. **创建项目**

   ```bash
   $ cd path/to/empty-folder
   $ fbi init -o vue-admin
   ```

1. **查看可用任务**

   ```bash
   $ fbi ls
   ```

1. **运行任务**

   - 本地开发
     ```bash
     $ fbi s
     ```
   - 生产构建
     ```bash
     $ fbi b
     ```

## 任务说明

### `serve`

- 启动开发服务器
- 别名: `s`
- 示例:
  - `fbi s`
  - `fbi s -port=9999`
    > 指定服务端口号 (如果要使用 VScode 调试，请记得修改 `.vscode/launch.json`
    > 中的默认端口号 8888)

### `build`

- 生产构建
- 参数:
  - `p/prod` `{Boolean}` (默认) 生产环境
  - `t/test` `{Boolean}` 测试环境
- 别名: `b`
- 示例:
  - `fbi b // 构建到生产环境`
  - `fbi b -p // 构建到生产环境`
  - `fbi b -t // 构建到测试环境`

## 更新模板

1. 更新本地全局模板

   ```bash
   $ fbi up vue-admin
   ```

1. 更新项目使用的模板版本

   ```bash
   $ fbi use [版本号]  # 版本号可通过 fbi ls store 查看
   ```

1.  更新配置文件或任务

   ```bash
   $ fbi init -o/-t    # 原配置文件和任务会备份在fbi-bak目录
   ```

## VSCode 断点调试

1. `fbi s`
2. 在 VSCode 内按 F5 快捷键

## 更多

- [官方模板](https://github.com/fbi-templates)
- [fbi 文档](https://neikvon.gitbooks.io/fbi/content/)

## [CHANGELOG](CHANGELOG.md)

## [MIT License](LICENSE)
