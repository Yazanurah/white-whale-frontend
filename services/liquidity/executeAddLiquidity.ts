import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate/build/signingcosmwasmclient'
import { ChainId } from 'constants/index'
import { TokenInfo } from 'queries/usePoolsListQuery'
import { TerraTreasuryService } from 'services/treasuryService'

type ExecuteAddLiquidityArgs = {

    tokenA: TokenInfo
    tokenB: TokenInfo
    tokenAAmount: string
    tokenBAmount: string
    /*
     * The contract calculates `tokenBAmount` automatically.
     * However, the user needs to set max amount of `tokenB` they're willing to spend.
     * If the calculated amount exceeds the max amount, the transaction then fails.
     */
    swapAddress: string
    chainId?: string
  senderAddress: string
  signingClient: SigningCosmWasmClient
  msgs: any
}

export const executeAddLiquidity = async ({ tokenA, tokenB, tokenAAmount, tokenBAmount,
  signingClient,
  senderAddress,
  msgs,
}: ExecuteAddLiquidityArgs): Promise<any> => {
  let fee: any = 'auto'
  if (await signingClient.getChainId() === ChainId.terrac) {
    const gas = Math.ceil(await signingClient.simulate(
      senderAddress, msgs, '',
    ) * 1.3)
    fee = await TerraTreasuryService.getInstance().getTerraClassicFeeForDeposit(
      tokenAAmount, tokenA.denom, tokenBAmount, tokenB.denom, gas,
    )
  }
  return await signingClient.signAndBroadcast(
    senderAddress, msgs, fee, '',
  )
}
