# 极客风格学术个人网站

一个极简、极客风格的个人学术展示网站，采用纯前端实现（HTML/CSS/JavaScript），具有终端风格的UI和交互体验。

## 特点

- **极简极客风格**：暗色主题、等宽字体、终端风格UI
- **响应式设计**：适配桌面和移动设备
- **PWA支持**：可安装到主屏幕，支持离线访问
- **无依赖**：纯原生JavaScript实现，无需框架
- **高性能**：轻量级代码，快速加载

## 核心功能

1. **个人名片区**：展示个人基本信息和ASCII艺术
2. **学术成果墙**：按时间轴展示论文发表情况
3. **项目陈列室**：展示GitHub项目和其他作品
4. **技术博客聚合**：展示技术博客文章
5. **多媒体空间**：展示图片作品
6. **终端模拟器**：提供命令行交互体验

## 文件结构

```
/
├── index.html          # 主页面
├── 404.html           # 404错误页面
├── manifest.json      # PWA配置文件
├── service-worker.js  # Service Worker脚本
├── README.md          # 项目说明文档
├── css/
│   └── style.css      # 样式表
└── js/
    ├── main.js        # 主脚本
    ├── ascii-art.js   # ASCII艺术生成脚本
    ├── terminal.js    # 终端模拟器脚本
    ├── publications.js # 学术成果展示脚本
    ├── projects.js    # 项目展示脚本
    ├── blogs.js       # 博客聚合脚本
    └── gallery.js     # 图片展示脚本
```

## 使用方法

### 本地运行

1. 克隆仓库到本地
2. 使用任意HTTP服务器启动项目

```bash
# 使用Python启动简易HTTP服务器
python -m http.server

# 或使用Node.js的http-server
npx http-server
```

3. 在浏览器中访问 `http://localhost:8000` 或对应端口

### 部署到GitHub Pages

1. 创建GitHub仓库
2. 将代码推送到仓库的`main`或`master`分支
3. 在仓库设置中启用GitHub Pages

## 自定义内容

### 修改个人信息

编辑 `index.html` 文件中的个人信息部分：

```html
<section id="profile" class="section profile-section">
    <!-- 修改这里的个人信息 -->
</section>
```

### 添加学术成果

编辑 `js/publications.js` 文件中的论文数据：

```javascript
// 示例论文数据
return [
    {
        title: "论文标题",
        authors: ["作者1", "作者2"],
        journal: "期刊名称",
        year: 2023,
        // 其他信息...
    },
    // 添加更多论文...
];
```

### 添加项目

编辑 `js/projects.js` 文件中的项目数据：

```javascript
// 示例项目数据
return [
    {
        name: "项目名称",
        description: "项目描述",
        // 其他信息...
    },
    // 添加更多项目...
];
```

### 添加博客文章

编辑 `js/blogs.js` 文件中的博客数据：

```javascript
// 示例博客数据
return [
    {
        title: "文章标题",
        summary: "文章摘要",
        // 其他信息...
    },
    // 添加更多文章...
];
```

### 添加图片

编辑 `js/gallery.js` 文件中的图片数据：

```javascript
// 示例图片数据
return [
    {
        title: "图片标题",
        description: "图片描述",
        url: "图片URL",
        // 其他信息...
    },
    // 添加更多图片...
];
```

### 修改终端命令

编辑 `js/terminal.js` 文件中的命令处理函数：

```javascript
// 添加自定义命令
function processCommand(command) {
    // 添加新命令处理逻辑
}
```

## 技术细节

- **HTML5**：语义化标签，结构清晰
- **CSS3**：Flexbox和Grid布局，变量，动画效果
- **JavaScript**：ES6+语法，模块化设计
- **PWA**：Service Worker缓存，离线访问
- **响应式设计**：媒体查询，适配不同设备

## 浏览器兼容性

- Chrome 60+
- Firefox 60+
- Safari 11+
- Edge 79+

## 许可证

MIT