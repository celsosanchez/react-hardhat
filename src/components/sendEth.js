import React, { useEffect, useState } from 'react'
import { formatEther } from '@ethersproject/units'
import { BigNumber } from 'ethers'
import { useEtherBalance, useEthers } from '@usedapp/core'
import { useSendTransaction } from '@usedapp/core'
import { utils } from 'ethers'

const formatter = new Intl.NumberFormat('en-us', {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  })

const formatBalance = (balance) =>
  formatter.format(parseFloat(formatEther(balance ?? BigNumber.from('0'))))
const InputComponent = () => {
  const { account } = useEthers()

  const [amount, setAmount] = useState('0')
  const [address, setAddress] = useState('')
  const [disabled, setDisabled] = useState(false)

  const { sendTransaction, state } = useSendTransaction({ transactionName: 'Send Ethereum' })

  const handleClick = () => {
    setDisabled(true)
    sendTransaction({ to: address, value: utils.parseEther(amount) })
  }

  useEffect(() => {
    if (state.status != 'Mining') {
      setDisabled(false)
      setAmount('0')
      setAddress('')
    }
  }, [state])

  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'  }}>
        <div>
        <p>Amount:</p>
        <input
          id={`EthInput`}
          type="number"
          step="1"
          value={amount}
          onChange={(e) => setAmount(e.currentTarget.value)}
          min="0"
          disabled={disabled}
        />
        </div>
        <div >

        <p>ETH to:</p>
        <input
          id={`AddressInput`}
          type="text"
          value={address}
          onChange={(e) => setAddress(e.currentTarget.value)}
          disabled={disabled}
        />
        <button disabled={!account || disabled} onClick={handleClick}>
          Send
        </button>
        </div>
    </div>
  )
}

export const SendEthForm = () => {
  const { account } = useEthers()
  const balance = useEtherBalance(account)
  return (
   <div>
       <h3>Send transaction</h3>
       <p>Your ETH balance: {formatBalance(balance)}</p>
       <InputComponent />
   </div>
  )
 
}
