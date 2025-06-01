/**
 * 项目陈列室脚本
 * 负责加载和展示GitHub项目信息
 */

// 注释掉DOMContentLoaded事件监听器，由main.js统一管理初始化
// document.addEventListener('DOMContentLoaded', () => {
//     // 初始化项目陈列室
//     initProjects();
// });

/**
 * 初始化项目陈列室
 */
function initProjects() {
    console.log('initProjects called');
    
    // 尝试多种选择器以确保找到容器
    let projectsContainer = document.querySelector('.projects-container');
    console.log('Initial container query result:', projectsContainer);
    
    if (!projectsContainer) {
        console.error('Projects container not found with .projects-container selector!');
        // 尝试其他可能的选择器
        projectsContainer = document.querySelector('#projects .projects-container');
        console.log('Secondary container query result:', projectsContainer);
        
        if (!projectsContainer) {
            console.error('Projects container not found with #projects .projects-container selector either!');
            // 尝试直接获取项目部分并手动创建容器
            const projectsSection = document.getElementById('projects');
            console.log('Projects section found:', projectsSection);
            
            if (projectsSection) {
                // 查找现有的加载提示元素
                const loadingElement = projectsSection.querySelector('[data-i18n="loading_projects"]');
                if (loadingElement) {
                    // 使用加载提示元素的父元素作为容器
                    projectsContainer = loadingElement.parentElement;
                    console.log('Using loading element parent as container:', projectsContainer);
                } else {
                    console.error('Loading element not found in projects section');
                }
            } else {
                console.error('Projects section not found at all!');
            }
            
            if (!projectsContainer) {
                // 输出所有可能的容器以便调试
                console.log('Available containers:', document.querySelectorAll('.projects-container'));
                console.log('Available sections:', document.querySelectorAll('section'));
                console.log('Document body HTML:', document.body.innerHTML);
                
                // 尝试创建一个新的容器
                console.log('Attempting to create a new container in projects section');
                if (projectsSection) {
                    projectsContainer = document.createElement('div');
                    projectsContainer.className = 'projects-container grid md:grid-cols-2 gap-6 fade-in';
                    projectsSection.appendChild(projectsContainer);
                    console.log('Created new container:', projectsContainer);
                } else {
                    console.error('Cannot create container: projects section not found');
                    return;
                }
            }
        }
    }
    
    console.log('Initializing projects...');
    console.log('Container found:', projectsContainer);
    console.log('Container HTML:', projectsContainer.outerHTML);
    console.log('Container classes:', projectsContainer.className);
    
    // 获取项目数据
    fetchProjects()
        .then(projects => {
            console.log('Projects fetched successfully:', projects);
            // 清空加载提示
            projectsContainer.innerHTML = '';
            
            // 创建项目卡片
            if (projects && Array.isArray(projects) && projects.length > 0) {
                console.log(`Creating ${projects.length} project cards`);
                let successCount = 0;
                let errorCount = 0;
                
                projects.forEach((project, index) => {
                    console.log(`Creating project card ${index + 1}/${projects.length} for: ${project.name}`);
                    try {
                        const projectCard = createProjectCard(project);
                        if (projectCard) {
                            projectsContainer.appendChild(projectCard);
                            console.log(`Project card ${index + 1} appended to container`);
                            successCount++;
                        } else {
                            console.error(`Project card ${index + 1} creation returned null or undefined`);
                            errorCount++;
                            // 创建一个错误卡片
                            const errorCard = document.createElement('div');
                            errorCard.className = 'project-card fade-in visible';
                            errorCard.innerHTML = `
                                <h3 class="project-title">${project.name || '未知项目'}</h3>
                                <p class="project-description">创建项目卡片失败: 返回了空值</p>
                            `;
                            projectsContainer.appendChild(errorCard);
                        }
                    } catch (error) {
                        console.error(`Error creating card for project ${project.name}:`, error);
                        errorCount++;
                        // 创建一个错误卡片作为后备
                        try {
                            const errorCard = document.createElement('div');
                            errorCard.className = 'project-card fade-in visible';
                            errorCard.innerHTML = `
                                <h3 class="project-title">${project.name || '未知项目'}</h3>
                                <p class="project-description">加载项目信息时出错: ${error.message}</p>
                            `;
                            projectsContainer.appendChild(errorCard);
                            console.log(`Error card for project ${index + 1} appended to container`);
                        } catch (fallbackError) {
                            console.error('Failed to create error card:', fallbackError);
                        }
                    }
                });
                
                console.log(`Project cards creation complete. Success: ${successCount}, Errors: ${errorCount}`);
                
                // 检查是否所有卡片都创建失败
                if (successCount === 0 && errorCount > 0) {
                    console.error('All project cards failed to create');
                    projectsContainer.innerHTML += `<div class="text-center text-red-500 py-8 md:col-span-2">所有项目卡片创建失败，请检查控制台获取详细错误信息</div>`;
                }
            } else {
                console.error('No projects data or invalid projects data:', projects);
                projectsContainer.innerHTML = `<div class="text-center text-red-500 py-8 md:col-span-2">没有可用的项目数据</div>`;
            }
        })
        .catch(error => {
            console.error('Error loading projects:', error);
            projectsContainer.innerHTML = `<div class="text-center text-red-500 py-8 md:col-span-2">加载项目数据时出错: ${error.message}</div>`;
        });
}

/**
 * 获取项目数据
 * @returns {Promise<Array>} 项目数据数组
 */
function fetchProjects() {
    console.log('Fetching projects data...');
    
    return new Promise((resolve, reject) => {
        try {
            // 简化的项目数据，确保结构一致
            const projects = [
                {
                    name: "个人博客系统",
                    description: "基于HTML、CSS和JavaScript的响应式个人博客系统",
                    tech: ["HTML", "CSS", "JavaScript"],
                    url: "https://github.com/yourusername/blog",
                    install: "git clone https://github.com/yourusername/blog.git",
                    stars: 45,
                    forks: 12
                },
                {
                    name: "数据可视化工具",
                    description: "一个简单的数据可视化工具",
                    tech: ["Vue.js", "D3.js"],
                    url: "https://github.com/yourusername/data-viz",
                    install: "npm install @yourusername/data-viz",
                    stars: 132,
                    forks: 28
                }
            ];
            
            console.log(`Fetched ${projects.length} projects`);
            console.log('Projects data:', JSON.stringify(projects, null, 2));
            
            // 直接返回项目数据，不做复杂验证
            resolve(projects);
        } catch (error) {
            console.error('Error fetching projects:', error);
            reject(error);
        }
    });
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
 * @param {Object} project 项目数据
 * @returns {HTMLElement} 项目卡片元素
 */
function createProjectCard(project) {
    console.log('Creating project card for:', project.name);
    
    // 数据验证
    if (!project) {
        console.error('Project data is null or undefined');
        return null;
    }
    
    if (!project.name) {
        console.error('Project name is missing');
        project.name = '未命名项目';
    }
    
    if (!project.description) {
        console.warn('Project description is missing for', project.name);
        project.description = '无描述';
    }
    
    // 创建卡片元素
    try {
        console.log('Creating card element for', project.name);
        const card = document.createElement('div');
        card.className = 'project-card fade-in visible';
        
        // 构建HTML内容
        try {
            let techBadges = '';
            
            // 技术栈徽章
            if (project.tech && Array.isArray(project.tech) && project.tech.length > 0) {
                console.log(`Processing ${project.tech.length} tech badges for`, project.name);
                techBadges = '<div class="tech-stack">';
                project.tech.forEach(tech => {
                    if (tech && typeof tech === 'string' && tech.trim() !== '') {
                        techBadges += `<span class="tech-badge">${tech}</span>`;
                    }
                });
                techBadges += '</div>';
            } else {
                console.warn('No tech stack or empty tech array for', project.name);
                techBadges = '<div class="tech-stack"><span class="tech-badge">未指定技术</span></div>';
            }
            
            // 安装命令
            let installCommand = '';
            if (project.install) {
                console.log('Adding install command for', project.name);
                installCommand = `
                    <div class="install-command">
                        <code>${project.install}</code>
                        <button class="copy-button" data-command="${project.install}">复制</button>
                    </div>
                `;
            }
            
            // 项目统计
            let stats = '';
            if (project.stars !== undefined || project.forks !== undefined) {
                console.log('Adding stats for', project.name);
                stats = '<div class="project-stats">';
                if (project.stars !== undefined) {
                    stats += `<span class="stat-item">⭐ ${project.stars}</span>`;
                }
                if (project.forks !== undefined) {
                    stats += `<span class="stat-item">🍴 ${project.forks}</span>`;
                }
                stats += '</div>';
            }
            
            // 构建完整的卡片内容
            card.innerHTML = `
                <h3 class="project-title">
                    ${project.url ? `<a href="${project.url}" target="_blank">${project.name}</a>` : project.name}
                </h3>
                <p class="project-description">${project.description}</p>
                ${techBadges}
                ${installCommand}
                ${stats}
            `;
            
            console.log('Card HTML built successfully for', project.name);
        } catch (htmlError) {
            console.error('Error building HTML for', project.name, htmlError);
            // 简化的卡片内容作为后备
            card.innerHTML = `
                <h3 class="project-title">${project.name}</h3>
                <p class="project-description">${project.description || '无描述'}</p>
                <div class="tech-stack"><span class="tech-badge">构建卡片内容时出错</span></div>
            `;
        }
        
        // 添加复制按钮功能
        try {
            const copyButton = card.querySelector('.copy-button');
            if (copyButton) {
                console.log('Adding copy button functionality for', project.name);
                copyButton.addEventListener('click', function() {
                    const command = this.getAttribute('data-command');
                    navigator.clipboard.writeText(command)
                        .then(() => {
                            const originalText = this.textContent;
                            this.textContent = '已复制!';
                            setTimeout(() => {
                                this.textContent = originalText;
                            }, 2000);
                        })
                        .catch(err => {
                            console.error('复制失败:', err);
                            alert('复制失败: ' + err);
                        });
                });
            }
        } catch (copyError) {
            console.error('Error setting up copy button for', project.name, copyError);
            // 复制按钮出错不影响卡片显示，继续执行
        }
        
        console.log('Project card created successfully for', project.name);
        return card;
    } catch (error) {
        console.error('Fatal error creating card for', project.name, error);
        throw error; // 重新抛出错误以便上层处理
    }
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