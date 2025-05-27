/**
 * 学术成果墙脚本
 * 负责加载和展示论文信息
 */

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // 初始化学术成果墙
    initPublications();
});

/**
 * 初始化学术成果墙
 */
function initPublications() {
    const publicationsContainer = document.querySelector('.publications-timeline');
    if (!publicationsContainer) return;
    
    // 模拟从API获取数据
    // 实际应用中可以从arXiv API或其他学术API获取数据
    fetchPublications()
        .then(publications => {
            // 清空加载提示
            publicationsContainer.innerHTML = '';
            
            // 按年份分组
            const publicationsByYear = groupByYear(publications);
            
            // 创建时间轴
            createTimelineUI(publicationsByYear, publicationsContainer);
        })
        .catch(error => {
            console.error('Error loading publications:', error);
            publicationsContainer.innerHTML = `<div class="text-center text-red-500 py-8">加载论文数据时出错</div>`;
        });
}

/**
 * 模拟从API获取论文数据
 * 在实际应用中，这里可以连接到arXiv API或其他学术数据源
 */
async function fetchPublications() {
    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // 示例数据
    return [
        {
            id: 'paper1',
            title: '基于深度学习的大规模数据治理框架',
            authors: '张梁瀚, 王明, 李华',
            venue: '数据库学报, 2023',
            year: 2023,
            abstract: '本文提出了一种基于深度学习的大规模数据治理框架，能够有效处理PB级数据的质量评估、清洗和集成问题。实验表明，该框架在准确性和效率方面均优于现有方法。',
            doi: '10.1234/db.2023.001',
            url: '#',
            pdf: '#',
            code: 'https://github.com/Neo-ZLH/data-governance-framework'
        },
        {
            id: 'paper2',
            title: '分布式数据库系统中的一致性保障机制研究',
            authors: '张梁瀚, 陈强, 刘伟',
            venue: '计算机研究与发展, 2022',
            year: 2022,
            abstract: '针对分布式数据库系统中的一致性问题，本文提出了一种新型的共识算法，在保证强一致性的同时显著提高了系统吞吐量。该算法已在多个实际系统中得到应用。',
            doi: '10.5678/crd.2022.005',
            url: '#',
            pdf: '#'
        },
        {
            id: 'paper3',
            title: 'A Novel Approach for Knowledge Graph Embedding with Temporal Information',
            authors: 'Lianghan Zhang, John Smith, Mary Johnson',
            venue: 'International Conference on Data Engineering (ICDE), 2022',
            year: 2022,
            abstract: 'This paper presents a novel approach for incorporating temporal information into knowledge graph embeddings. Our method achieves state-of-the-art performance on several benchmark datasets.',
            doi: '10.1109/icde.2022.00235',
            url: '#',
            pdf: '#',
            code: 'https://github.com/Neo-ZLH/temporal-kg-embedding'
        },
        {
            id: 'paper4',
            title: '人工智能驱动的数据异常检测系统',
            authors: '张梁瀚, 赵明, 黄强',
            venue: '计算机学报, 2021',
            year: 2021,
            abstract: '本文设计并实现了一种基于深度学习的数据异常检测系统，能够自动识别多种类型的数据异常，并提供可解释的异常原因分析。',
            doi: '10.7689/jc.2021.012',
            url: '#',
            pdf: '#'
        },
        {
            id: 'paper5',
            title: 'Efficient Query Processing in Large-Scale Graph Databases',
            authors: 'Lianghan Zhang, David Wang, Sarah Chen',
            venue: 'VLDB Journal, 2020',
            year: 2020,
            abstract: 'We propose a novel indexing structure for efficient query processing in large-scale graph databases. Experimental results show that our approach outperforms existing methods by up to 10x on real-world datasets.',
            doi: '10.1007/vldb.2020.1234',
            url: '#',
            pdf: '#',
            code: 'https://github.com/Neo-ZLH/graph-query-engine'
        }
    ];
}

/**
 * 按年份对论文进行分组
 */
function groupByYear(publications) {
    const groups = {};
    
    publications.forEach(pub => {
        if (!groups[pub.year]) {
            groups[pub.year] = [];
        }
        groups[pub.year].push(pub);
    });
    
    // 按年份降序排序
    return Object.keys(groups)
        .sort((a, b) => b - a)
        .reduce((result, year) => {
            result[year] = groups[year];
            return result;
        }, {});
}

/**
 * 创建时间轴UI
 */
function createTimelineUI(publicationsByYear, container) {
    // 遍历每个年份
    Object.entries(publicationsByYear).forEach(([year, publications]) => {
        // 创建年份标题
        const yearHeader = document.createElement('div');
        yearHeader.className = 'mb-6 mt-10';
        yearHeader.innerHTML = `
            <h3 class="text-xl font-bold inline-block bg-darker-bg px-4 py-2 rounded-lg border border-cyber-green/30">
                <span class="text-cyber-green">${year}</span>
            </h3>
        `;
        container.appendChild(yearHeader);
        
        // 创建该年份的论文列表
        const publicationsList = document.createElement('div');
        publicationsList.className = 'space-y-6 ml-4 pl-6 border-l border-cyber-green/30';
        
        // 添加每篇论文
        publications.forEach(pub => {
            const pubCard = createPublicationCard(pub);
            publicationsList.appendChild(pubCard);
        });
        
        container.appendChild(publicationsList);
    });
}

/**
 * 创建单个论文卡片
 */
function createPublicationCard(publication) {
    const card = document.createElement('div');
    card.className = 'publication-card fade-in';
    card.dataset.id = publication.id;
    
    // 构建卡片内容
    card.innerHTML = `
        <div class="year-badge">${publication.year}</div>
        <h4 class="title">${publication.title}</h4>
        <div class="authors">${publication.authors}</div>
        <div class="venue">${publication.venue}</div>
        <div class="links">
            ${publication.doi ? `<a href="https://doi.org/${publication.doi}" target="_blank" class="link-button">DOI</a>` : ''}
            ${publication.pdf ? `<a href="${publication.pdf}" target="_blank" class="link-button">PDF</a>` : ''}
            ${publication.code ? `<a href="${publication.code}" target="_blank" class="link-button">Code</a>` : ''}
            <button class="link-button abstract-toggle">Abstract</button>
        </div>
        <div class="abstract-content hidden mt-4 text-sm text-gray-400 bg-black/30 p-3 rounded">
            ${publication.abstract}
        </div>
    `;
    
    // 添加摘要切换功能
    setTimeout(() => {
        const abstractToggle = card.querySelector('.abstract-toggle');
        const abstractContent = card.querySelector('.abstract-content');
        
        if (abstractToggle && abstractContent) {
            abstractToggle.addEventListener('click', () => {
                abstractContent.classList.toggle('hidden');
            });
        }
    }, 0);
    
    return card;
}

/**
 * 从DOI获取论文信息
 * 在实际应用中，可以使用CrossRef或类似API
 */
async function fetchPaperInfoByDOI(doi) {
    try {
        const response = await fetch(`https://api.crossref.org/works/${doi}`);
        if (!response.ok) throw new Error('Failed to fetch paper info');
        
        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error('Error fetching paper info:', error);
        return null;
    }
}

/**
 * 从arXiv获取论文信息
 * 在实际应用中，可以使用arXiv API
 */
async function fetchPaperInfoFromArxiv(arxivId) {
    try {
        const response = await fetch(`http://export.arxiv.org/api/query?id_list=${arxivId}`);
        if (!response.ok) throw new Error('Failed to fetch arXiv info');
        
        const data = await response.text();
        // 解析XML响应
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'text/xml');
        
        // 提取信息
        const entry = xmlDoc.querySelector('entry');
        if (!entry) return null;
        
        return {
            title: entry.querySelector('title')?.textContent || '',
            authors: Array.from(entry.querySelectorAll('author')).map(a => a.querySelector('name')?.textContent || '').join(', '),
            summary: entry.querySelector('summary')?.textContent || '',
            published: entry.querySelector('published')?.textContent || '',
            updated: entry.querySelector('updated')?.textContent || '',
            link: entry.querySelector('link[title="pdf"]')?.getAttribute('href') || ''
        };
    } catch (error) {
        console.error('Error fetching arXiv info:', error);
        return null;
    }
}