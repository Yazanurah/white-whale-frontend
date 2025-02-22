import { MsgExecuteContractEncodeObject } from '@cosmjs/cosmwasm-stargate'
import { coin } from '@cosmjs/proto-signing'
import { createExecuteMessage, createIncreaseAllowanceMessage } from 'util/messages/index'

export const createDepositMsg = ({ amount }) => ({
  deposit: { amount },
})

export const createDepostExecuteMsgs = ({
  amount,
  vaultAddress,
  senderAddress,
  tokenInfo,
}) => {
  const increaseAllowanceMessages: Array<MsgExecuteContractEncodeObject> = []

  if (!tokenInfo?.native) {
    increaseAllowanceMessages.push(createIncreaseAllowanceMessage({
      tokenAmount: amount,
      tokenAddress: tokenInfo?.denom,
      senderAddress,
      swapAddress: vaultAddress,
    }))
  }

  return [
    ...increaseAllowanceMessages,
    createExecuteMessage({
      senderAddress,
      contractAddress: vaultAddress,
      message: createDepositMsg({ amount }),
      funds: [tokenInfo?.native && coin(amount, tokenInfo.denom)].filter(Boolean),
    }),
  ]
}
