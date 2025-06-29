// ==UserScript==
// @name         SVG Popup Zoom Viewer (Cmd Trigger + Cursor Only On Press)
// @namespace    http://tampermonkey.net/
// @version      0.9
// @description  只有按下 Cmd/Ctrl 时才显示放大图标，避免 SVG 默认显得可交互。配合点击弹窗放大、拖动、缩放等功能使用更自然！
// @author       ChatGPT
// @match        *://*/*
// @grant        GM_addStyle
// ==/UserScript==

(function () {
    'use strict';
  
    GM_addStyle(`
      .svg-popup-overlay {
        position: fixed;
        top: 0; left: 0;
        width: 100vw; height: 100vh;
        background-color: rgba(0, 0, 0, 0.6);
        z-index: 99999;
        overflow: hidden;
      }
  
      .svg-popup-container-wrapper {
        position: absolute;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%) scale(1);
        transform-origin: center center;
        transition: transform 0.2s ease;
        cursor: grab;
      }
  
      .svg-popup-container {
        background: white;
        padding: 20px;
        border-radius: 8px;
        width: 80vw;
        max-height: 90vh;
        overflow: auto;
        box-shadow: 0 0 20px rgba(0,0,0,0.5);
      }
  
      .svg-popup-container svg {
        display: block;
        width: 100%;
        height: auto;
      }
  
      svg.popup-enhanced.hover-cursor {
        cursor: zoom-in !important;
      }
    `);
  
    let scale = 1;
    let wrapper = null;
    let overlay = null;
    let isModifierPressed = false;
  
    // 弹窗部分略（保持不变）👇
    function createPopup(svgElement) {
      if (document.querySelector('.svg-popup-overlay')) return;
  
      const clonedSvg = svgElement.cloneNode(true);
      clonedSvg.removeAttribute("class");
  
      overlay = document.createElement('div');
      overlay.className = 'svg-popup-overlay';
  
      wrapper = document.createElement('div');
      wrapper.className = 'svg-popup-container-wrapper';
      wrapper.style.transform = 'translate(-50%, -50%) scale(1)';
  
      const container = document.createElement('div');
      container.className = 'svg-popup-container';
      container.appendChild(clonedSvg);
  
      wrapper.appendChild(container);
      overlay.appendChild(wrapper);
      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';
  
      // 拖动
      let isDragging = false;
      let startX, startY, offsetX = 0, offsetY = 0;
  
      wrapper.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        wrapper.style.cursor = 'grabbing';
      });
  
      document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        offsetX += dx;
        offsetY += dy;
        wrapper.style.left = `calc(50% + ${offsetX}px)`;
        wrapper.style.top = `calc(50% + ${offsetY}px)`;
        startX = e.clientX;
        startY = e.clientY;
      });
  
      document.addEventListener('mouseup', () => {
        isDragging = false;
        if (wrapper) wrapper.style.cursor = 'grab';
      });
  
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.remove();
          document.body.style.overflow = '';
          scale = 1;
          wrapper = null;
          overlay = null;
        }
      });
    }
  
    function applyScale() {
      if (wrapper) {
        wrapper.style.transform = `translate(-50%, -50%) scale(${scale})`;
      }
    }
  
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Meta' || e.key === 'Control') {
        isModifierPressed = true;
      }
  
      if (!wrapper) return;
  
      if (e.key === '+' || e.key === '=') {
        scale = Math.min(10, scale * 1.1);
        applyScale();
      }
      if (e.key === '-' || e.key === '_') {
        scale = Math.max(0.1, scale * 0.9);
        applyScale();
      }
      if (e.key === 'Escape' && overlay) {
        overlay.remove();
        document.body.style.overflow = '';
        scale = 1;
        wrapper = null;
        overlay = null;
      }
    });
  
    document.addEventListener('keyup', (e) => {
      if (e.key === 'Meta' || e.key === 'Control') {
        isModifierPressed = false;
      }
    });
  
    function enhanceSVGs() {
      document.querySelectorAll('svg:not(.popup-enhanced)').forEach(svg => {
        svg.classList.add('popup-enhanced');
  
        svg.addEventListener('mouseenter', () => {
          if (isModifierPressed) svg.classList.add('hover-cursor');
        });
  
        svg.addEventListener('mouseleave', () => {
          svg.classList.remove('hover-cursor');
        });
  
        svg.addEventListener('click', function (e) {
          if (e.metaKey || e.ctrlKey) {
            e.stopPropagation();
            createPopup(svg);
          }
        });
      });
    }
  
    enhanceSVGs();
    setInterval(enhanceSVGs, 2000);
  })();
  