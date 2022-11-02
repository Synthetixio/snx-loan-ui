import { useEffect, useMemo, useState } from 'react'
import { ethers } from 'ethers'
import Connector from '@/containers/connector'
import Wei, { wei } from '@synthetixio/wei'

type BalanceReturn = {
  balance: string;
  balanceWei: Wei;
}

export function useETHBalance(): BalanceReturn {
  const { provider, signer } = Connector.useContainer()
  const [balance, setBalance] = useState(ethers.BigNumber.from(`0`))

  useEffect(() => {
    if (!signer) return

    let isMounted = true
    const unsubs: Array<any> = [() => (isMounted = false)]

    const onSetBalance = async () => {
      const balance = await signer.getBalance()
      if (isMounted) setBalance(balance)
    }

    const subscribe = () => {
      if (provider) {
        const newBlockEvent = `block`
        provider.on(newBlockEvent, onSetBalance)
        unsubs.push(() => provider.off(newBlockEvent, onSetBalance))
      }
    }

    onSetBalance()
    subscribe()
    return () => {
      unsubs.forEach((unsub) => unsub())
    }
  }, [signer, provider])

  return { balance: wei(balance).toString(4), balanceWei: wei(balance) }
}

export function useERC20Balance(asset: string) {
  const { synthetixjs, walletAddress } = Connector.useContainer()
  const [balance, setBalance] = useState<ethers.BigNumber>(
    ethers.BigNumber.from(`0`)
  )
  const [decimals, setDecimals] = useState<number>(0)

  const contract = useMemo(() => {
    if (!synthetixjs) return null
    const {
      contracts: { SynthsBTC: sBTC, SynthsETH: sETH, SynthsUSD: sUSD },
    } = synthetixjs
    const tokens: Record<string, typeof sBTC> = {
      sBTC,
      sETH,
      sUSD,
    }
    return tokens[asset]
  }, [asset, synthetixjs])

  useEffect(() => {
    if (!(contract && walletAddress)) return

    let isMounted = true
    const unsubs: Array<any> = [() => (isMounted = false)]

    const loadBalance = async () => {
      const [decimals, balance] = await Promise.all([
        contract.decimals(),
        contract.balanceOf(walletAddress),
      ])
      if (isMounted) {
        setDecimals(decimals)
        setBalance(balance)
      }
    }

    const subscribe = () => {
      const transferEvent = contract.filters.Transfer()
      const onBalanceChange = async (from: string, to: string) => {
        if (from === walletAddress || to === walletAddress) {
          if (isMounted) setBalance(await contract.balanceOf(walletAddress))
        }
      }

      contract.on(transferEvent, onBalanceChange)
      unsubs.push(() => contract.off(transferEvent, onBalanceChange))
    }

    loadBalance()
    subscribe()
    return () => {
      unsubs.forEach((unsub) => unsub())
    }
  }, [contract, walletAddress])

  return { balance, balanceWei: wei(balance, decimals) }
}
