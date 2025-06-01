/**
 * 终端模拟器脚本
 * 实现类似命令行的交互体验
 */

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // 确保在i18n初始化后再初始化终端
    // 如果window.i18n已经存在，直接初始化终端
    if (window.i18n) {
        initTerminal();
    } else {
        // 否则等待i18n初始化完成
        const checkI18n = setInterval(() => {
            if (window.i18n) {
                clearInterval(checkI18n);
                initTerminal();
            }
        }, 100);
    }
});

/**
 * 初始化终端模拟器
 */
function initTerminal() {
    const terminal = document.getElementById('terminal');
    const terminalInput = document.querySelector('.terminal-input');
    const terminalOutput = document.querySelector('.terminal-output');
    const terminalClose = document.getElementById('terminal-close');
    
    if (!terminal || !terminalInput || !terminalOutput || !terminalClose) return;
    
    // 关闭按钮事件
    terminalClose.addEventListener('click', () => {
        terminal.style.transform = '';
    });
    
    // 输入框事件
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const command = terminalInput.value.trim();
            if (command) {
                // 添加命令到输出
                addCommandToOutput(command, terminalOutput);
                // 处理命令
                processCommand(command, terminalOutput);
                // 清空输入
                terminalInput.value = '';
            }
        }
    });
    
    // 点击终端任意位置聚焦输入框
    terminal.addEventListener('click', () => {
        terminalInput.focus();
    });
    
    // 添加欢迎消息
    // 确保 window.i18n 存在
    if (window.i18n && window.i18n.t) {
        addMessageToOutput(window.i18n.t('terminal_welcome'), terminalOutput);
        addMessageToOutput(window.i18n.t('terminal_help_tip'), terminalOutput);
    } else {
        // 如果 i18n 未初始化，使用默认消息
        addMessageToOutput('欢迎使用Neo Zhang的终端模拟器！', terminalOutput);
        addMessageToOutput('输入 "help" 获取可用命令列表。', terminalOutput);
    }
}

/**
 * 添加命令到输出
 */
function addCommandToOutput(command, outputElement) {
    const commandElement = document.createElement('div');
    commandElement.className = 'terminal-message';
    commandElement.innerHTML = `<span class="text-cyber-green">$</span> <span class="terminal-command">${escapeHtml(command)}</span>`;
    outputElement.appendChild(commandElement);
    
    // 滚动到底部
    outputElement.scrollTop = outputElement.scrollHeight;
}

/**
 * 添加消息到输出
 */
function addMessageToOutput(message, outputElement, type = 'result') {
    const messageElement = document.createElement('div');
    messageElement.className = `terminal-message terminal-${type}`;
    messageElement.textContent = message;
    outputElement.appendChild(messageElement);
    
    // 滚动到底部
    outputElement.scrollTop = outputElement.scrollHeight;
}

/**
 * 处理命令
 */
function processCommand(command, outputElement) {
    const cmd = command.toLowerCase();
    const args = command.split(' ').slice(1);
    
    switch (cmd) {
        case 'help':
            showHelp(outputElement);
            break;
        case 'about':
            showAbout(outputElement);
            break;
        case 'skills':
            showSkills(outputElement);
            break;
        case 'contact':
            showContact(outputElement);
            break;
        case 'projects':
            showProjects(outputElement);
            break;
        case 'publications':
            showPublications(outputElement);
            break;
        case 'clear':
            clearTerminal(outputElement);
            break;
        case 'echo':
            echoCommand(args, outputElement);
            break;
        case 'date':
            showDate(outputElement);
            break;
        case 'github':
            openGitHub(outputElement);
            break;
        case 'exit':
            exitTerminal();
            break;
        case 'matrix':
            showMatrixEffect(outputElement);
            break;
        case 'ascii':
            showAsciiArt(outputElement);
            break;
        default:
            // 使用格式化字符串替换参数
            let notFoundMsg;
            if (window.i18n && window.i18n.t) {
                notFoundMsg = window.i18n.t('terminal_command_not_found').replace('{0}', command);
            } else {
                notFoundMsg = `命令未找到: ${command}. 输入 'help' 获取可用命令列表。`;
            }
            addMessageToOutput(notFoundMsg, outputElement, 'error');
    }
}

/**
 * 显示帮助信息
 */
function showHelp(outputElement) {
    let helpText;
    
    // 检查 i18n 是否初始化
    if (window.i18n && window.i18n.t) {
        const t = window.i18n.t;
        helpText = [
            t('cmd_available'),
            `  help          - ${t('cmd_help')}`,
            `  about         - ${t('cmd_about')}`,
            `  skills        - ${t('cmd_skills')}`,
            `  contact       - ${t('cmd_contact')}`,
            `  projects      - ${t('cmd_projects')}`,
            `  publications  - ${t('cmd_publications')}`,
            `  clear         - ${t('cmd_clear')}`,
            `  echo [text]   - ${t('cmd_echo')}`,
            `  date          - ${t('cmd_date')}`,
            `  github        - ${t('cmd_github')}`,
            `  exit          - ${t('cmd_exit')}`,
            `  matrix        - ${t('cmd_matrix')}`,
            `  ascii         - ${t('cmd_ascii')}`,
            '',
            t('cmd_keyboard_shortcuts'),
            `  Alt+T         - ${t('cmd_alt_t')}`,
            `  Alt+G         - ${t('cmd_alt_g')}`,
            `  Alt+H         - ${t('cmd_alt_h')}`,
            `  Alt+P         - ${t('cmd_alt_p')}`,
        ];
    } else {
        // 使用默认中文
        helpText = [
            '可用命令:',
            '  help          - 显示此帮助信息',
            '  about         - 关于Neo Zhang',
            '  skills        - 显示技能列表',
            '  contact       - 显示联系方式',
            '  projects      - 显示项目列表',
            '  publications  - 显示发表的论文',
            '  clear         - 清空终端',
            '  echo [text]   - 显示文本',
            '  date          - 显示当前日期和时间',
            '  github        - 打开GitHub个人主页',
            '  exit          - 关闭终端',
            '  matrix        - 显示Matrix效果',
            '  ascii         - 显示ASCII艺术',
            '',
            '键盘快捷键:',
            '  Alt+T         - 打开/关闭终端',
            '  Alt+G         - 打开GitHub',
            '  Alt+H         - 回到顶部',
            '  Alt+P         - 跳转到项目部分'
        ];
    }
    
    helpText.forEach(line => {
        addMessageToOutput(line, outputElement);
    });
}

/**
 * 显示关于信息
 */
function showAbout(outputElement) {
    let aboutText;
    
    // 检查 i18n 是否初始化
    if (window.i18n && window.i18n.t) {
        const t = window.i18n.t;
        aboutText = [
            t('about_name'),
            t('about_school'),
            t('about_research'),
            '',
            t('about_intro1'),
            t('about_intro2')
        ];
    } else {
        // 使用默认中文
        aboutText = [
            '姓名: 张梁瀚 (Neo Zhang)',
            '院校: 武汉大学计算机学院',
            '研究方向: 数据治理，大数据与数据库，人工智能',
            '',
            '我是一名热爱技术的计算机科学研究者，专注于数据科学和人工智能领域。',
            '通过算法和系统设计，致力于解决复杂的数据问题，推动技术创新。'
        ];
    }
    
    aboutText.forEach(line => {
        addMessageToOutput(line, outputElement);
    });
}

/**
 * 显示技能列表
 */
function showSkills(outputElement) {
    const skills = [
        '编程语言:',
        '  ▓▓▓▓▓▓▓▓▓▓ Python',
        '  ▓▓▓▓▓▓▓▓   Java',
        '  ▓▓▓▓▓▓▓    C/C++',
        '  ▓▓▓▓▓▓     JavaScript',
        '  ▓▓▓▓       SQL',
        '',
        '技术栈:',
        '  ▓▓▓▓▓▓▓▓▓  数据挖掘',
        '  ▓▓▓▓▓▓▓▓   机器学习',
        '  ▓▓▓▓▓▓▓    深度学习',
        '  ▓▓▓▓▓▓     数据库系统',
        '  ▓▓▓▓▓      分布式系统',
        '  ▓▓▓▓       Web开发'
    ];
    
    skills.forEach(line => {
        addMessageToOutput(line, outputElement);
    });
}

/**
 * 显示联系方式
 */
function showContact(outputElement) {
    let contactInfo;
    
    // 检查 i18n 是否初始化
    if (window.i18n && window.i18n.t) {
        const t = window.i18n.t;
        contactInfo = [
            t('contact_email'),
            t('contact_github'),
            t('contact_scholar'),
            '',
            t('contact_message')
        ];
    } else {
        // 使用默认中文
        contactInfo = [
            '邮箱: lianghan.zhang@whu.edu.cn',
            'GitHub: https://github.com/Neo-ZLH',
            'Google Scholar: https://scholar.google.com',
            '',
            '欢迎通过以上方式与我联系，探讨学术研究或技术合作。'
        ];
    }
    
    contactInfo.forEach(line => {
        addMessageToOutput(line, outputElement);
    });
}

/**
 * 显示项目列表
 */
function showProjects(outputElement) {
    // 检查 i18n 是否初始化
    if (window.i18n && window.i18n.t) {
        const t = window.i18n.t;
        addMessageToOutput(t('projects_message1'), outputElement);
        addMessageToOutput(t('projects_message2'), outputElement);
        addMessageToOutput(t('projects_message3'), outputElement);
    } else {
        // 使用默认中文
        addMessageToOutput('项目列表:', outputElement);
        addMessageToOutput('请访问网页中的"项目陈列室"部分查看详细信息。', outputElement);
        addMessageToOutput('或者输入 "github" 命令访问我的GitHub主页。', outputElement);
    }
}

/**
 * 显示发表的论文
 */
function showPublications(outputElement) {
    // 检查 i18n 是否初始化
    if (window.i18n && window.i18n.t) {
        const t = window.i18n.t;
        addMessageToOutput(t('publications_message1'), outputElement);
        addMessageToOutput(t('publications_message2'), outputElement);
    } else {
        // 使用默认中文
        addMessageToOutput('发表的论文:', outputElement);
        addMessageToOutput('请访问网页中的"学术成果墙"部分查看详细信息。', outputElement);
    }
}

/**
 * 清空终端
 */
function clearTerminal(outputElement) {
    outputElement.innerHTML = '';
}

/**
 * Echo命令
 */
function echoCommand(args, outputElement) {
    addMessageToOutput(args.join(' '), outputElement);
}

/**
 * 显示当前日期和时间
 */
function showDate(outputElement) {
    const now = new Date();
    addMessageToOutput(now.toLocaleString(), outputElement);
}

/**
 * 打开GitHub
 */
function openGitHub(outputElement) {
    // 检查 i18n 是否初始化
    if (window.i18n && window.i18n.t) {
        addMessageToOutput(window.i18n.t('github_opening'), outputElement);
    } else {
        // 使用默认中文
        addMessageToOutput('正在打开GitHub...', outputElement);
    }
    window.open('https://github.com/Neo-ZLH', '_blank');
}

/**
 * 关闭终端
 */
function exitTerminal() {
    const terminal = document.getElementById('terminal');
    if (terminal) {
        terminal.style.transform = '';
    }
}

/**
 * 显示Matrix效果
 */
function showMatrixEffect(outputElement) {
    // 创建一个容器
    const container = document.createElement('div');
    container.style.height = '150px';
    container.style.overflow = 'hidden';
    container.style.marginTop = '10px';
    container.style.marginBottom = '10px';
    outputElement.appendChild(container);
    
    // 生成Matrix效果
    const characters = '01';
    const width = 40;
    const height = 10;
    
    // 创建初始显示
    let matrix = '';
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            matrix += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        matrix += '\n';
    }
    
    container.textContent = matrix;
    
    // 动画效果
    let frames = 0;
    const maxFrames = 50;
    const interval = setInterval(() => {
        frames++;
        if (frames >= maxFrames) {
            clearInterval(interval);
            return;
        }
        
        let newMatrix = '';
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                newMatrix += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            newMatrix += '\n';
        }
        
        container.textContent = newMatrix;
    }, 100);
}

/**
 * 显示ASCII艺术
 */
function showAsciiArt(outputElement) {
    const art = `
 _   _             ______                    
| \ | |           |___  /                    
|  \| | ___  ___     / / ___   __ _ _ __   __ _ 
| . \  |/ _ \/ _ \   / / / _ \ / _\  | '_ \ / _\  |
| |\  |  __/ (_) | / /_| (_) | (_| | | | | (_| |
|_| \_|\___|\___/ /_____\___/ \__,_|_| |_|\__, |
                                          __/ |
                                         |___/ 
`;
    
    const pre = document.createElement('pre');
    pre.style.color = 'var(--cyber-green)';
    pre.style.margin = '10px 0';
    pre.textContent = art;
    outputElement.appendChild(pre);
}

/**
 * 辅助函数：HTML转义
 */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}