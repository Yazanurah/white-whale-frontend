import { useQuery } from 'react-query'

import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate/build/signingcosmwasmclient'
import { EncodeObject } from '@cosmjs/proto-signing'
import { useRecoilState } from 'recoil'
import { txRecoilState } from 'state/txRecoilState'
import { TxStep } from 'types/common'
import { parseError } from 'util/parseError'

type Simulate = {
  msgs: EncodeObject[]
  signingClient: SigningCosmWasmClient
  address: string | undefined
  connected: boolean
  amount: string
  onError?: (error: Error) => void
  onSuccess?: (data: any) => void
}

const useSimulate = ({
  msgs,
  signingClient,
  address,
  connected,
  amount,
  onError,
  onSuccess,
}: Simulate) => {
  const [txState, setTxState] = useRecoilState(txRecoilState)

  const simulate = useQuery({
    queryKey: ['simulate', msgs, amount],
    queryFn: () => {
      if (
        !connected ||
        Number(amount) <= 0 ||
        !address ||
        !signingClient ||
        !msgs
      ) {
        return null
      }

      setTxState({
        txStep: TxStep.Estimating,
        txHash: undefined,
        error: null,
        buttonLabel: null,
      })

      return signingClient?.simulate(
        address, msgs!, undefined,
      )
    },
    onSuccess: (data) => {
      onSuccess?.(data)
      setTxState({
        ...txState,
        txStep: TxStep.Ready,
      })
    },
    onError: (error: Error) => {
      const message = parseError(error)
      setTxState({
        txStep: TxStep.Idle,
        txHash: undefined,
        error: message,
        buttonLabel: message,
      })
      onError?.(error)
    },
    enabled: msgs?.length > 0 && Boolean(connected) && Number(amount) > 0,
    retry: false,
  })

  return {
    ...simulate,
    ...txState,
  }
}

export default useSimulate
