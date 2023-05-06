<script setup>
import { useTransactionsStore } from '../../store/transactions'
const transactionsStore = useTransactionsStore()
</script>

<template src="./sharespfb.html"></template>

<script>
export default {
  data() {
    return {
      gateway: 'http://bridge-blockspacerace.avril14th.org',
      port: '26659',
      namespace: '',
      height: '',
      isLoading: false,
      isError: false,
      isSubmitted: false,
      errorMessage: '',
      responseMessage: '',
    };
  },

  methods: {
    getShares() {
      const transactionsStore = useTransactionsStore()
      if (this.isLoading) {
        this.errorMessage = `Waiting for previous request...`
        this.$refs.errorMessage.style.display = "block"
        this.$refs.loading.style.display = "none"
        return
      }

      this.responseMessage = ''
      this.isLoading = true
      this.$refs.errorMessage.style.display = "none"
      this.$refs.loading.style.display = "block"
      this.$refs.responseMessage.style.display = "none"
      
      /**
       * TODO
       * check for CORS on celestia-node gateway server
       * https://github.com/celestiaorg/celestia-node/blob/929a334e90b0a81e890a113beccb43caa2dee485/api/gateway/server.go#L88
       * https://www.stackhawk.com/blog/golang-cors-guide-what-it-is-and-how-to-enable-it/
       */
      fetch(`${this.gateway}:${this.port}/namespaced_shares/${this.namespace}/height/${this.height}`)
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
        transactionsStore.addShares(this.namespace, resJson.shares)
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