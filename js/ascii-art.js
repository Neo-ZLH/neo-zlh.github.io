/**
 * ASCII艺术生成脚本
 * 负责生成和动画展示ASCII艺术
 */

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // 初始化ASCII艺术
    initAsciiArt();
});

/**
 * 初始化ASCII艺术
 */
function initAsciiArt() {
    const asciiArtContainer = document.getElementById('ascii-art');
    if (!asciiArtContainer) return;
    
    // Neo Zhang的ASCII艺术
    const asciiArt = `
 _   _             ______                    
| \ | |           |___  /                    
|  \| | ___  ___     / / ___   __ _ _ __   __ _ 
| . \  |/ _ \/ _ \   / / / _ \ / _\  | '_ \ / _\  |
| |\  |  __/ (_) | / /_| (_) | (_| | | | | (_| |
|_| \_|\___|\___/ /_____\___/ \__,_|_| |_|\__, |
                                          __/ |
                                         |___/ 
`;
    
    // 逐字打印动画
    let index = 0;
    const printInterval = setInterval(() => {
        if (index < asciiArt.length) {
            asciiArtContainer.textContent += asciiArt.charAt(index);
            index++;
        } else {
            clearInterval(printInterval);
            // 添加闪烁光标效果
            addBlinkingCursor(asciiArtContainer);
        }
    }, 20);
}

/**
 * 添加闪烁光标效果
 */
function addBlinkingCursor(container) {
    const cursor = document.createElement('span');
    cursor.className = 'ascii-cursor';
    cursor.textContent = '_';
    cursor.style.animation = 'blink 1s step-end infinite';
    container.appendChild(cursor);
    
    // 添加闪烁动画样式
    if (!document.querySelector('#cursor-style')) {
        const style = document.createElement('style');
        style.id = 'cursor-style';
        style.textContent = `
            @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
            .ascii-cursor {
                color: var(--cyber-green);
                font-weight: bold;
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * 生成随机ASCII艺术
 * 可用于创建动态变化的背景效果
 */
function generateRandomAscii(width, height) {
    const characters = '01';
    let result = '';
    
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        result += '\n';
    }
    
    return result;
}

/**
 * 创建Matrix风格的下落效果
 * 可以在特定区域添加动态效果
 */
function createMatrixEffect(container, width, height, speed = 100) {
    // 创建画布
    const canvas = document.createElement('div');
    canvas.style.fontFamily = 'monospace';
    canvas.style.lineHeight = '1';
    canvas.style.color = 'var(--cyber-green)';
    canvas.style.fontSize = '10px';
    container.appendChild(canvas);
    
    // 创建矩阵数据
    const matrix = [];
    for (let i = 0; i < width; i++) {
        matrix[i] = Math.floor(Math.random() * height);
    }
    
    // 更新函数
    function updateMatrix() {
        let output = '';
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                if (i === matrix[j]) {
                    output += '1';
                } else if (i < matrix[j] && i > matrix[j] - 10) {
                    const intensity = 9 - (matrix[j] - i);
                    const alpha = intensity / 10;
                    output += `<span style="opacity: ${alpha}">1</span>`;
                } else {
                    output += ' ';
                }
            }
            output += '<br>';
        }
        canvas.innerHTML = output;
        
        // 更新矩阵位置
        for (let i = 0; i < width; i++) {
            if (Math.random() > 0.975) {
                matrix[i] = 0;
            } else {
                matrix[i]++;
                if (matrix[i] >= height) {
                    matrix[i] = 0;
                }
            }
        }
    }
    
    // 启动动画
    const interval = setInterval(updateMatrix, speed);
    
    // 返回清理函数
    return () => clearInterval(interval);
}