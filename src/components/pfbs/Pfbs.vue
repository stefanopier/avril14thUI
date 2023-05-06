<script setup>
import { storeToRefs } from 'pinia'

import { useTransactionsStore } from '../../store/transactions'

const transactionsStore = useTransactionsStore()
const { transactions } = storeToRefs(transactionsStore)
</script>

<template src="./pfbs.html"></template>
