# AI 模型架构演进时间轴

交互式可视化项目，展示从传统方法到大模型时代的 112 个 AI 里程碑模型。

**在线访问：** https://aqqqai.homes

## 功能

- **时间轴视图** — 112 个模型按时间排列，左侧分类目录可收起
- **模型详情页** — 架构 SVG 示意图、核心创新、详细解读、参考文献
- **术语卡片** — 192 个专业术语，含数学公式（KaTeX 渲染）和详细解释
- **全局术语表** — 搜索、分类筛选，显示每个概念首次引入的模型
- **架构图** — 数据驱动的 SVG 渲染，支持分组、跳跃连接、并行分支

## 覆盖领域

| 领域 | 模型数 | 示例 |
|------|--------|------|
| 图像分类与视觉骨干 | 12 | LeNet, AlexNet, ResNet, ViT, Swin |
| 目标检测 | 15 | Viola-Jones, YOLO, DETR |
| 语义分割 | 10 | FCN, U-Net, SAM |
| 图像生成 | 12 | GAN, StyleGAN, Stable Diffusion |
| 视频理解与生成 | 10 | I3D, Sora |
| 多模态 | 8 | CLIP, GPT-4V, Gemini |
| 大语言模型 | 15 | Transformer, GPT, LLaMA |
| 语音与音频 | 10 | WaveNet, Whisper |
| 强化学习与博弈 | 8 | AlphaGo, MuZero |
| AI for Science | 10 | AlphaFold2, GraphCast |

## 技术栈

- 纯静态 SPA：HTML + CSS + 原生 ES Modules
- Hash 路由，无框架依赖
- KaTeX 数学公式渲染
- SVG 架构图（数据驱动，支持拓扑结构）
- GitHub Pages 托管

## 本地运行

```bash
# 任意静态服务器即可
npx http-server -p 8080
# 或
python -m http.server 8080
```

浏览器打开 `http://localhost:8080`

## 项目结构

```
├── index.html          # 入口
├── css/styles.css      # 样式
├── js/
│   ├── app.js          # 路由 + 事件处理
│   ├── timeline.js     # 时间轴 + 侧边栏
│   ├── detail.js       # 模型详情页
│   ├── diagram.js      # SVG 架构图渲染器
│   ├── glossary.js     # 术语卡片 + 术语表
│   ├── concepts.js     # 192 条术语数据
│   └── data.js         # 112 个模型数据
└── CNAME               # 自定义域名
```

## 扩展数据

在 `js/data.js` 中追加模型记录即可，格式参考已有条目。术语数据在 `js/concepts.js` 中追加。
