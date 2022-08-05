import { Button, HStack, Text, VStack } from '@chakra-ui/react';
import AssetInput from 'components/AssetInput';
import { FC, useEffect, useState, useMemo } from 'react';
import { Controller, useForm } from "react-hook-form";
import { Asset } from 'types/blockchain';
import { TokenItemState } from '../ManageLP/lpAtoms';
import { useMultipleTokenBalance } from 'hooks/useTokenBalance';
import { useRecoilState, useRecoilValue } from 'recoil';
import { tokenLpAtom } from '../ManageLP/lpAtoms';
import { walletState } from 'state/atoms/walletAtoms';
import { TxStep } from 'hooks/useTransaction';
import { fromChainAmount } from "libs/num";


type Props = {
    connected: boolean;
    tokenA: TokenItemState;
    tokenB: TokenItemState;
    tx: any
    // resetForm: boolean
    // setResetForm: (value: boolean) => void
    simulated: string | null;
    onInputChange: (asset: TokenItemState, index: number) => void;
}

const DepositForm = ({ tokenA, tokenB, onInputChange, connected, tx, simulated }: Props) => {

    const [[tokenABalance, tokenBBalance] = []] = useMultipleTokenBalance([tokenA?.tokenSymbol, tokenB?.tokenSymbol])

    const { control, handleSubmit, formState, setValue, getValues } = useForm({
        mode: "onChange",
        defaultValues: {
            token1: tokenA,
            token2: tokenB,
            //   slippage: String(DEFAULT_SLIPPAGE),
        },
    });

    const { chainId, key } = useRecoilValue(walletState)
    // const [resetForm, setResetForm] = useState(false)

    useEffect(() => {

        if (simulated)
            setValue('token2', { ...tokenA, amount: Number(simulated) })

    }, [simulated])

    const amountA = getValues('token1')
    const amountB = getValues('token2')


    const buttonLabel = useMemo(() => {

        if (!connected)
            return 'Connect wallet'
        else if (!tokenB?.tokenSymbol)
            return 'Select token'
        else if (!!!tokenA?.amount)
            return 'Enter amount'
        else if (tx?.buttonLabel)
            return tx?.buttonLabel
        else
            return 'Add Liquidity'

    }, [tx?.buttonLabel, tokenB.tokenSymbol, connected, tokenA?.amount])

    const isInputDisabled = tx?.txStep == TxStep.Posting




    return (
        <VStack
            paddingY={6}
            paddingX={2}
            width="full"
            as="form"
            onSubmit={handleSubmit(tx?.submit)}

        >

            <VStack width="full" alignItems="flex-start" paddingBottom={8}>
                <HStack>
                    <Text marginLeft={4} color="brand.200" fontSize="14" fontWeight="500">Asset Input</Text>
                    <Text fontSize="14" fontWeight="700">{tokenABalance}</Text>
                </HStack>
                <Controller
                    name="token1"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <AssetInput {...field}
                            token={tokenA}
                            showList={false}
                            onChange={(value) => { onInputChange(value, 0); field.onChange(value) }}
                        />
                    )}
                />
            </VStack>

            <VStack width="full" alignItems="flex-start" paddingBottom={8}>
                <HStack>
                    <Text marginLeft={4} color="brand.200" fontSize="14" fontWeight="500">Asset Input</Text>
                    <Text fontSize="14" fontWeight="700">{tokenBBalance}</Text>
                </HStack>
                <Controller
                    name="token2"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <AssetInput {...field}
                            token={tokenB}
                            showList={false}
                            onChange={(value) => { onInputChange(value, 1); field.onChange(value) }}
                        />
                    )}
                />
            </VStack>

            {(tokenB?.tokenSymbol && Number(amountA.amount) > 0) && (
                <VStack alignItems="flex-start" width="full">
                    <Text
                        color="brand.500"
                        fontSize={12}>
                        1 {tokenA.tokenSymbol} = {Number(amountB.amount / amountA.amount).toFixed(1)} {tokenB.tokenSymbol}
                    </Text>
                    <HStack justifyContent="space-between" width="full">
                        <Text color="brand.500" fontSize={12}> Fees: {fromChainAmount(tx?.fee)} </Text>
                    </HStack>
                </VStack>
            )}

            <Button
                type='submit'
                width="full"
                variant="primary"
                isLoading={tx?.txStep == TxStep.Estimating || tx?.txStep == TxStep.Posting}
                disabled={tx.txStep != TxStep.Ready}
            >
                {buttonLabel}
            </Button>

            {
                (tx?.error && !!!tx.buttonLabel) && (<Text color="red" fontSize={12}> {tx?.error} </Text>)
            }
        </VStack>
    )
}

export default DepositForm