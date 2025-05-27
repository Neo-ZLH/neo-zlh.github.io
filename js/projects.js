/**
 * 项目陈列室脚本
 * 负责加载和展示GitHub项目信息
 */

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // 初始化项目陈列室
    initProjects();
});

/**
 * 初始化项目陈列室
 */
function initProjects() {
    const projectsContainer = document.querySelector('.projects-container');
    if (!projectsContainer) return;
    
    // 获取项目数据
    fetchProjects()
        .then(projects => {
            // 清空加载提示
            projectsContainer.innerHTML = '';
            
            // 创建项目卡片
            projects.forEach(project => {
                const projectCard = createProjectCard(project);
                projectsContainer.appendChild(projectCard);
            });
        })
        .catch(error => {
            console.error('Error loading projects:', error);
            projectsContainer.innerHTML = `<div class="text-center text-red-500 py-8 md:col-span-2">加载项目数据时出错</div>`;
        });
}

/**
 * 获取项目数据
 * 在实际应用中，可以使用GitHub API获取真实数据
 */
async function fetchProjects() {
    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 示例项目数据
    return [
        {
            name: 'DataGovernancePlatform',
            description: '企业级数据治理平台，提供数据质量评估、元数据管理、数据血缘分析和数据标准化功能。',
            language: 'Python',
            stars: 128,
            forks: 45,
            url: 'https://github.com/Neo-ZLH/DataGovernancePlatform',
            homepage: '#',
            topics: ['data-governance', 'python', 'flask', 'react', 'machine-learning'],
            installCommand: 'pip install data-governance-platform'
        },
        {
            name: 'DistributedDB',
            description: '高性能分布式数据库系统，支持强一致性事务和水平扩展，适用于高并发OLTP场景。',
            language: 'C++',
            stars: 256,
            forks: 78,
            url: 'https://github.com/Neo-ZLH/DistributedDB',
            homepage: '#',
            topics: ['database', 'distributed-systems', 'c-plus-plus', 'consensus', 'transaction'],
            installCommand: 'git clone https://github.com/Neo-ZLH/DistributedDB && cd DistributedDB && make install'
        },
        {
            name: 'KnowledgeGraphEmbedding',
            description: '知识图谱嵌入模型库，包含多种最新的图嵌入算法实现，支持时序知识图谱。',
            language: 'Python',
            stars: 342,
            forks: 124,
            url: 'https://github.com/Neo-ZLH/KnowledgeGraphEmbedding',
            homepage: '#',
            topics: ['knowledge-graph', 'graph-embedding', 'pytorch', 'deep-learning', 'nlp'],
            installCommand: 'pip install kg-embedding'
        },
        {
            name: 'AnomalyDetectionSystem',
            description: '基于深度学习的数据异常检测系统，能够自动识别多种类型的数据异常，并提供可解释的分析。',
            language: 'Python',
            stars: 187,
            forks: 56,
            url: 'https://github.com/Neo-ZLH/AnomalyDetectionSystem',
            homepage: '#',
            topics: ['anomaly-detection', 'machine-learning', 'deep-learning', 'data-science', 'explainable-ai'],
            installCommand: 'pip install anomaly-detection-system'
        }
    ];
}

/**
 * 从GitHub API获取用户仓库
 * 注意：GitHub API有速率限制，实际应用中需要处理认证和限制问题
 */
async function fetchGitHubProjects(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=10`);
        if (!response.ok) throw new Error('Failed to fetch GitHub repos');
        
        const repos = await response.json();
        
        // 转换为我们需要的格式
        return repos.map(repo => ({
            name: repo.name,
            description: repo.description || '无描述',
            language: repo.language,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            url: repo.html_url,
            homepage: repo.homepage,
            topics: repo.topics || [],
            installCommand: repo.language === 'Python' ? `pip install ${repo.name.toLowerCase()}` : 
                           repo.language === 'JavaScript' ? `npm install ${repo.name.toLowerCase()}` :
                           `git clone ${repo.html_url}`
        }));
    } catch (error) {
        console.error('Error fetching GitHub projects:', error);
        throw error;
    }
}

/**
 * 创建项目卡片
 */
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card fade-in';
    
    // 技术栈徽章
    const techBadges = project.topics.map(topic => 
        `<span class="tech-badge">${topic}</span>`
    ).join('');
    
    // 构建卡片内容
    card.innerHTML = `
        <h3 class="project-title">${project.name}</h3>
        <p class="project-description">${project.description}</p>
        <div class="tech-stack">
            ${techBadges}
        </div>
        <div class="install-command">${project.installCommand}</div>
        <div class="project-stats">
            <div class="stat-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                </svg>
                ${project.stars}
            </div>
            <div class="stat-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"/>
                </svg>
                ${project.forks}
            </div>
            <div class="stat-item">
                <span class="px-2 py-1 text-xs rounded" style="background-color: rgba(0, 255, 0, 0.1);">${project.language}</span>
            </div>
        </div>
    `;
    
    // 添加点击事件，跳转到GitHub仓库
    card.addEventListener('click', () => {
        window.open(project.url, '_blank');
    });
    
    return card;
}

/**
 * 获取GitHub贡献度数据
 * 在实际应用中，可以使用GitHub API获取贡献数据
 */
async function fetchGitHubContributions(username) {
    try {
        // 注意：GitHub API不直接提供贡献图数据
        // 这里需要使用GraphQL API或解析HTML
        // 这是一个简化的示例
        const response = await fetch(`https://github.com/users/${username}/contributions`);
        if (!response.ok) throw new Error('Failed to fetch contributions');
        
        const html = await response.text();
        // 解析HTML获取贡献数据
        // 这需要在实际应用中实现
        
        return [];
    } catch (error) {
        console.error('Error fetching GitHub contributions:', error);
        return [];
    }
}