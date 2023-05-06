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
    addTransaction(tr) {
      if(this.transactions) {
        const found = this.transactions.findIndex(el => el.txHash === tr.txHash)
        if(found>=0) {
          this.transactions[found] = tr;
        } else {
          this.transactions.push(tr);
        }
      }
    },
    removeTransaction(index) {
        this.transactions.splice(index, 1)
    },
    addNamespaceId(txHash, namespaceId) {
      if(this.transactions) {
        const found = this.transactions.findIndex(el => el.txHash === txHash)
        if(found>=0) {
          this.transactions[found].namespaceId = namespaceId;
        }
      }
    },
    addShares(namespaceId, shares) {
      if(this.transactions) {
        const found = this.transactions.findIndex(el => el.namespaceId === namespaceId)
        if(found>=0) {
          this.transactions[found].shares = shares;
        }
      }
    }
  }
})
