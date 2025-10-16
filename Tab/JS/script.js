document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const engineToggle = document.getElementById('engineToggle');
    const engineIcon = document.getElementById('engineIcon');
    const body = document.body;

    // 搜索引擎配置
    const engines = [
        { name: '百度', url: 'https://www.baidu.com/s?wd=', icon: 'TU/yinqing/百度.png' },
        { name: '谷歌', url: 'https://www.google.com/search?q=', icon: 'TU/yinqing/谷歌.png' },
        { name: '必应', url: 'https://www.bing.com/search?q=', icon: 'TU/yinqing/必应.png' }
    ];

    // 壁纸列表
    const wallpapers = [
        'TU/beijing/卜卜-古风-唯美.png',
        'TU/beijing/克罗瑞娜-绯月.jpg',
        'TU/beijing/尘白禁区.jpg',
        // 可以在这里添加更多壁纸路径
    ];

    // 从localStorage获取保存的搜索引擎索引，如果没有则默认为0
    let currentEngine = parseInt(localStorage.getItem('selectedEngine')) || 0;

    // 确保索引在有效范围内
    if (currentEngine < 0 || currentEngine >= engines.length) {
        currentEngine = 0;
    }

    // 初始化搜索引擎图标
    function updateEngineIcon() {
        engineIcon.src = engines[currentEngine].icon;
        engineIcon.alt = engines[currentEngine].name;
    }

    // 切换搜索引擎
    engineToggle.addEventListener('click', function() {
        currentEngine = (currentEngine + 1) % engines.length;
        updateEngineIcon();

        // 保存选择到localStorage
        localStorage.setItem('selectedEngine', currentEngine);
    });

    // 处理回车键搜索
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = searchInput.value.trim();

            if (query) {
                const searchUrl = engines[currentEngine].url + encodeURIComponent(query);
                window.open(searchUrl, '_blank');
            }
        }
    });

    // 从localStorage获取保存的壁纸路径
    function getSavedWallpaper() {
        return localStorage.getItem('selectedWallpaper');
    }

    // 保存壁纸路径到localStorage
    function saveWallpaper(wallpaperPath) {
        localStorage.setItem('selectedWallpaper', wallpaperPath);
    }

    // 设置壁纸
    function setWallpaper(wallpaperPath) {
        body.style.backgroundImage = `url('${wallpaperPath}')`;
    }

    // 随机选择壁纸
    function randomWallpaper() {
        if (wallpapers.length > 0) {
            const randomIndex = Math.floor(Math.random() * wallpapers.length);
            const selectedWallpaper = wallpapers[randomIndex];
            setWallpaper(selectedWallpaper);
            saveWallpaper(selectedWallpaper);
        }
    }

    // 初始化壁纸
    function initWallpaper() {
        const savedWallpaper = getSavedWallpaper();
        if (savedWallpaper) {
            setWallpaper(savedWallpaper);
        } else {
            // 如果没有保存的壁纸，使用默认壁纸
            setWallpaper('TU/beijing/卜卜-古风-唯美.png');
        }
    }

    // 初始化搜索引擎图标
    updateEngineIcon();

    // 初始化壁纸
    initWallpaper();
});
