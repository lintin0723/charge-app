const { createApp } = Vue;

createApp({
    data() {
        return {
            transactions: [],
            currentBalance: 0,
            newTransaction: {
                description: '',
                amount: 0,
                date: new Date().toISOString().slice(0, 10) // 預設為今天
            },
            apiUrl: '/api/transactions'
        };
    },
    methods: {
        // 獲取所有交易紀錄
        async fetchTransactions() {
            try {
                const response = await fetch(this.apiUrl);
                if (!response.ok) {
                    throw new Error('無法獲取交易紀錄');
                }
                this.transactions = await response.json();
            } catch (error) {
                console.error('錯誤:', error);
            }
        },
        // 獲取目前餘額
        async fetchBalance() {
            try {
                const response = await fetch(`${this.apiUrl}/balance`);
                if (!response.ok) {
                    throw new Error('無法獲取餘額');
                }
                this.currentBalance = await response.json();
            } catch (error) {
                console.error('錯誤:', error);
            }
        },
        // 新增一筆交易
        async addTransaction() {
            try {
                const response = await fetch(this.apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.newTransaction)
                });
                if (!response.ok) {
                    throw new Error('無法新增交易');
                }
                // 重新獲取列表和餘額以顯示更新
                this.fetchTransactions();
                this.fetchBalance();

                // 清空表單
                this.newTransaction.description = '';
                this.newTransaction.amount = 0;
            } catch (error) {
                console.error('錯誤:', error);
            }
        }
    },
    // 當 Vue 應用程式被掛載到頁面上時，自動執行此函數
    mounted() {
        this.fetchTransactions();
        this.fetchBalance();
    }
}).mount('#app');
