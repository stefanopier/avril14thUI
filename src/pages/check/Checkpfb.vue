<script setup>
import Pfbs from '../../components/pfbs/Pfbs.vue';

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
      isSubmitted: false,
      errorMessage: '',
      responseMessage: '',
    };
  },
  
  methods: {
    checkTransaction() {
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

      fetch(`https://api.mintscan.io/v1/celestia-incentivized-testnet/txs/hash/${this.txHash}`)
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
        this.isLoading = false
        this.isSubmitted = true
        this.errorMessage = ''
        this.responseMessage = 'Ok'
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
