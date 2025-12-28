// 鋒兄AI資訊系統 - 主要 JavaScript 功能

class FengAISystem {
    constructor() {
        this.currentPage = 'home';
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupInteractiveElements();
        this.loadInitialData();
        this.setupAnimations();
    }

    // 設置導航功能
    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item, .mobile-nav-item');
        const pages = document.querySelectorAll('.page');

        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPage = item.getAttribute('data-page');
                this.switchPage(targetPage);
                
                // 更新導航狀態
                document.querySelectorAll('.nav-item, .mobile-nav-item').forEach(nav => nav.classList.remove('active'));
                
                // 同時更新桌面版和手機版的對應選單項
                document.querySelectorAll(`[data-page="${targetPage}"]`).forEach(nav => {
                    nav.classList.add('active');
                });

                // 如果是手機版選單，關閉選單
                if (item.classList.contains('mobile-nav-item')) {
                    this.closeMobileMenu();
                }
            });
        });
    }

    // 設置手機版選單
    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
        const mobileMenuClose = document.getElementById('mobileMenuClose');

        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        }

        if (mobileMenuOverlay) {
            mobileMenuOverlay.addEventListener('click', (e) => {
                if (e.target === mobileMenuOverlay) {
                    this.closeMobileMenu();
                }
            });
        }

        // ESC 鍵關閉選單
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMobileMenu();
            }
        });
    }

    // 切換手機版選單
    toggleMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

        if (mobileMenuOverlay.classList.contains('active')) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    // 打開手機版選單
    openMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

        mobileMenuBtn.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // 防止背景滾動
    }

    // 關閉手機版選單
    closeMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

        mobileMenuBtn.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = ''; // 恢復背景滾動
    }

    // 暫停所有影片
    pauseAllVideos() {
        const videoPlayers = document.querySelectorAll('.video-player');
        videoPlayers.forEach(video => {
            if (!video.paused) {
                video.pause();
                console.log('已暫停影片:', video.closest('.video-item')?.querySelector('.video-title')?.textContent || '未知影片');
            }
        });
    }

    // 暫停音樂播放
    pauseMusic() {
        const musicPlayer = document.getElementById('musicPlayer');
        if (musicPlayer && !musicPlayer.paused) {
            musicPlayer.pause();
            console.log('已暫停音樂:', this.getCurrentSongTitle());
            this.showNotification('音樂已暫停', 'info');
        }
    }

    // 切換頁面
    switchPage(pageId) {
        // 在切換頁面前暫停所有影片和音樂
        this.pauseAllVideos();
        this.pauseMusic();
        
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => {
            page.classList.remove('active');
        });

        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = pageId;
            
            // 頁面切換動畫
            targetPage.style.opacity = '0';
            targetPage.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                targetPage.style.transition = 'all 0.3s ease';
                targetPage.style.opacity = '1';
                targetPage.style.transform = 'translateY(0)';
            }, 50);
        }
    }

    // 設置互動元素
    setupInteractiveElements() {
        // 統計卡片懸停效果
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
                card.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.15)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            });
        });

        // 搜尋功能
        const searchInput = document.querySelector('.search-input');
        const searchBtn = document.querySelector('.search-btn');
        
        if (searchInput && searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.performSearch(searchInput.value);
            });

            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch(searchInput.value);
                }
            });
        }

        // 查看全部連結
        const viewAllLinks = document.querySelectorAll('.view-all');
        viewAllLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.showNotification('功能開發中...', 'info');
            });
        });

        // 訂閱卡片點擊
        const subscriptionCards = document.querySelectorAll('.subscription-card');
        subscriptionCards.forEach(card => {
            card.addEventListener('click', () => {
                card.style.background = '#f8f9fa';
                setTimeout(() => {
                    card.style.background = 'white';
                }, 200);
                this.showNotification('訂閱詳情載入中...', 'info');
            });
        });

        // 音樂分類卡片點擊
        const musicCategoryCards = document.querySelectorAll('.music-category-card');
        musicCategoryCards.forEach(card => {
            card.addEventListener('click', () => {
                const categoryName = card.querySelector('h4').textContent;
                card.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    card.style.transform = 'scale(1)';
                }, 150);
                this.showNotification(`正在載入 ${categoryName} 分類...`, 'info');
            });
        });

        // 影片播放器互動
        this.setupVideoPlayers();
        
        // 音樂播放器互動
        this.setupMusicPlayer();
    }

    // 載入初始數據
    async loadInitialData() {
        // 模擬數據載入
        this.updateDashboardStats();
        await this.loadSubscriptionData();
        await this.loadFoodData();
        this.loadGalleryData();
    }

    // 顯示載入狀態
    showLoadingState(section) {
        const loadingMessage = section === 'subscription' ? '正在載入訂閱數據...' : '正在載入食品數據...';
        this.showNotification(loadingMessage, 'info');
    }

    // 更新統計卡片
    updateStatCard(page, type, value) {
        // 根據頁面和類型找到對應的統計卡片並更新
        const selectors = {
            subscription: {
                'monthly-cost': '.stat-card:nth-child(1) .stat-number',
                'total-subscriptions': '.stat-card:nth-child(2) .stat-number',
                'expiring-very-soon': '.stat-card:nth-child(3) .stat-number',
                'expiring-soon': '.stat-card:nth-child(4) .stat-number'
            },
            food: {
                'total-value': '.stat-card:nth-child(1) .stat-number',
                'total-count': '.stat-card:nth-child(2) .stat-number',
                'expiring-soon': '.stat-card:nth-child(3) .stat-number',
                'expiring-month': '.stat-card:nth-child(4) .stat-number'
            }
        };

        const pageElement = document.getElementById(page);
        if (pageElement && selectors[page] && selectors[page][type]) {
            const element = pageElement.querySelector(selectors[page][type]);
            if (element) {
                element.textContent = value;
            }
        }
    }

    // 顯示模態框
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }

    // 關閉模態框
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    // 載入預設訂閱數據（備用）
    loadDefaultSubscriptionData() {
        const defaultSubscriptions = this.getDefaultSubscriptions();
        this.renderSubscriptions(defaultSubscriptions);
        this.updateSubscriptionStats(defaultSubscriptions);
    }

    // 載入預設食品數據（備用）
    loadDefaultFoodData() {
        const defaultFoodItems = this.getDefaultFoodItems();
        this.renderFoodItems(defaultFoodItems);
        this.updateFoodStats(defaultFoodItems);
    }

    // 更新儀表板統計
    updateDashboardStats() {
        const stats = {
            subscriptions: 24,
            foodItems: 13,
            urgentAlerts: 0,
            recentReminders: 5
        };

        // 動畫更新數字
        this.animateNumber('.stat-number', stats.subscriptions, 0);
    }

    // 數字動畫效果
    animateNumber(selector, target, current = 0) {
        const elements = document.querySelectorAll(selector);
        const duration = 1000;
        const steps = 30;
        const increment = target / steps;
        
        let step = 0;
        const timer = setInterval(() => {
            step++;
            current += increment;
            
            elements.forEach(el => {
                if (el.textContent.includes('NT$')) {
                    el.textContent = `NT$ ${Math.floor(current).toLocaleString()}`;
                } else if (!isNaN(parseInt(el.textContent))) {
                    el.textContent = Math.floor(current);
                }
            });
            
            if (step >= steps) {
                clearInterval(timer);
            }
        }, duration / steps);
    }

    // 載入訂閱數據
    async loadSubscriptionData() {
        try {
            // 顯示載入狀態
            this.showLoadingState('subscription');
            
            // 優先使用本地數據進行 CRUD 操作
            let subscriptions = window.contentfulClient.getLocalSubscriptions();
            
            // 如果本地沒有數據，嘗試從 Contentful 獲取並初始化本地數據
            if (subscriptions.length === 0) {
                try {
                    const contentfulSubscriptions = await window.contentfulClient.getSubscriptions();
                    if (contentfulSubscriptions.length > 0) {
                        // 將 Contentful 數據保存到本地
                        window.contentfulClient.saveLocalData('subscriptions', contentfulSubscriptions);
                        subscriptions = contentfulSubscriptions;
                    } else {
                        // 使用預設數據初始化
                        subscriptions = this.getDefaultSubscriptions();
                        window.contentfulClient.saveLocalData('subscriptions', subscriptions);
                    }
                } catch (error) {
                    console.error('從 Contentful 載入失敗，使用預設數據:', error);
                    subscriptions = this.getDefaultSubscriptions();
                    window.contentfulClient.saveLocalData('subscriptions', subscriptions);
                }
            }
            
            this.renderSubscriptions(subscriptions);
            this.updateSubscriptionStats(subscriptions);
            
            console.log('訂閱數據已載入');
        } catch (error) {
            console.error('載入訂閱數據失敗:', error);
            this.showNotification('載入訂閱數據失敗', 'error');
        }
    }

    // 獲取預設訂閱數據
    getDefaultSubscriptions() {
        return [
            {
                sys: { id: 'default-1' },
                fields: {
                    name: '天晟/廣信聯/心臟內科',
                    url: 'https://www.tsmg.com.tw/index.php/main/schedule_time/detail',
                    price: 530,
                    nextPayment: '2026-01-01',
                    icon: '🏥'
                }
            },
            {
                sys: { id: 'default-2' },
                fields: {
                    name: 'Kiro Pro',
                    url: 'https://app.kiro.dev/account/usage',
                    price: 640,
                    nextPayment: '2026-01-01',
                    icon: '💻'
                }
            },
            {
                sys: { id: 'default-3' },
                fields: {
                    name: '自然輸入法/已經取消訂閱',
                    url: 'https://service.iq.com.tw/AccountInfo',
                    price: 129,
                    nextPayment: '2026-01-03',
                    icon: '🌿'
                }
            }
        ];
    }

    // 渲染訂閱列表
    renderSubscriptions(subscriptions) {
        const subscriptionList = document.querySelector('.subscription-list');
        if (!subscriptionList) return;

        subscriptionList.innerHTML = '';

        subscriptions.forEach(subscription => {
            const fields = subscription.fields;
            const daysLeft = window.contentfulClient.calculateDaysUntilExpiry(fields.nextPayment);
            
            const subscriptionCard = document.createElement('div');
            subscriptionCard.className = 'subscription-card';
            subscriptionCard.setAttribute('data-id', subscription.sys.id);
            
            subscriptionCard.innerHTML = `
                <div class="sub-icon">${fields.icon || '📋'}</div>
                <div class="sub-info">
                    <h4>${fields.name}</h4>
                    <p>${fields.url || ''}</p>
                    <div class="sub-price">${window.contentfulClient.formatCurrency(fields.price)} /月</div>
                    <div class="sub-date">下次付款: ${window.contentfulClient.formatDate(fields.nextPayment)}</div>
                </div>
                <div class="sub-status ${daysLeft <= 3 ? 'expired' : 'active'}">
                    還有 ${daysLeft} 天
                </div>
                <div class="item-actions">
                    <button class="item-btn edit" onclick="window.fengAI.editSubscription('${subscription.sys.id}')">
                        ✏️ 編輯
                    </button>
                    <button class="item-btn delete" onclick="window.fengAI.deleteSubscription('${subscription.sys.id}')">
                        🗑️ 刪除
                    </button>
                </div>
            `;
            
            subscriptionList.appendChild(subscriptionCard);
        });
    }

    // 顯示新增訂閱模態框
    showAddSubscriptionModal() {
        this.currentEditingId = null;
        document.getElementById('subscriptionModalTitle').textContent = '新增訂閱';
        document.getElementById('subscriptionForm').reset();
        this.showModal('subscriptionModal');
    }

    // 編輯訂閱
    editSubscription(id) {
        const subscriptions = window.contentfulClient.getLocalSubscriptions();
        const subscription = subscriptions.find(sub => sub.sys.id === id);
        
        if (subscription) {
            this.currentEditingId = id;
            document.getElementById('subscriptionModalTitle').textContent = '編輯訂閱';
            
            // 填充表單
            const form = document.getElementById('subscriptionForm');
            form.name.value = subscription.fields.name || '';
            form.url.value = subscription.fields.url || '';
            form.price.value = subscription.fields.price || '';
            form.nextPayment.value = subscription.fields.nextPayment || '';
            form.icon.value = subscription.fields.icon || '📋';
            
            this.showModal('subscriptionModal');
        }
    }

    // 刪除訂閱
    deleteSubscription(id) {
        const subscriptions = window.contentfulClient.getLocalSubscriptions();
        const subscription = subscriptions.find(sub => sub.sys.id === id);
        
        if (subscription && confirm(`確定要刪除「${subscription.fields.name}」嗎？`)) {
            window.contentfulClient.deleteSubscription(id);
            this.refreshSubscriptions();
            this.showNotification('訂閱已刪除', 'success');
        }
    }

    // 保存訂閱
    saveSubscription() {
        const form = document.getElementById('subscriptionForm');
        const formData = new FormData(form);
        
        // 驗證必填欄位
        if (!formData.get('name') || !formData.get('price') || !formData.get('nextPayment')) {
            this.showNotification('請填寫所有必填欄位', 'error');
            return;
        }
        
        const subscriptionData = {
            name: formData.get('name'),
            url: formData.get('url'),
            price: parseFloat(formData.get('price')),
            nextPayment: formData.get('nextPayment'),
            icon: formData.get('icon')
        };
        
        try {
            if (this.currentEditingId) {
                // 更新現有訂閱
                window.contentfulClient.updateSubscription(this.currentEditingId, subscriptionData);
                this.showNotification('訂閱已更新', 'success');
            } else {
                // 創建新訂閱
                window.contentfulClient.createSubscription(subscriptionData);
                this.showNotification('訂閱已新增', 'success');
            }
            
            this.closeModal('subscriptionModal');
            this.refreshSubscriptions();
        } catch (error) {
            console.error('保存訂閱失敗:', error);
            this.showNotification('保存失敗', 'error');
        }
    }

    // 重新載入訂閱
    refreshSubscriptions() {
        this.loadSubscriptionData();
    }

    // 更新訂閱統計
    updateSubscriptionStats(subscriptions) {
        const totalCost = subscriptions.reduce((sum, sub) => sum + (sub.fields.price || 0), 0);
        const expiringSoon = subscriptions.filter(sub => {
            const daysLeft = window.contentfulClient.calculateDaysUntilExpiry(sub.fields.nextPayment);
            return daysLeft <= 7;
        }).length;
        const expiringVerySoon = subscriptions.filter(sub => {
            const daysLeft = window.contentfulClient.calculateDaysUntilExpiry(sub.fields.nextPayment);
            return daysLeft <= 3;
        }).length;

        // 更新統計卡片
        this.updateStatCard('subscription', 'monthly-cost', window.contentfulClient.formatCurrency(totalCost));
        this.updateStatCard('subscription', 'total-subscriptions', subscriptions.length);
        this.updateStatCard('subscription', 'expiring-soon', expiringSoon);
        this.updateStatCard('subscription', 'expiring-very-soon', expiringVerySoon);
    }

    // 載入食品數據
    async loadFoodData() {
        try {
            // 顯示載入狀態
            this.showLoadingState('food');
            
            // 優先使用本地數據進行 CRUD 操作
            let foodItems = window.contentfulClient.getLocalFoodItems();
            
            // 如果本地沒有數據，嘗試從 Contentful 獲取並初始化本地數據
            if (foodItems.length === 0) {
                try {
                    const contentfulFoodItems = await window.contentfulClient.getFoodItems();
                    if (contentfulFoodItems.length > 0) {
                        // 將 Contentful 數據保存到本地
                        window.contentfulClient.saveLocalData('foodItems', contentfulFoodItems);
                        foodItems = contentfulFoodItems;
                    } else {
                        // 使用預設數據初始化
                        foodItems = this.getDefaultFoodItems();
                        window.contentfulClient.saveLocalData('foodItems', foodItems);
                    }
                } catch (error) {
                    console.error('從 Contentful 載入失敗，使用預設數據:', error);
                    foodItems = this.getDefaultFoodItems();
                    window.contentfulClient.saveLocalData('foodItems', foodItems);
                }
            }
            
            this.renderFoodItems(foodItems);
            this.updateFoodStats(foodItems);
            
            console.log('食品數據已載入');
        } catch (error) {
            console.error('載入食品數據失敗:', error);
            this.showNotification('載入食品數據失敗', 'error');
        }
    }

    // 獲取預設食品數據
    getDefaultFoodItems() {
        return [
            {
                sys: { id: 'food-default-1' },
                fields: {
                    name: '【張君雅】五香海苔休閒丸子',
                    category: 'snacks',
                    expiryDate: '2025-02-15',
                    value: 50
                }
            },
            {
                sys: { id: 'food-default-2' },
                fields: {
                    name: '【張君雅】日式串燒休閒丸子',
                    category: 'snacks',
                    expiryDate: '2025-02-20',
                    value: 50
                }
            },
            {
                sys: { id: 'food-default-3' },
                fields: {
                    name: '樂事洋芋片',
                    category: 'snacks',
                    expiryDate: '2025-01-30',
                    value: 50
                }
            }
        ];
    }

    // 渲染食品項目
    renderFoodItems(foodItems) {
        const foodCategories = document.querySelector('.food-categories');
        if (!foodCategories) return;

        foodCategories.innerHTML = '';

        foodItems.forEach(item => {
            const fields = item.fields;
            const daysUntilExpiry = window.contentfulClient.calculateDaysUntilExpiry(fields.expiryDate);
            
            const categoryCard = document.createElement('div');
            categoryCard.className = 'category-card';
            categoryCard.setAttribute('data-id', item.sys.id);
            
            // 根據到期天數設置顏色
            let colorClass = 'green';
            if (daysUntilExpiry <= 7) colorClass = 'red';
            else if (daysUntilExpiry <= 30) colorClass = 'yellow';
            
            categoryCard.innerHTML = `
                <h3>${fields.name}</h3>
                <div class="food-image-placeholder ${colorClass}"></div>
                <div class="food-details">
                    <div class="food-expiry">到期日: ${window.contentfulClient.formatDate(fields.expiryDate)}</div>
                    <div class="food-days-left ${daysUntilExpiry <= 7 ? 'urgent' : ''}">
                        還有 ${daysUntilExpiry} 天
                    </div>
                    <div class="food-value">價值: ${window.contentfulClient.formatCurrency(fields.value || 0)}</div>
                    <div class="food-category">分類: ${this.getCategoryName(fields.category)}</div>
                </div>
                <div class="item-actions">
                    <button class="item-btn edit" onclick="window.fengAI.editFoodItem('${item.sys.id}')">
                        ✏️ 編輯
                    </button>
                    <button class="item-btn delete" onclick="window.fengAI.deleteFoodItem('${item.sys.id}')">
                        🗑️ 刪除
                    </button>
                </div>
            `;
            
            foodCategories.appendChild(categoryCard);
        });
    }

    // 獲取分類名稱
    getCategoryName(category) {
        const categoryNames = {
            'snacks': '零食',
            'beverages': '飲料',
            'canned': '罐頭',
            'frozen': '冷凍食品',
            'dairy': '乳製品',
            'condiments': '調味料',
            'other': '其他'
        };
        return categoryNames[category] || category;
    }

    // 顯示新增食品模態框
    showAddFoodModal() {
        this.currentEditingId = null;
        document.getElementById('foodModalTitle').textContent = '新增食品';
        document.getElementById('foodForm').reset();
        this.showModal('foodModal');
    }

    // 編輯食品項目
    editFoodItem(id) {
        const foodItems = window.contentfulClient.getLocalFoodItems();
        const foodItem = foodItems.find(item => item.sys.id === id);
        
        if (foodItem) {
            this.currentEditingId = id;
            document.getElementById('foodModalTitle').textContent = '編輯食品';
            
            // 填充表單
            const form = document.getElementById('foodForm');
            form.name.value = foodItem.fields.name || '';
            form.category.value = foodItem.fields.category || 'snacks';
            form.expiryDate.value = foodItem.fields.expiryDate || '';
            form.value.value = foodItem.fields.value || '';
            
            this.showModal('foodModal');
        }
    }

    // 刪除食品項目
    deleteFoodItem(id) {
        const foodItems = window.contentfulClient.getLocalFoodItems();
        const foodItem = foodItems.find(item => item.sys.id === id);
        
        if (foodItem && confirm(`確定要刪除「${foodItem.fields.name}」嗎？`)) {
            window.contentfulClient.deleteFoodItem(id);
            this.refreshFoodItems();
            this.showNotification('食品已刪除', 'success');
        }
    }

    // 保存食品項目
    saveFoodItem() {
        const form = document.getElementById('foodForm');
        const formData = new FormData(form);
        
        // 驗證必填欄位
        if (!formData.get('name') || !formData.get('expiryDate')) {
            this.showNotification('請填寫所有必填欄位', 'error');
            return;
        }
        
        const foodData = {
            name: formData.get('name'),
            category: formData.get('category'),
            expiryDate: formData.get('expiryDate'),
            value: parseFloat(formData.get('value')) || 0
        };
        
        try {
            if (this.currentEditingId) {
                // 更新現有食品
                window.contentfulClient.updateFoodItem(this.currentEditingId, foodData);
                this.showNotification('食品已更新', 'success');
            } else {
                // 創建新食品
                window.contentfulClient.createFoodItem(foodData);
                this.showNotification('食品已新增', 'success');
            }
            
            this.closeModal('foodModal');
            this.refreshFoodItems();
        } catch (error) {
            console.error('保存食品失敗:', error);
            this.showNotification('保存失敗', 'error');
        }
    }

    // 重新載入食品
    refreshFoodItems() {
        this.loadFoodData();
    }

    // 更新食品統計
    updateFoodStats(foodItems) {
        const totalValue = foodItems.reduce((sum, item) => sum + (item.fields.value || 0), 0);
        const totalCount = foodItems.length;
        const expiringSoon = foodItems.filter(item => {
            const daysLeft = window.contentfulClient.calculateDaysUntilExpiry(item.fields.expiryDate);
            return daysLeft <= 7;
        }).length;
        const expiringThisMonth = foodItems.filter(item => {
            const daysLeft = window.contentfulClient.calculateDaysUntilExpiry(item.fields.expiryDate);
            return daysLeft <= 30;
        }).length;

        // 更新統計卡片
        this.updateStatCard('food', 'total-value', window.contentfulClient.formatCurrency(totalValue));
        this.updateStatCard('food', 'total-count', totalCount);
        this.updateStatCard('food', 'expiring-soon', expiringSoon);
        this.updateStatCard('food', 'expiring-month', expiringThisMonth);
    }

    // 載入圖片庫數據
    loadGalleryData() {
        const galleryStats = {
            totalImages: 0,
            newImages: 0,
            categories: 5
        };

        // 模擬載入 /images 目錄
        this.loadImagesDirectory();
        console.log('圖片庫數據已載入:', galleryStats);
    }

    // 載入 /images 目錄內容
    async loadImagesDirectory() {
        const imagesGrid = document.getElementById('imagesGrid');
        const imageCount = document.getElementById('imageCount');
        const totalSize = document.getElementById('totalSize');
        
        if (!imagesGrid) return;

        // 設置視圖切換功能
        this.setupViewToggle();

        try {
            // 嘗試讀取實際的 images 目錄
            const response = await fetch('/images/');
            
            if (response.ok) {
                const html = await response.text();
                const images = this.parseDirectoryListing(html);
                
                if (images.length === 0) {
                    imagesGrid.innerHTML = `
                        <div class="loading-placeholder">
                            <div class="loading-icon">📂</div>
                            <p>images 目錄為空</p>
                        </div>
                    `;
                    return;
                }

                // 更新統計資訊
                if (imageCount) imageCount.textContent = images.length;
                if (totalSize) {
                    const total = images.reduce((sum, img) => sum + (img.sizeBytes || 0), 0);
                    totalSize.textContent = this.formatFileSize(total);
                }

                // 清空載入提示
                imagesGrid.innerHTML = '';

                // 顯示實際圖片
                images.forEach((image, index) => {
                    const fileItem = document.createElement('div');
                    fileItem.className = 'file-item';
                    
                    const isImage = this.isImageFile(image.name);
                    
                    fileItem.innerHTML = `
                        <div class="file-thumbnail ${isImage ? 'image' : ''}">
                            ${isImage ? this.createImagePreview(image.name) : this.getFileIcon(this.getFileExtension(image.name))}
                        </div>
                        <div class="file-info">
                            <div class="file-name">${image.name}</div>
                            <div class="file-details">
                                <div class="file-size">${image.size || 'Unknown'}</div>
                                <div class="file-date">${image.date || 'Unknown'}</div>
                            </div>
                        </div>
                    `;
                    
                    fileItem.addEventListener('click', () => {
                        // 移除其他選中狀態
                        document.querySelectorAll('.file-item').forEach(item => {
                            item.classList.remove('selected');
                        });
                        // 添加選中狀態
                        fileItem.classList.add('selected');
                        
                        if (isImage) {
                            this.previewImage(image.name);
                        } else {
                            this.showNotification(`已選擇: ${image.name}`, 'info');
                        }
                    });
                    
                    // 添加動畫延遲
                    fileItem.style.opacity = '0';
                    fileItem.style.transform = 'translateY(20px)';
                    
                    imagesGrid.appendChild(fileItem);
                    
                    // 動畫顯示
                    setTimeout(() => {
                        fileItem.style.transition = 'all 0.4s ease';
                        fileItem.style.opacity = '1';
                        fileItem.style.transform = 'translateY(0)';
                    }, index * 50);
                });
                
            } else {
                // 如果無法讀取目錄，嘗試讀取常見的圖片文件
                await this.loadCommonImages();
            }
            
        } catch (error) {
            console.log('無法讀取 images 目錄，嘗試載入常見圖片文件');
            await this.loadCommonImages();
        }
    }

    // 解析目錄列表 HTML
    parseDirectoryListing(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const links = doc.querySelectorAll('a');
        const files = [];
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href !== '../' && !href.startsWith('/')) {
                const name = decodeURIComponent(href);
                // 嘗試從連結文本或其他元素獲取文件資訊
                const text = link.textContent || link.innerText;
                files.push({
                    name: name,
                    size: 'Unknown',
                    date: 'Unknown',
                    sizeBytes: 0
                });
            }
        });
        
        return files;
    }

    // 載入常見的圖片文件
    async loadCommonImages() {
        const imagesGrid = document.getElementById('imagesGrid');
        const imageCount = document.getElementById('imageCount');
        const totalSize = document.getElementById('totalSize');
        
        // 常見的圖片文件名
        const commonImages = [
            'logo.png', 'logo.jpg', 'logo.svg',
            'banner.png', 'banner.jpg',
            'icon.png', 'icon.ico', 'favicon.ico',
            'background.png', 'background.jpg',
            'header.png', 'header.jpg',
            'screenshot.png', 'image.png', 'image.jpg'
        ];
        
        const existingImages = [];
        
        // 檢查哪些圖片文件實際存在
        for (const imageName of commonImages) {
            try {
                const response = await fetch(`/images/${imageName}`, { method: 'HEAD' });
                if (response.ok) {
                    const size = response.headers.get('content-length');
                    const lastModified = response.headers.get('last-modified');
                    
                    existingImages.push({
                        name: imageName,
                        size: size ? this.formatFileSize(parseInt(size)) : 'Unknown',
                        date: lastModified ? new Date(lastModified).toLocaleDateString() : 'Unknown',
                        sizeBytes: size ? parseInt(size) : 0
                    });
                }
            } catch (error) {
                // 文件不存在，跳過
            }
        }
        
        if (existingImages.length === 0) {
            imagesGrid.innerHTML = `
                <div class="loading-placeholder">
                    <div class="loading-icon">📂</div>
                    <p>images 目錄中沒有找到圖片文件</p>
                    <p style="font-size: 0.8rem; margin-top: 0.5rem;">請將圖片文件放入 /images 目錄</p>
                </div>
            `;
            return;
        }
        
        // 更新統計資訊
        if (imageCount) imageCount.textContent = existingImages.length;
        if (totalSize) {
            const total = existingImages.reduce((sum, img) => sum + (img.sizeBytes || 0), 0);
            totalSize.textContent = this.formatFileSize(total);
        }
        
        // 清空載入提示
        imagesGrid.innerHTML = '';
        
        // 顯示找到的圖片
        existingImages.forEach((image, index) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            
            fileItem.innerHTML = `
                <div class="file-thumbnail image">
                    ${this.createImagePreview(image.name)}
                </div>
                <div class="file-info">
                    <div class="file-name">${image.name}</div>
                    <div class="file-details">
                        <div class="file-size">${image.size}</div>
                        <div class="file-date">${image.date}</div>
                    </div>
                </div>
            `;
            
            fileItem.addEventListener('click', () => {
                document.querySelectorAll('.file-item').forEach(item => {
                    item.classList.remove('selected');
                });
                fileItem.classList.add('selected');
                this.previewImage(image.name);
            });
            
            fileItem.style.opacity = '0';
            fileItem.style.transform = 'translateY(20px)';
            imagesGrid.appendChild(fileItem);
            
            setTimeout(() => {
                fileItem.style.transition = 'all 0.4s ease';
                fileItem.style.opacity = '1';
                fileItem.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }

    // 創建圖片預覽
    createImagePreview(imageName) {
        const img = document.createElement('img');
        img.src = `/images/${imageName}`;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '4px';
        
        img.onerror = () => {
            img.style.display = 'none';
            img.parentElement.innerHTML = this.getFileIcon(this.getFileExtension(imageName));
        };
        
        return img.outerHTML;
    }

    // 預覽圖片
    previewImage(imageName) {
        // 創建圖片預覽模態框
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-backdrop" onclick="this.parentElement.remove()">
                <div class="modal-content" onclick="event.stopPropagation()">
                    <div class="modal-header">
                        <h3>${imageName}</h3>
                        <button class="close-btn" onclick="this.closest('.image-modal').remove()">✕</button>
                    </div>
                    <div class="modal-body">
                        <img src="/images/${imageName}" alt="${imageName}" style="max-width: 100%; max-height: 70vh; object-fit: contain;">
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.showNotification(`預覽圖片: ${imageName}`, 'info');
    }

    // 檢查是否為圖片文件
    isImageFile(filename) {
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'];
        const extension = this.getFileExtension(filename);
        return imageExtensions.includes(extension);
    }

    // 獲取文件擴展名
    getFileExtension(filename) {
        return filename.split('.').pop().toLowerCase();
    }

    // 格式化文件大小
    formatFileSize(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    // 設置視圖切換
    setupViewToggle() {
        const viewBtns = document.querySelectorAll('.view-btn');
        const imagesGrid = document.getElementById('imagesGrid');
        
        viewBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                viewBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const viewType = btn.getAttribute('data-view');
                if (imagesGrid) {
                    imagesGrid.className = viewType === 'list' ? 'file-grid list-view' : 'file-grid';
                }
            });
        });
    }

    // 獲取文件圖標
    getFileIcon(type) {
        const icons = {
            'PNG': '🖼️',
            'JPG': '📷',
            'JPEG': '📷',
            'SVG': '🎨',
            'ICO': '🔷',
            'GIF': '🎞️'
        };
        return icons[type.toUpperCase()] || '📄';
    }

    // 執行搜尋
    performSearch(query) {
        if (!query.trim()) {
            this.showNotification('請輸入搜尋關鍵字', 'warning');
            return;
        }

        this.showNotification(`正在搜尋: ${query}`, 'info');
        
        // 模擬搜尋延遲
        setTimeout(() => {
            this.showNotification(`找到 0 個結果`, 'success');
        }, 1000);
    }

    // 顯示通知
    showNotification(message, type = 'info') {
        // 創建通知元素
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // 設置樣式
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            color: 'white',
            fontWeight: 'bold',
            zIndex: '1000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });

        // 根據類型設置背景色
        const colors = {
            info: '#3498db',
            success: '#2ecc71',
            warning: '#f39c12',
            error: '#e74c3c'
        };
        notification.style.background = colors[type] || colors.info;

        // 添加到頁面
        document.body.appendChild(notification);

        // 動畫顯示
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // 自動移除
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // 設置動畫效果
    setupAnimations() {
        // 頁面載入動畫
        const animateOnLoad = () => {
            const elements = document.querySelectorAll('.stat-card, .section-card, .subscription-card');
            elements.forEach((el, index) => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    el.style.transition = 'all 0.6s ease';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 100);
            });
        };

        // 滾動動畫
        const observeElements = () => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            });

            const elements = document.querySelectorAll('.stats-card, .category-card');
            elements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'all 0.6s ease';
                observer.observe(el);
            });
        };

        // 執行動畫
        setTimeout(animateOnLoad, 500);
        observeElements();
    }

    // 獲取當前時間
    getCurrentTime() {
        return new Date().toLocaleString('zh-TW');
    }

    // 計算到期天數
    calculateDaysUntilExpiry(expiryDate) {
        const today = new Date();
        const expiry = new Date(expiryDate);
        const diffTime = expiry - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    // 格式化貨幣
    formatCurrency(amount) {
        return `NT$ ${amount.toLocaleString()}`;
    }

    // 設置影片播放器
    setupVideoPlayers() {
        const videoPlayers = document.querySelectorAll('.video-player');
        const videoItems = document.querySelectorAll('.video-item');

        videoPlayers.forEach((video, index) => {
            // 影片載入完成事件
            video.addEventListener('loadedmetadata', () => {
                const duration = this.formatDuration(video.duration);
                const videoItem = video.closest('.video-item');
                const durationSpan = videoItem.querySelector('.video-duration');
                if (durationSpan) {
                    durationSpan.textContent = duration;
                }
            });

            // 影片播放事件
            video.addEventListener('play', () => {
                const videoTitle = video.closest('.video-item').querySelector('.video-title').textContent;
                this.showNotification(`正在播放: ${videoTitle}`, 'info');
                
                // 暫停其他影片
                videoPlayers.forEach((otherVideo, otherIndex) => {
                    if (otherIndex !== index && !otherVideo.paused) {
                        otherVideo.pause();
                    }
                });
            });

            // 影片暫停事件
            video.addEventListener('pause', () => {
                console.log('影片已暫停');
            });

            // 影片結束事件
            video.addEventListener('ended', () => {
                const videoTitle = video.closest('.video-item').querySelector('.video-title').textContent;
                this.showNotification(`播放完成: ${videoTitle}`, 'success');
            });

            // 影片錯誤處理
            video.addEventListener('error', (e) => {
                console.error('影片載入錯誤:', e);
                const videoItem = video.closest('.video-item');
                const thumbnail = videoItem.querySelector('.video-thumbnail');
                
                thumbnail.innerHTML = `
                    <div class="video-error">
                        <div class="error-icon">⚠️</div>
                        <p>影片載入失敗</p>
                        <p style="font-size: 0.8rem; margin-top: 0.5rem;">請檢查影片文件是否存在</p>
                    </div>
                `;
            });
        });

        // 影片項目點擊事件
        videoItems.forEach(item => {
            const video = item.querySelector('.video-player');
            const overlay = item.querySelector('.video-overlay');
            
            if (overlay) {
                overlay.addEventListener('click', () => {
                    if (video.paused) {
                        video.play();
                    } else {
                        video.pause();
                    }
                });
            }
        });
    }

    // 格式化影片時長
    formatDuration(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        
        if (minutes < 60) {
            return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
        } else {
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;
            return `${hours}:${remainingMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        }
    }

    // 更新頁面標題
    updatePageTitle(title) {
        document.title = `${title} - 鋒兄AI資訊系統`;
    }

    // 設置音樂播放器
    setupMusicPlayer() {
        this.currentSong = 'marriage';
        this.currentLanguage = 'zh';
        this.lyricsVisible = true;
        
        // 歌詞數據
        this.lyricsData = {
            marriage: {
                zh: {
                    title: '最瞎結婚理由',
                    lyrics: `[Intro]
鋒兄啊你說真的還假的
塗哥聽了都快笑翻了

[Verse 1]
鋒兄說要結婚理由只有一個
今彩五三九開獎那天
頭獎號碼是思敏給的
看著獎金直直落心也跟著被收編
他說這是命中注定
不娶怎麼對得起這一連串的玄

[Chorus]
史上最瞎結婚理由
今彩五三九牽紅線牽這麼兇
一個思敏一個蕙瑄
號碼一簽兩人都中頭獎圈
你說愛情是運氣還是數學題
笑到流淚也只能說一句
最瞎最瞎卻又有點甜蜜

[Verse 2]
換到塗哥這邊故事居然同一套
今彩五三九播報畫面
他整個人直接跳
蕙瑄隨手寫的牌竟然全中好幾排
他說財神爺都點名了
不跟她走進禮堂實在太不應該

[Outro]
鋒兄牽著思敏塗哥牽著蕙瑄
喝喜酒的人一桌一桌還在笑這兩段緣
最瞎結婚理由結果都開成頭獎
如果幸福也能這樣瞎忙
那我明天也去買一張`
                },
                en: {
                    title: 'The Most Ridiculous Marriage Reason',
                    lyrics: `[Intro]
Brother Feng, are you serious or joking?
Brother Tu is laughing so hard

[Verse 1]
Brother Feng says there's only one reason to marry
On the day of the lottery draw
The winning numbers were given by Simin
Watching the jackpot fall, his heart was captured too
He says this is destiny
How can he not marry after this mystical sign

[Chorus]
The most ridiculous reason to marry
The lottery brought them together so strong
One Simin, one Huixuan
Both won the jackpot with their numbers
Is love about luck or mathematics?
Laughing till tears, can only say
Most ridiculous yet somehow sweet

[Verse 2]
Brother Tu's story is exactly the same
When the lottery results were announced
He jumped with joy
Huixuan's random numbers hit the jackpot
He says even the God of Wealth has spoken
Not marrying her would be wrong

[Outro]
Brother Feng with Simin, Brother Tu with Huixuan
Wedding guests laughing at these two stories
Most ridiculous marriage reasons turned into jackpots
If happiness can be this absurd
Then I'll buy a ticket tomorrow too`
                },
                ja: {
                    title: '史上最も馬鹿げた結婚理由',
                    lyrics: `[Intro]
鋒兄、マジデ？ウソでしょ？
塗哥は聞いてて笑いが止まらないよ

[Verse 1]
鋒兄は言う、結婚するんだ
理由はただ1つ
今彩539の抽選日
一等番号は思敏がくれた
賞金を見て、心まで奪われて
これが運命だと彼は言った
彼女を娶らなければ、この奇妙な連続を心から受け入れられない

[Chorus]
史上最も馬鹿げた結婚理由
今彩539が結んだ赤い糸
思敏と蕙瑄
一度の番号で２人とも一等に
愛は運か数学の問題か
涙が出るほど笑っても言えるのは
馬鹿げてるけど、少し甘い

[Verse 2]
塗哥に変わって
物語は同じ展開
今彩539の放送、彼は飛び上がる
蕙瑄がメモった数字、全部当たり
財神に呼ばれた彼は言う
彼女と祭壇に行かないなんてありえない

[Outro]
鋒兄は思敏を連れ
塗哥は蕙瑄を連れ
披露宴のテーブルごとに
みなこの2つの縁で笑ってる
最も馬鹿げた結婚理由
結果は一等に
もし幸福がこんなに馬鹿だったら
私も明日買いに行こうかな`
                }
            },
            evolution: {
                zh: {
                    title: '鋒兄進化Show🔥',
                    lyrics: `台北有鋒兄真好！
嗨起來別逃跑！
從榜首進化到市長, 這節奏太離譜（wow）
塗哥唱歌別裝低調, 記者都在拍照！
綾小路都說這段人生　根本 S 級動畫稿～

37歲那年我高考三級奪榜首（yeah）
資訊處理一戰成名　程式都寫成傳說～
隔著時代的螢幕光　夢想像演算法（run）
52歲副市長代理市長上陣忙！（yo）

塗哥敢唱「有鋒兄真好」
備取瞬間正取秒秒到～
不唱就取消資格笑　
進化不靠運氣靠信號！

台北有鋒兄真好！
嗨起來別逃跑！
從榜首進化到市長, 命運像 debug 一樣爆！
塗哥嗓門開到爆表, 全場跟著大合唱！
「代理」只是過場　市民心中早就想！

2040那年的夜　霓虹閃爍到市政廳
競選標語像 ACG 的 opening
「別說不可能, 鋒兄就是 evolution！」
AI 輔助政務操作　資料開放新世代～

陰陽同框　政治與理想　交錯的舞台線上～
一首歌唱到選票都跳起來　塗哥還要再唱！

台北有鋒兄真好！
嗨起來直到早朝！
榜首到市長的進化論　全城都在尖叫！
綾小路清隆也點頭　這進化合乎理想！
「ムリムリ進化論？」不——這是鋒兄進化 Show！🔥`
                },
                en: {
                    title: 'Brother Feng Evolution Show🔥',
                    lyrics: `Taipei is great with Brother Feng!
Get hyped, don't run away!
From top scorer to mayor, this rhythm is insane (wow)
Brother Tu singing, don't be shy, reporters are taking photos!
Even Ayanokoji says this life is S-tier anime material~

At 37, I topped the civil service exam (yeah)
Information processing made me legendary, code became legend~
Through the screen light of the era, dreams like algorithms (run)
At 52, deputy mayor, acting mayor, so busy! (yo)

Brother Tu dares to sing "Brother Feng is great"
From backup to official in seconds~
Don't sing and lose qualification, laugh
Evolution doesn't rely on luck but signals!

Taipei is great with Brother Feng!
Get hyped, don't run away!
From top scorer to mayor, destiny explodes like debugging!
Brother Tu's voice at max, everyone singing along!
"Acting" is just a phase, citizens already decided!

In 2040's night, neon lights flash at city hall
Campaign slogans like ACG opening
"Don't say impossible, Brother Feng is evolution!"
AI-assisted governance, open data new era~

Yin and yang together, politics and ideals, crossing stage lines~
One song makes votes jump, Brother Tu wants to sing more!

Taipei is great with Brother Feng!
Get hyped until dawn!
Evolution from top scorer to mayor, the whole city screaming!
Even Ayanokoji Kiyotaka nods, this evolution fits the ideal!
"Impossible evolution?" No—this is Brother Feng Evolution Show! 🔥`
                },
                ja: {
                    title: '鋒兄進化Show🔥',
                    lyrics: `台北に鋒兄がいて本当に良い！
盛り上がって逃げるな！
トップから市長への進化、このリズムはヤバい（wow）
塗哥は歌って控えめにするな、記者が写真を撮ってる！
綾小路もこの人生はSランクアニメの原稿だと言う～

37歳の年に公務員試験でトップ（yeah）
情報処理で一戦成名　プログラムは伝説になった～
時代のスクリーンの光を通して　夢はアルゴリズムのよう（run）
52歳で副市長、代理市長で忙しい！（yo）

塗哥は「鋒兄がいて良い」と歌う勇気
補欠から正式に秒で到着～
歌わないと資格取り消し笑
進化は運じゃなくて信号に頼る！

台北に鋒兄がいて本当に良い！
盛り上がって逃げるな！
トップから市長への進化、運命はデバッグのように爆発！
塗哥の声は最大、全員が大合唱！
「代理」はただの通過点　市民の心はもう決まってる！

2040年の夜　ネオンが市政庁に輝く
選挙スローガンはACGのオープニングのよう
「不可能と言うな、鋒兄は進化だ！」
AI補助政務操作　データ開放新時代～

陰陽同枠　政治と理想　交錯する舞台線上～
一曲で投票が跳ね上がる　塗哥はまた歌いたい！

台北に鋒兄がいて本当に良い！
朝まで盛り上がれ！
トップから市長への進化論　全市が叫んでる！
綾小路清隆も頷く　この進化は理想に合う！
「ムリムリ進化論？」いや——これは鋒兄進化Show！🔥`
                }
            }
        };

        // 音樂文件映射
        this.musicFiles = {
            marriage: {
                zh: 'musics/最瞎結婚理由.mp3',
                en: 'musics/最瞎結婚理由 (英語).mp3',
                ja: 'musics/最瞎結婚理由 (日語).mp3'
            },
            evolution: {
                zh: 'musics/鋒兄進化Show🔥.mp3',
                en: 'musics/鋒兄進化Show🔥(英語).mp3',
                ja: 'musics/鋒兄進化Show🔥(日語).mp3'
            }
        };

        // 設置事件監聽器
        this.setupMusicEventListeners();
        
        // 初始化顯示
        this.updateMusicDisplay();
    }

    // 設置音樂播放器事件監聽器
    setupMusicEventListeners() {
        // 語言切換按鈕
        const langBtns = document.querySelectorAll('.lang-btn');
        langBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                langBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentLanguage = btn.getAttribute('data-lang');
                this.updateMusicDisplay();
                this.showNotification(`切換到${this.getLanguageName(this.currentLanguage)}版本`, 'info');
            });
        });

        // 歌曲切換按鈕
        const songTabs = document.querySelectorAll('.song-tab');
        songTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                songTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.currentSong = tab.getAttribute('data-song');
                this.updateMusicDisplay();
                this.showNotification(`切換到《${this.getCurrentSongTitle()}》`, 'info');
            });
        });

        // 歌曲項目點擊
        const songItems = document.querySelectorAll('.song-item');
        songItems.forEach(item => {
            item.addEventListener('click', () => {
                songItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                this.currentSong = item.getAttribute('data-song');
                
                // 更新歌曲標籤
                const songTabs = document.querySelectorAll('.song-tab');
                songTabs.forEach(t => t.classList.remove('active'));
                const targetTab = document.querySelector(`[data-song="${this.currentSong}"]`);
                if (targetTab) targetTab.classList.add('active');
                
                this.updateMusicDisplay();
                this.showNotification(`選擇《${this.getCurrentSongTitle()}》`, 'info');
            });
        });

        // 歌詞控制按鈕
        const toggleLyricsBtn = document.getElementById('toggleLyrics');
        const copyLyricsBtn = document.getElementById('copyLyrics');
        
        if (toggleLyricsBtn) {
            toggleLyricsBtn.addEventListener('click', () => {
                this.toggleLyrics();
            });
        }

        if (copyLyricsBtn) {
            copyLyricsBtn.addEventListener('click', () => {
                this.copyLyrics();
            });
        }

        // 音頻播放器事件
        const musicPlayer = document.getElementById('musicPlayer');
        if (musicPlayer) {
            musicPlayer.addEventListener('play', () => {
                this.showNotification(`正在播放：${this.getCurrentSongTitle()}`, 'info');
            });

            musicPlayer.addEventListener('pause', () => {
                console.log('音樂已暫停');
            });

            musicPlayer.addEventListener('ended', () => {
                this.showNotification(`播放完成：${this.getCurrentSongTitle()}`, 'success');
            });

            musicPlayer.addEventListener('error', (e) => {
                console.error('音樂載入錯誤:', e);
                this.showNotification('音樂文件載入失敗', 'error');
            });
        }
    }

    // 更新音樂顯示
    updateMusicDisplay() {
        const currentSongData = this.lyricsData[this.currentSong][this.currentLanguage];
        
        // 更新歌曲標題
        const songTitleElement = document.getElementById('currentSongTitle');
        if (songTitleElement) {
            songTitleElement.textContent = currentSongData.title;
        }

        // 更新歌詞標題
        const lyricsTitleElement = document.getElementById('lyricsTitle');
        if (lyricsTitleElement) {
            lyricsTitleElement.textContent = `📝 ${currentSongData.title} - 歌詞`;
        }

        // 更新歌詞內容
        const lyricsContentElement = document.getElementById('lyricsContent');
        if (lyricsContentElement) {
            lyricsContentElement.textContent = currentSongData.lyrics;
        }

        // 更新音頻源
        const musicPlayer = document.getElementById('musicPlayer');
        if (musicPlayer) {
            const audioSource = musicPlayer.querySelector('source');
            if (audioSource) {
                audioSource.src = this.musicFiles[this.currentSong][this.currentLanguage];
                musicPlayer.load(); // 重新載入音頻
            }
        }
    }

    // 獲取當前歌曲標題
    getCurrentSongTitle() {
        return this.lyricsData[this.currentSong][this.currentLanguage].title;
    }

    // 獲取語言名稱
    getLanguageName(lang) {
        const names = {
            zh: '中文',
            en: 'English',
            ja: '日本語'
        };
        return names[lang] || lang;
    }

    // 切換歌詞顯示/隱藏
    toggleLyrics() {
        const lyricsContent = document.getElementById('lyricsContent');
        const toggleBtn = document.getElementById('toggleLyrics');
        
        if (lyricsContent && toggleBtn) {
            this.lyricsVisible = !this.lyricsVisible;
            
            if (this.lyricsVisible) {
                lyricsContent.classList.remove('hidden');
                toggleBtn.textContent = '隱藏歌詞';
            } else {
                lyricsContent.classList.add('hidden');
                toggleBtn.textContent = '顯示歌詞';
            }
            
            this.showNotification(this.lyricsVisible ? '歌詞已顯示' : '歌詞已隱藏', 'info');
        }
    }

    // 複製歌詞
    copyLyrics() {
        const currentSongData = this.lyricsData[this.currentSong][this.currentLanguage];
        const lyricsText = `${currentSongData.title}\n\n${currentSongData.lyrics}`;
        
        navigator.clipboard.writeText(lyricsText).then(() => {
            this.showNotification('歌詞已複製到剪貼板', 'success');
        }).catch(err => {
            console.error('複製失敗:', err);
            this.showNotification('複製失敗，請手動選擇文字複製', 'error');
        });
    }
}

// 初始化系統
document.addEventListener('DOMContentLoaded', () => {
    const system = new FengAISystem();
    
    // 全局變數，方便調試
    window.fengAI = system;
    
    // 點擊模態框外部關閉
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            const modalId = e.target.id;
            system.closeModal(modalId);
        }
    });
    
    console.log('🤖 鋒兄AI資訊系統已啟動');
    console.log('系統時間:', system.getCurrentTime());
});

// 鍵盤快捷鍵
document.addEventListener('keydown', (e) => {
    // Ctrl + 數字鍵快速切換頁面
    if (e.ctrlKey && e.key >= '1' && e.key <= '7') {
        e.preventDefault();
        const pages = ['home', 'dashboard', 'food', 'subscription', 'images', 'video', 'music'];
        const pageIndex = parseInt(e.key) - 1;
        if (pages[pageIndex] && window.fengAI) {
            window.fengAI.switchPage(pages[pageIndex]);
            
            // 更新導航狀態
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach(nav => nav.classList.remove('active'));
            const targetNav = document.querySelector(`[data-page="${pages[pageIndex]}"]`);
            if (targetNav) targetNav.classList.add('active');
        }
    }
});

// 視窗大小改變時的響應
window.addEventListener('resize', () => {
    // 重新計算佈局
    const isMobile = window.innerWidth <= 768;
    document.body.classList.toggle('mobile-layout', isMobile);
});

// 頁面可見性變化處理（僅處理影片，不處理音樂）
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('頁面已隱藏');
        // 當頁面隱藏時只暫停影片，不暫停音樂
        if (window.fengAI) {
            window.fengAI.pauseAllVideos();
        }
    } else {
        console.log('頁面已顯示');
        // 可以在這裡重新載入數據
    }
});

// 當用戶即將離開頁面時暫停影片（不暫停音樂）
window.addEventListener('beforeunload', () => {
    if (window.fengAI) {
        window.fengAI.pauseAllVideos();
    }
});

// 當頁面失去焦點時暫停影片（不暫停音樂）
window.addEventListener('blur', () => {
    if (window.fengAI) {
        window.fengAI.pauseAllVideos();
    }
});