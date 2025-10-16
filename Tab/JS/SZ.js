// 设置按钮功能
document.addEventListener('DOMContentLoaded', function() {
    const settingsButton = document.getElementById('settingsButton');
    const settingsModal = document.getElementById('settingsModal');
    const closeSettings = document.getElementById('closeSettings');
    const closeButtons = settingsModal.querySelectorAll('.close');
    const menuItems = document.querySelectorAll('.settings-menu-item');
    const openIconSettings = document.getElementById('openIconSettings');
    const randomWallpaperBtn = document.getElementById('randomWallpaperBtn');

    // 搜索引擎配置（与 script.js 中保持一致）
    const engines = [
        { name: '百度', url: 'https://www.baidu.com/s?wd=', icon: 'TU/yinqing/百度.png' },
        { name: '谷歌', url: 'https://www.google.com/search?q=', icon: 'TU/yinqing/谷歌.png' },
        { name: '必应', url: 'https://www.bing.com/search?q=', icon: 'TU/yinqing/必应.png' }
    ];

    if (settingsButton) {
        settingsButton.addEventListener('click', function() {
            settingsModal.style.display = 'block';
            initSettingsModal();
        });
    }

    // 关闭设置悬浮窗
    closeSettings.addEventListener('click', function() {
        settingsModal.style.display = 'none';
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            settingsModal.style.display = 'none';
        });
    });

    // 点击悬浮窗外部关闭
    window.addEventListener('click', function(e) {
        if (e.target === settingsModal) {
            settingsModal.style.display = 'none';
        }
    });

    // 左侧菜单切换
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const target = this.getAttribute('data-target');

            // 更新菜单激活状态
            menuItems.forEach(menuItem => menuItem.classList.remove('active'));
            this.classList.add('active');

            // 显示对应面板
            document.querySelectorAll('.settings-panel').forEach(panel => {
                panel.classList.remove('active');
            });
            document.getElementById(target).classList.add('active');
        });
    });

    // 打开图标设置
    if (openIconSettings) {
        openIconSettings.addEventListener('click', function() {
            if (typeof showIconSettings === 'function') {
                settingsModal.style.display = 'none';
                showIconSettings();
            }
        });
    }

    // 随机切换壁纸
    if (randomWallpaperBtn) {
        randomWallpaperBtn.addEventListener('click', function() {
            if (typeof randomWallpaper === 'function') {
                randomWallpaper();
            }
        });
    }

    // 初始化设置悬浮窗
    function initSettingsModal() {
        // 初始化菜单激活状态
        menuItems.forEach((item, index) => {
            if (index === 0) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // 初始化面板显示
        document.querySelectorAll('.settings-panel').forEach((panel, index) => {
            if (index === 0) {
                panel.classList.add('active');
            } else {
                panel.classList.remove('active');
            }
        });

        // 初始化搜索引擎选项
        initSearchEngineOptions();
    }

    // 初始化搜索引擎选项
    function initSearchEngineOptions() {
        const searchEngineList = document.querySelector('.search-engine-list');
        if (!searchEngineList) return;

        searchEngineList.innerHTML = '';

        // 获取当前选中的搜索引擎
        const currentEngine = parseInt(localStorage.getItem('selectedEngine')) || 0;

        engines.forEach((engine, index) => {
            const engineOption = document.createElement('div');
            engineOption.className = 'search-engine-option';
            if (index === currentEngine) {
                engineOption.classList.add('active');
            }

            engineOption.innerHTML = `
                <img src="${engine.icon}" alt="${engine.name}">
                <span>${engine.name}</span>
            `;

            engineOption.addEventListener('click', function() {
                // 更新选中状态
                document.querySelectorAll('.search-engine-option').forEach(option => {
                    option.classList.remove('active');
                });
                this.classList.add('active');

                // 保存到localStorage
                localStorage.setItem('selectedEngine', index);

                // 更新页面上的搜索引擎图标
                const engineIcon = document.getElementById('engineIcon');
                if (engineIcon) {
                    engineIcon.src = engine.icon;
                    engineIcon.alt = engine.name;
                }
            });

            searchEngineList.appendChild(engineOption);
        });
    }
});
