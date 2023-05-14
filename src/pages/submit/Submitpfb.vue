<script setup>
import Pfbs from '../../components/pfbs/Pfbs.vue'
import helpers from '../../helper'

import { useTransactionsStore } from '../../store/transactions'
const transactionsStore = useTransactionsStore()
</script>

<template src="./submitpfb.html"></template>

<script>
export default {
  components: {
    Pfbs
  },

  data() {
    return {
      gateway: 'http://bridge-blockspacerace.avril14th.org',
      port: '26659',
      rndNamespace: '',
      rndTxData: '',
      gasLimit: '',
      gasFee: '',
      walletAddr: '',
      isLoading: false,
      errorMessage: '',
      responseMessage: '',
    }
  },

  methods: {
    generateRndNamespace() {
      this.rndNamespace = helpers.getRandomBytesHex(8)
    },

    generateRndTxData() {
      this.rndTxData = helpers.getRandomBytesHex(100)
    },

    submitTransaction() {
      if (!this.gateway || !this.port || !this.rndNamespace || !this.rndTxData || !this.gasLimit || !this.gasFee) {
        return true
      }

      const transactionsStore = useTransactionsStore()
      if (this.isLoading) {
        this.$refs.loading.style.display = "block"
        return
      }

      this.responseMessage = ''
      this.isLoading = true
      this.$refs.errorMessage.style.display = "none"
      this.$refs.loading.style.display = "block"
      this.$refs.responseMessage.style.display = "none"

      fetch('https://www.avril14th.org/submit_pfb', {
        method:  'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          gateway: this.gateway,
          port: this.port,
          namespaceId: this.rndNamespace,
          txData: this.rndTxData,
          gasLimit: this.gasLimit,
          gasFee: this.gasFee,
          //walletAddr: this.walletAddr
        })
      })
      .then( res => {
        if (res.status >= 400) {
          this.isLoading = false
          this.errorMessage = 'Unable to send the request'
          this.$refs.errorMessage.style.display = "block"
          this.$refs.loading.style.display = "none"
          throw new Error(res)
        } else if (res.status === 500) {
          this.isLoading = false
          this.errorMessage = 'Unable to contact server'
          this.$refs.errorMessage.style.display = "block"
          this.$refs.loading.style.display = "none"
          throw new Error('Unable to contact server')
        } else if (!res.ok) {
          this.errorMessage = 'HTTP error'
          this.$refs.errorMessage.style.display = "block"
          this.$refs.loading.style.display = "none"
          throw new Error(`HTTP error! status: ${res.status}`)
        } else {
          return res.json()
        }
      })
      .then((resJson) => {
        if (!resJson.proxyError) {
          if(resJson.height && resJson.height > 0) {
            transactionsStore.addTransaction(this.rndNamespace, resJson)
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
            this.errorMessage = 'Submit request error'
            this.$refs.errorMessage.style.display = "block"
            this.$refs.loading.style.display = "none"
            throw new Error(JSON.stringify(resJson))
          }
        } else {
          this.errorMessage = 'Submit request error'
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
    }
  }
}
</script>