// Contentful 配置和客戶端
class ContentfulClient {
    constructor() {
        // 由於這是前端代碼，我們需要使用 CDN 方式載入 Contentful SDK
        this.spaceId = 'navontrqk0l3';
        this.environment = 'master';
        this.accessToken = '83Q5hThGBPCIgXAYX7Fc-gSUN-psxg_j-F-gXSskQBc';
        // 注意：對於寫入操作，通常需要 Management API token，這裡先用 Delivery API
        this.client = null;
        this.initClient();
    }

    // 初始化 Contentful 客戶端
    async initClient() {
        try {
            // 動態載入 Contentful SDK
            if (typeof contentful === 'undefined') {
                await this.loadContentfulSDK();
            }
            
            this.client = contentful.createClient({
                space: this.spaceId,
                environment: this.environment,
                accessToken: this.accessToken
            });
            
            console.log('✅ Contentful 客戶端初始化成功');
        } catch (error) {
            console.error('❌ Contentful 客戶端初始化失敗:', error);
        }
    }

    // 動態載入 Contentful SDK
    loadContentfulSDK() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/contentful@latest/dist/contentful.browser.min.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    // 獲取單個條目
    async getEntry(entryId) {
        try {
            if (!this.client) {
                await this.initClient();
            }
            const entry = await this.client.getEntry(entryId);
            return entry;
        } catch (error) {
            console.error('獲取條目失敗:', error);
            throw error;
        }
    }

    // 獲取多個條目
    async getEntries(contentType, query = {}) {
        try {
            if (!this.client) {
                await this.initClient();
            }
            
            const entries = await this.client.getEntries({
                content_type: contentType,
                ...query
            });
            
            return entries.items;
        } catch (error) {
            console.error('獲取條目列表失敗:', error);
            throw error;
        }
    }

    // 獲取訂閱數據
    async getSubscriptions() {
        try {
            return await this.getEntries('subscription');
        } catch (error) {
            console.error('獲取訂閱數據失敗:', error);
            return [];
        }
    }

    // 獲取食品數據
    async getFoodItems() {
        try {
            return await this.getEntries('foodItem');
        } catch (error) {
            console.error('獲取食品數據失敗:', error);
            return [];
        }
    }

    // 本地存儲 CRUD 操作（作為 Contentful 的備用方案）
    
    // 獲取本地存儲的數據
    getLocalData(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('讀取本地數據失敗:', error);
            return [];
        }
    }

    // 保存數據到本地存儲
    saveLocalData(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('保存本地數據失敗:', error);
            return false;
        }
    }

    // 創建新的訂閱
    createSubscription(subscriptionData) {
        const subscriptions = this.getLocalData('subscriptions');
        const newSubscription = {
            sys: { id: this.generateId() },
            fields: {
                ...subscriptionData,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        };
        subscriptions.push(newSubscription);
        this.saveLocalData('subscriptions', subscriptions);
        return newSubscription;
    }

    // 更新訂閱
    updateSubscription(id, subscriptionData) {
        const subscriptions = this.getLocalData('subscriptions');
        const index = subscriptions.findIndex(sub => sub.sys.id === id);
        if (index !== -1) {
            subscriptions[index].fields = {
                ...subscriptions[index].fields,
                ...subscriptionData,
                updatedAt: new Date().toISOString()
            };
            this.saveLocalData('subscriptions', subscriptions);
            return subscriptions[index];
        }
        return null;
    }

    // 刪除訂閱
    deleteSubscription(id) {
        const subscriptions = this.getLocalData('subscriptions');
        const filteredSubscriptions = subscriptions.filter(sub => sub.sys.id !== id);
        this.saveLocalData('subscriptions', filteredSubscriptions);
        return filteredSubscriptions.length < subscriptions.length;
    }

    // 創建新的食品項目
    createFoodItem(foodData) {
        const foodItems = this.getLocalData('foodItems');
        const newFoodItem = {
            sys: { id: this.generateId() },
            fields: {
                ...foodData,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        };
        foodItems.push(newFoodItem);
        this.saveLocalData('foodItems', foodItems);
        return newFoodItem;
    }

    // 更新食品項目
    updateFoodItem(id, foodData) {
        const foodItems = this.getLocalData('foodItems');
        const index = foodItems.findIndex(item => item.sys.id === id);
        if (index !== -1) {
            foodItems[index].fields = {
                ...foodItems[index].fields,
                ...foodData,
                updatedAt: new Date().toISOString()
            };
            this.saveLocalData('foodItems', foodItems);
            return foodItems[index];
        }
        return null;
    }

    // 刪除食品項目
    deleteFoodItem(id) {
        const foodItems = this.getLocalData('foodItems');
        const filteredFoodItems = foodItems.filter(item => item.sys.id !== id);
        this.saveLocalData('foodItems', filteredFoodItems);
        return filteredFoodItems.length < foodItems.length;
    }

    // 獲取本地訂閱數據（優先使用本地數據進行 CRUD）
    getLocalSubscriptions() {
        return this.getLocalData('subscriptions');
    }

    // 獲取本地食品數據（優先使用本地數據進行 CRUD）
    getLocalFoodItems() {
        return this.getLocalData('foodItems');
    }

    // 生成唯一 ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
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

    // 格式化日期
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('zh-TW');
    }
}

// 創建全局 Contentful 客戶端實例
window.contentfulClient = new ContentfulClient();