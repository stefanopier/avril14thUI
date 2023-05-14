<script setup>
import Pfbs from '../../components/pfbs/Pfbs.vue'

import { useTransactionsStore } from '../../store/transactions'
const transactionsStore = useTransactionsStore()
</script>

<template src="./checkpfb.html"></template>

<script>
export default {
  components: {
    Pfbs
  },

  data() {
    return {
      txHash: '',
      isLoading: false,
      isError: false,
      errorMessage: '',
      responseMessage: '',
    }
  },
  
  methods: {
    checkTransaction() {
      if (!this.txHash) {
        return true
      }

      /* NOT ALLOWED by Mintscan
      const transactionsStore = useTransactionsStore()
      if (this.isLoading) {
        this.errorMessage = 'Waiting ...'
        this.$refs.errorMessage.style.display = "block"
        this.$refs.loading.style.display = "none"
        return
      }

      this.responseMessage = ''
      this.isLoading = true
      this.$refs.errorMessage.style.display = "none"
      this.$refs.loading.style.display = "block"
      this.$refs.responseMessage.style.display = "none"

      fetch(`https://www.avril14th.org/check_transaction?txhash=${this.txHash}`)
      .then( res => {
        if (res.status >= 400) {
          this.isLoading = false
          this.isError = true
          this.errorMessage = 'Unable to send the request, please check on Mintscan website'
          this.$refs.errorMessage.style.display = "block"
          this.$refs.loading.style.display = "none"
          throw new Error(res)
        } else if (res.status === 500) {
          this.isLoading = false
          this.isError = true
          this.errorMessage = 'Unable to contact server, please check on Mintscan website'
          this.$refs.errorMessage.style.display = "block"
          this.$refs.loading.style.display = "none"
          throw new Error('Unable to contact server')
        } else if (!res.ok) {
          this.isError = true
          this.errorMessage = 'HTTP error, please check on Mintscan website'
          this.$refs.errorMessage.style.display = "block"
          this.$refs.loading.style.display = "none"
          throw new Error(`HTTP error! status: ${res.status}`)
        } else {
          return res.json()
        }
      })
      .then((resJson) => {
        if (!resJson.proxyError) {
          if(resJson.header && resJson.header > 0) {
            transactionsStore.addTransactionScan(resJson)
            this.isError = false
            this.isLoading = false
            this.errorMessage = ''
            this.responseMessage = 'Ok'
            this.$refs.loading.style.display = "none"
            this.$refs.errorMessage.style.display = "none"
            this.$refs.responseMessage.style.display = "block"
            setTimeout(() => {
              this.$refs.responseMessage.style.display = "none"
            }, 5000)
          } else {
            this.errorMessage = 'Check request error'
            this.$refs.errorMessage.style.display = "block"
            this.$refs.loading.style.display = "none"
            throw new Error(JSON.stringify(resJson))
          }
        } else {
          this.errorMessage = 'Check request error'
          this.$refs.errorMessage.style.display = "block"
          this.$refs.loading.style.display = "none"
          throw new Error(JSON.stringify(resJson))
        }
      })
      .catch(error => {
        console.log('Error', error.message)
        setTimeout(() => {
          this.isLoading = false
          this.errorMessage = ''
          this.$refs.loading.style.display = "none"
          this.$refs.errorMessage.style.display = "none"
          this.$refs.responseMessage.style.display = "none"
        }, 5000)
      })
    },
    */
    
      window.open(`https://testnet.mintscan.io/celestia-incentivized-testnet/txs/${this.txHash}`, '_blank')
    }
  }
}
</script>
