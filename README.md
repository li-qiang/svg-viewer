# SVG Popup Zoom Viewer

一个让网页上的 SVG 支持「按下 Cmd/Ctrl 时显示放大镜，点击弹窗放大、拖动、缩放」的油猴脚本。让 SVG 交互更自然，避免 SVG 默认显得可交互，只有在需要时才显示放大功能。

## 功能特性

- 仅在按下 Cmd（Mac）或 Ctrl（Windows/Linux）时，SVG 显示可放大光标
- 点击 SVG（按住 Cmd/Ctrl）弹出大图预览
- 弹窗支持拖动、缩放（快捷键 + / -），ESC 关闭
- 支持多页面自动适配，定时增强新出现的 SVG
- 不影响原网页交互体验

## 安装方法

1. 安装 [Tampermonkey](https://www.tampermonkey.net/) 浏览器扩展
2. [点此安装脚本](#)（将 `index.js` 作为用户脚本添加到 Tampermonkey）

## 使用说明

- 按住 `Cmd`（Mac）或 `Ctrl`（Windows/Linux）时，将鼠标悬停在 SVG 上会显示放大镜光标
- 此时点击 SVG，会弹出 SVG 大图预览
- 弹窗内可用鼠标拖动大图
- 使用键盘 `+` 或 `-` 可缩放，`ESC` 关闭弹窗

## 适用场景

- 设计稿、图标库、数据可视化等含有 SVG 的网页
- 需要临时放大查看 SVG 细节的场景

## 兼容性

- 适用于大多数现代浏览器（需支持 Tampermonkey）
- 支持所有网页（`*://*/*`）

## 贡献与反馈

如有建议或 bug，欢迎提 issue 或 PR！ 