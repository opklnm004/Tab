// 图标相关功能
document.addEventListener('DOMContentLoaded', function() {
    // 图标数据
    const icons = [
        { name: '抖音', id: 'douyin', url: 'https://www.douyin.com', icon: 'TU/kuaijie/抖音.png' },
        { name: '哔哩哔哩', id: 'bilibili', url: 'https://www.bilibili.com', icon: 'TU/kuaijie/哔哩哔哩.png' },
        { name: 'deepseek', id: 'deepseek', url: 'https://chat.deepseek.com', icon: 'TU/kuaijie/deepseek.png' },
        { name: '百度网盘', id: 'baidu', url: 'https://pan.baidu.com', icon: 'TU/kuaijie/百度网盘.png' },
        { name: '通义千问', id: 'baidu', url: 'https://www.tongyi.com/', icon: 'TU/kuaijie/通义千问.png' },
        { name: 'Kimi',id: 'kimi', url: 'https://www.kimi.com/zh/', icon: 'TU/kuaijie/kimi.png'}
    ];

    // 获取元素
    const shortcutsContainer = document.getElementById('D-2-2');
    const iconSettingsModal = document.getElementById('iconSettingsModal');
    const iconList = document.getElementById('iconList');
    const saveIconSettingsBtn = document.getElementById('saveIconSettings');
    const cancelIconSettingsBtn = document.getElementById('cancelIconSettings');
    const closeIconSettings = document.querySelector('#iconSettingsModal .close');

    // 临时存储图标可见性状态
    let tempIconVisibility = {};

    // 从localStorage获取图标显示设置
    function getIconVisibility() {
        const visibility = localStorage.getItem('iconVisibility');
        return visibility ? JSON.parse(visibility) : {};
    }

    // 保存图标显示设置到localStorage
    function saveIconVisibility(visibility) {
        localStorage.setItem('iconVisibility', JSON.stringify(visibility));
    }

    // 创建图标函数
    function createShortcutIcon(iconData) {
        // 创建图标容器
        const iconContainer = document.createElement('div');
        iconContainer.className = 'D-2-2-1';
        iconContainer.setAttribute('data-url', iconData.url);
        iconContainer.setAttribute('data-icon-id', iconData.id);

        // 创建图标区域
        const iconArea = document.createElement('div');
        iconArea.className = 'D-2-2-1-1';

        // 创建图标图片
        const iconImg = document.createElement('img');
        iconImg.src = iconData.icon;
        iconImg.alt = iconData.name;
        iconArea.appendChild(iconImg);

        // 创建名字区域
        const nameArea = document.createElement('div');
        nameArea.className = 'D-2-2-1-2';
        nameArea.textContent = iconData.name;

        // 组装元素
        iconContainer.appendChild(iconArea);
        iconContainer.appendChild(nameArea);

        // 添加点击事件
        iconContainer.addEventListener('click', function() {
            window.open(iconData.url, '_blank');
        });

        return iconContainer;
    }

    // 初始化图标
    function initIcons() {
        // 清空现有内容
        shortcutsContainer.innerHTML = '';

        // 获取图标显示设置
        const visibility = getIconVisibility();

        // 创建并添加图标
        icons.forEach(iconData => {
            // 如果没有设置或设置为显示，则创建图标
            if (visibility[iconData.id] !== false) {
                const iconElement = createShortcutIcon(iconData);
                shortcutsContainer.appendChild(iconElement);
            }
        });
    }

    // 显示图标设置悬浮窗
    function showIconSettings() {
        // 获取当前图标可见性设置
        const visibility = getIconVisibility();
        tempIconVisibility = {...visibility}; // 复制到临时存储

        // 清空图标列表
        iconList.innerHTML = '';

        // 为每个图标创建设置项
        icons.forEach(iconData => {
            const iconItem = document.createElement('div');
            iconItem.className = 'icon-item';

            // 图标图片
            const iconImg = document.createElement('img');
            iconImg.src = iconData.icon;
            iconImg.alt = iconData.name;

            // 图标名称
            const iconName = document.createElement('span');
            iconName.className = 'icon-name';
            iconName.textContent = iconData.name;

            // 切换开关
            const toggleSwitch = document.createElement('label');
            toggleSwitch.className = 'toggle-switch';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = tempIconVisibility[iconData.id] !== false; // 默认为true
            checkbox.setAttribute('data-icon-id', iconData.id);

            const slider = document.createElement('span');
            slider.className = 'slider';

            toggleSwitch.appendChild(checkbox);
            toggleSwitch.appendChild(slider);

            // 组装元素
            iconItem.appendChild(iconImg);
            iconItem.appendChild(iconName);
            iconItem.appendChild(toggleSwitch);

            // 添加切换事件
            checkbox.addEventListener('change', function() {
                const iconId = this.getAttribute('data-icon-id');
                tempIconVisibility[iconId] = this.checked;
            });

            iconList.appendChild(iconItem);
        });

        // 显示悬浮窗
        iconSettingsModal.style.display = 'block';
    }

    // 保存图标设置
    function saveIconSettings() {
        saveIconVisibility(tempIconVisibility);
        initIcons();
        iconSettingsModal.style.display = 'none';
    }

    // 取消图标设置
    function cancelIconSettings() {
        iconSettingsModal.style.display = 'none';
    }

    // 悬浮窗事件监听
    saveIconSettingsBtn.addEventListener('click', saveIconSettings);
    cancelIconSettingsBtn.addEventListener('click', cancelIconSettings);
    closeIconSettings.addEventListener('click', cancelIconSettings);

    // 点击悬浮窗外部关闭
    window.addEventListener('click', function(e) {
        if (e.target === iconSettingsModal) {
            cancelIconSettings();
        }
    });

    // 初始化
    initIcons();
});
