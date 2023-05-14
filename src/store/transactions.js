import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useTransactionsStore = defineStore('transactions', {
  state: () => ({
    transactions: useStorage('transactions', [])
  }),

  getters: {
    getTransactions() {
      return this.transactions
    },
    transactionsEmpty() {
        return this.transactions.length <= 0
    }
  },

  actions: {
    addTransaction(namespaceId, tr) {
      if(this.transactions) {
        let o = { ...tr, namespaceId: namespaceId }
        const found = this.transactions.findIndex(el => el.txhash === tr.txhash)
        if (found>=0) {
          Object.assign(this.transactions[found], o)
        } else {
          this.transactions.push(o)
        }
      }
    },
    removeTransaction(index) {
        this.transactions.splice(index, 1)
    },
    addShares(namespaceId, height, shares) {
      if (this.transactions) {
        const found = this.transactions.findIndex(el => el.namespaceId === namespaceId && el.height === height)
        if (found>=0) {
          this.transactions[found].shares = shares
        }
      } else {
        this.transactions.push({ namespaceId: namespaceId, height: height, shares: shares })
      }
    },
    addTransactionScan(tr) {
      if(this.transactions) {
        let o = { ...tr, namespaceId: namespaceId }
        const found = this.transactions.findIndex(el => el.txhash === tr.txhash)
        if (found>=0) {
          Object.assign(this.transactions[found], o)
        } else {
          this.transactions.push(o)
        }
      }
    },
  }
});
