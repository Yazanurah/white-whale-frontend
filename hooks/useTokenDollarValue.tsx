import { useQuery } from 'react-query'

import { usePriceForOneToken } from 'components/Pages/Trade/Swap/index'
import { DEFAULT_TOKEN_BALANCE_REFETCH_INTERVAL } from 'constants/index'
import { tokenDollarValueQuery } from 'queries/tokenDollarValueQuery'

import { useGetMultipleIBCAssetInfo } from './useIBCAssetInfo'
import {
  useBaseTokenInfo,
  useGetMultipleTokenInfo,
  useTokenInfo,
} from './useTokenInfo'

export const useTokenDollarValueQuery = (tokenSymbols?: Array<string>) => {
  const getMultipleTokenInfo = useGetMultipleTokenInfo()
  const getMultipleIBCAssetInfo = useGetMultipleIBCAssetInfo()

  const { data, isLoading } = useQuery(
    `tokenDollarValue/${tokenSymbols?.join('/')}`,
    async (): Promise<Array<number>> => {
      const tokenIds = tokenSymbols?.map((tokenSymbol) => (
        getMultipleTokenInfo([tokenSymbol])?.[0] ||
            getMultipleIBCAssetInfo([tokenSymbol])?.[0]
      )?.id)

      if (tokenIds) {
        return tokenDollarValueQuery(tokenIds)
      }
    },
    {
      enabled: Boolean(tokenSymbols?.length),
      refetchOnMount: 'always',
      refetchInterval: DEFAULT_TOKEN_BALANCE_REFETCH_INTERVAL,
      refetchIntervalInBackground: true,
    },
  )

  return [data || [], isLoading] as const
}

export const useTokenDollarValue = (tokenSymbol?: string) => {
  const { symbol: baseTokenSymbol } = useBaseTokenInfo() || {}
  const tokenInfo = useTokenInfo(tokenSymbol)

  const tokenSymbolToLookupDollarValueFor = tokenInfo?.id
    ? tokenSymbol
    : baseTokenSymbol

  const [[tokenDollarPrice], fetchingTokenDollarPrice] =
    useTokenDollarValueQuery(tokenSymbolToLookupDollarValueFor
      ? [tokenSymbolToLookupDollarValueFor]
      : null)

  const [oneTokenToTokenPrice, fetchingTokenToTokenPrice] = usePriceForOneToken({
    tokenASymbol: tokenSymbol,
    tokenBSymbol: baseTokenSymbol,
  })

  /* If the token has an id or it's the baseToken then let's return pure price from the api */
  const shouldRenderPureDollarPrice =
    tokenSymbol === baseTokenSymbol || Boolean(tokenInfo?.id)
  if (shouldRenderPureDollarPrice) {
    return [tokenDollarPrice, fetchingTokenDollarPrice] as const
  }

  /* Otherwise, let's query the chain and calculate the dollar price based on ratio to base token */
  return [
    tokenDollarPrice * oneTokenToTokenPrice,
    fetchingTokenDollarPrice || fetchingTokenToTokenPrice,
  ] as const
}
