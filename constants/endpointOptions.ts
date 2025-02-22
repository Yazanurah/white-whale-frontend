import { EndpointOptions } from '@cosmos-kit/core'

export const endpointOptions: EndpointOptions = {
  isLazy: true,
  endpoints: {
    migaloo: {
      rpc: ['https://migaloo-rpc.polkachu.com'],
      rest: ['https://migaloo-api.polkachu.com'],
    },
    terra2: {
      rpc: ['https://ww-terra-rpc.polkachu.com'],
      rest: ['https://ww-terra-rest.polkachu.com'],
    },
    juno: {
      rpc: ['https://ww-juno-rpc.polkachu.com'],
      rest: ['https://ww-juno-rest.polkachu.com'],
    },
    chihuahua: {
      rpc: ['https://ww-chihuahua-rpc.polkachu.com'],
      rest: ['https://ww-chihuahua-rest.polkachu.com'],
    },
    comdex: {
      rpc: ['https://rpc.comdex.one'],
      rest: ['https://ww-comdex-rest.polkachu.com'],
    },
    injective: {
      rpc: ['https://ww-injective-rpc.polkachu.com'],
      rest: ['https://ww-injective-rest.polkachu.com'],
    },
    terra: {
      rpc: ['https://terra-classic-rpc.publicnode.com'],
      rest: ['https://terra-classic-lcd.publicnode.com'],
    },
    sei: {
      rpc: ['https://sei-rpc.polkachu.com'],
      rest: ['https://sei-api.polkachu.com'],
    },
  },
}
