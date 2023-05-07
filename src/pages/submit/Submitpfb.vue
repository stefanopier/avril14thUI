<script setup>
import helpers from '../../helper'

import { useTransactionsStore } from '../../store/transactions'
const transactionsStore = useTransactionsStore()
</script>

<template src="./submitpfb.html"></template>

<script>
export default {
  data() {
    return {
      gateway: 'http://bridge-blockspacerace.avril14th.org',
      port: '26659',
      rndNamespace: '',
      rndTxData: '',
      gasLimit: '',
      gasFee: '',
      isLoading: false,
      isError: false,
      isSubmitted: false,
      errorMessage: '',
      responseMessage: '',
    };
  },

  methods: {
    generateRndNamespace() {
      this.rndNamespace = helpers.getRandomBytesHex(8)
    },

    generateRndTxData() {
      this.rndTxData = helpers.getRandomBytesHex(100)
    },

    submitTransaction() {
      const transactionsStore = useTransactionsStore()
      if (this.isLoading) {
        this.errorMessage = `Waiting ...`
        this.$refs.errorMessage.style.display = "block"
        this.$refs.loading.style.display = "none"
        return
      }

      this.responseMessage = ''
      this.isLoading = true
      this.$refs.errorMessage.style.display = "none"
      this.$refs.loading.style.display = "block"
      this.$refs.responseMessage.style.display = "none"

      fetch(`${this.gateway}:${this.port}/submit_pfb`, {
        method:  'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          namespace_id: this.rndNamespace,
          data: this.rndTxData,
          gas_limit: this.gasLimit,
          fee: this.gasFee
        })
      })
      .then( res => {
        if (res.status >= 400) {
          this.isLoading = false
          this.isError = true
          this.errorMessage = `Unable to send the request, error ${res.status} ${res.statusText}`
          this.$refs.errorMessage.style.display = "block"
          this.$refs.loading.style.display = "none"
          throw new Error(res);
        } else if (res.status === 500) {
          this.isLoading = false
          this.isError = true
          this.errorMessage = 'Unable to contact server'
          this.$refs.errorMessage.style.display = "block"
          this.$refs.loading.style.display = "none"
          throw new Error('Unable to contact server');
        } else if (!res.ok) {
          this.errorMessage = 'HTTP error'
          this.$refs.errorMessage.style.display = "block"
          this.$refs.loading.style.display = "none"
          throw new Error(`HTTP error! status: ${res.status}`);
        } else {
          return res.json()
        }
      })
      .then((resJson) => {
        transactionsStore.addTransaction(resJson)
        transactionsStore.addNamespaceId(resJson.txhash, this.rndNamespace)
        this.isLoading = false
        this.isSubmitted = true
        this.errorMessage = 'Ok'
        this.$refs.loading.style.display = "none"
        this.$refs.errorMessage.style.display = "none"
        this.$refs.responseMessage.style.display = "block"
      })
      .catch(error => {
        console.log('Error', error.message);
      })
    }
  }
};
</script>