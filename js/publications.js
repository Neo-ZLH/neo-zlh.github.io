/**
 * 学术成果墙脚本
 * 负责加载和展示论文信息
 */

/**
 * 初始化学术成果墙
 */
function initPublications() {
    console.log('=== 开始初始化学术成果墙 ===');
    
    // 查找容器
    const container = document.querySelector('.publications-timeline');
    if (!container) {
        console.error('❌ 找不到学术成果墙容器 .publications-timeline');
        return;
    }
    
    console.log('✅ 找到学术成果墙容器:', container);
    
    // 确保容器可见
    container.style.display = 'block';
    container.style.visibility = 'visible';
    container.style.opacity = '1';
    container.classList.add('publications-visible');
    
    // 确保父容器可见
    const publicationsSection = document.getElementById('publications');
    if (publicationsSection) {
        publicationsSection.style.display = 'block';
        publicationsSection.style.visibility = 'visible';
        publicationsSection.style.opacity = '1';
        console.log('✅ 父容器 #publications 已设置为可见');
    }
    
    // 开始加载学术成果数据
    loadPublications(container);
}

/**
 * 加载学术成果数据
 */
function loadPublications(container) {
    console.log('开始加载学术成果数据...');
    
    // 清除加载提示（如果有的话）
    const loadingElements = container.querySelectorAll('.loading');
    loadingElements.forEach(el => el.remove());
    
    // 添加加载提示
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading text-center text-gray-500 py-8';
    loadingDiv.textContent = '正在加载学术成果...';
    container.appendChild(loadingDiv);
    
    // 获取学术成果数据
    fetchPublications()
        .then(publications => {
            console.log('✅ 成功获取学术成果数据:', publications);
            
            // 移除加载提示
            loadingDiv.remove();
            
            if (publications && publications.length > 0) {
                // 渲染学术成果
                renderPublications(publications, container);
            } else {
                // 显示无数据提示
                container.innerHTML = `
                    <div class="text-center text-gray-500 py-8">
                        暂无学术成果数据
                    </div>
                `;
            }
        })
        .catch(error => {
            console.error('❌ 加载学术成果时出错:', error);
            
            // 移除加载提示
            loadingDiv.remove();
            
            // 显示错误信息
            container.innerHTML = `
                <div class="text-center text-red-500 py-8">
                    ❌ 加载学术成果时出错: ${error.message}
                </div>
            `;
        });
}

/**
 * 渲染学术成果列表
 */
function renderPublications(publications, container) {
    console.log('开始渲染学术成果...');
    
    // 清空容器
    container.innerHTML = '';
    
    // 按年份分组
    const publicationsByYear = {};
    publications.forEach(pub => {
        const year = pub.year || 'Unknown';
        if (!publicationsByYear[year]) {
            publicationsByYear[year] = [];
        }
        publicationsByYear[year].push(pub);
    });
    
    // 按年份降序排列
    const sortedYears = Object.keys(publicationsByYear).sort((a, b) => {
        if (a === 'Unknown') return 1;
        if (b === 'Unknown') return -1;
        return parseInt(b) - parseInt(a);
    });
    
    // 渲染每个年份的论文
    sortedYears.forEach(year => {
        // 创建年份标题
        const yearSection = document.createElement('div');
        yearSection.className = 'year-section mb-8';
        
        const yearHeader = document.createElement('div');
        yearHeader.className = 'year-header mb-4';
        
        const yearBadge = document.createElement('div');
        yearBadge.className = 'inline-block bg-cyber-green text-black px-3 py-1 rounded text-sm font-bold';
        yearBadge.textContent = year;
        
        yearHeader.appendChild(yearBadge);
        yearSection.appendChild(yearHeader);
        
        // 渲染该年份的论文
        const yearPublications = publicationsByYear[year];
        yearPublications.forEach((pub, index) => {
            try {
                const card = createPublicationCard(pub);
                if (card) {
                    // 移除年份徽章，因为已经有年份标题了
                    const yearBadgeInCard = card.querySelector('.year-badge');
                    if (yearBadgeInCard) {
                        yearBadgeInCard.remove();
                    }
                    yearSection.appendChild(card);
                    console.log(`✅ 成功创建 ${year} 年第 ${index + 1} 个学术成果卡片`);
                }
            } catch (error) {
                console.error(`❌ 创建 ${year} 年第 ${index + 1} 个学术成果卡片时出错:`, error);
            }
        });
        
        container.appendChild(yearSection);
    });
    
    console.log('✅ 学术成果渲染完成');
}

/**
 * 获取学术成果数据
 */
function fetchPublications() {
    return new Promise((resolve, reject) => {
        try {
            // 使用内置的示例数据
            const publications = [
                {
                    id: 'paper1',
                    title: '基于深度学习的大规模数据治理框架',
                    authors: '张梁瀚, 王明, 李华',
                    venue: '数据库学报, 2023',
                    year: 2023,
                    abstract: '本文提出了一种基于深度学习的大规模数据治理框架，能够有效处理PB级数据的质量评估、清洗和集成问题。实验表明，该框架在准确性和效率方面均优于现有方法。',
                    doi: '10.1234/db.2023.001',
                    url: 'https://github.com/Neo-ZLH/neo-zlh.github.io'
                },
                {
                    id: 'paper2',
                    title: '查询优化器性能提升：基于深度强化学习的方法',
                    authors: '张梁瀚, 陈强, 刘伟',
                    venue: '计算机研究与发展, 2022',
                    year: 2022,
                    abstract: '本文提出了一种基于深度强化学习的数据库查询优化方法，通过自动学习查询执行计划的选择策略，显著提高了复杂查询的性能。在TPC-H和TPC-DS基准测试中，该方法比传统优化器提升了30%的查询效率。',
                    doi: '10.5678/comp.2022.002',
                    url: 'https://github.com/Neo-ZLH/neo-zlh.github.io'
                },
                {
                    id: 'paper3',
                    title: '分布式ETL系统的设计与实现',
                    authors: '张梁瀚, 赵芳, 钱德',
                    venue: '软件学报, 2022',
                    year: 2022,
                    abstract: '针对大数据环境下ETL过程面临的挑战，本文设计并实现了一个分布式ETL系统，支持跨数据源的高效数据抽取、转换和加载。该系统采用微服务架构，具有良好的可扩展性和容错能力。',
                    doi: '10.9012/soft.2022.003',
                    url: 'https://github.com/Neo-ZLH/neo-zlh.github.io'
                },
                {
                    id: 'paper4',
                    title: '数据库模式演化的自动化方法研究',
                    authors: '张梁瀚, 孙明, 周红',
                    venue: '计算机科学, 2021',
                    year: 2021,
                    abstract: '本文研究了数据库模式演化过程中的自动化方法，提出了一种能够自动处理架构变更和数据迁移的工具。该工具通过静态分析和动态验证相结合的方式，确保模式变更的正确性和数据一致性。',
                    doi: '10.3456/cs.2021.004',
                    url: 'https://github.com/Neo-ZLH/neo-zlh.github.io'
                },
                {
                    id: 'paper5',
                    title: '数据质量评估与修复的统一框架',
                    authors: '张梁瀚, 杨光, 郑强',
                    venue: '计算机学报, 2021',
                    year: 2021,
                    abstract: '本文提出了一种统一的数据质量评估与修复框架，能够自动识别多种类型的数据质量问题并提供相应的修复策略。实验结果表明，该框架在准确性和效率方面均优于现有方法。',
                    doi: '10.7890/comp.2021.005',
                    url: 'https://github.com/Neo-ZLH/neo-zlh.github.io'
                }
            ];
            
            console.log(`📊 获取到 ${publications.length} 篇论文数据`);
            resolve(publications);
        } catch (error) {
            console.error('Error in fetchPublications:', error);
            reject(error);
        }
    });
}

/**
 * 创建学术成果卡片
 */
function createPublicationCard(pub) {
    if (!pub || !pub.title) {
        console.error('Publication data is incomplete:', pub);
        return null;
    }
    
    const card = document.createElement('div');
    card.className = 'publication-card publication-card-visible fade-in visible';
    card.style.cssText = 'display: block; visibility: visible; opacity: 1;';
    
    // 创建年份徽章
    const yearBadge = document.createElement('div');
    yearBadge.className = 'year-badge';
    yearBadge.textContent = pub.year || 'N/A';
    
    // 创建标题
    const title = document.createElement('h4');
    title.className = 'title';
    title.textContent = pub.title;
    
    // 创建作者信息
    const authors = document.createElement('div');
    authors.className = 'authors';
    authors.textContent = pub.authors || 'Unknown Authors';
    
    // 创建期刊信息
    const venue = document.createElement('div');
    venue.className = 'venue';
    venue.textContent = pub.venue || 'Unknown Venue';
    
    // 创建链接区域
    const links = document.createElement('div');
    links.className = 'links';
    
    if (pub.doi) {
        const doiLink = document.createElement('a');
        doiLink.href = `https://doi.org/${pub.doi}`;
        doiLink.target = '_blank';
        doiLink.className = 'link-button';
        doiLink.textContent = 'DOI';
        links.appendChild(doiLink);
    }
    
    if (pub.url) {
        const urlLink = document.createElement('a');
        urlLink.href = pub.url;
        urlLink.target = '_blank';
        urlLink.className = 'link-button';
        urlLink.textContent = 'URL';
        links.appendChild(urlLink);
    }
    
    // 创建摘要切换按钮
    if (pub.abstract) {
        const abstractToggle = document.createElement('button');
        abstractToggle.className = 'abstract-toggle link-button';
        abstractToggle.textContent = 'Abstract';
        links.appendChild(abstractToggle);
        
        // 创建摘要内容
        const abstractContent = document.createElement('div');
        abstractContent.className = 'abstract-content';
        abstractContent.style.display = 'none';
        abstractContent.textContent = pub.abstract;
        
        // 添加点击事件
        abstractToggle.addEventListener('click', () => {
            if (abstractContent.style.display === 'none') {
                abstractContent.style.display = 'block';
                abstractToggle.textContent = 'Hide Abstract';
            } else {
                abstractContent.style.display = 'none';
                abstractToggle.textContent = 'Abstract';
            }
        });
        
        // 组装卡片
        card.appendChild(yearBadge);
        card.appendChild(title);
        card.appendChild(authors);
        card.appendChild(venue);
        card.appendChild(links);
        card.appendChild(abstractContent);
    } else {
        // 组装卡片（无摘要）
        card.appendChild(yearBadge);
        card.appendChild(title);
        card.appendChild(authors);
        card.appendChild(venue);
        card.appendChild(links);
    }
    
    return card;
}