# Avril14th blockchain tools

## Celestia PFB UI

Simple UI tools developed for the [Blockspacerace Race](https://docs.celestia.org/nodes/blockspace-race/):  
- submit Celestia's PayForBlobs transactions using [Node API ](https://docs.celestia.org/developers/node-tutorial/#submit-a-pfb-transaction)
- get the namespaced shares using [Node API ](https://docs.celestia.org/developers/node-tutorial/#get-namespaced-shares-by-block-height)
- check the transaction on [Mintscan ](https://hub.mintscan.io/chains/overview)

Provided random hex generator based on [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Crypto)

### Development notes

Single Page App developed with [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/) and [Pinia](https://pinia.vuejs.org/)  
API calls managed with [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)  
Pinia store saved to [local storage](https://vueuse.org/core/useStorage/#usestorage)

```
git clone https://github.com/stefanopier/avril14thUI.git  
npm install  
npm run dev  
```
```
npm run build
npm run preview
```

### TODOS
Deploy an API proxy server to avoid CORS origin errors