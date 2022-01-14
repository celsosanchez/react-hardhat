import React from 'react'
import ReactDOM from 'react-dom'
import { Rinkeby, DAppProvider, useEtherBalance, useEthers, Config } from '@usedapp/core'
import App from './App'
import reportWebVitals from './reportWebVitals';
import './index.css';
const config = {
  readOnlyChainId: Rinkeby.chainId,
  readOnlyUrls: {
    [Rinkeby.chainId]: 'https://mainnet.infura.io/v3/3165a249c65f4198bf57200109b8fadf',
  },
}

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();