import { ethers } from 'ethers'

export const validateEns = async (ens: string) => {
  if (ens.slice(-3) === 'eth') {
    const address = await getEnsAddress(ens)

    if (address === ethers.constants.AddressZero) {
      return {
        status: false,
        isEns: true,
        address: ethers.constants.AddressZero,
        message: 'Could not find ENS address',
      }
    }

    return {
      status: true,
      isEns: true,
      address: address,
      message: 'Resolves to ' + address,
    }
  }

  return {
    status: false,
    isEns: false,
    address: ethers.constants.AddressZero,
    message: '',
  }
}

export const getEnsAddress = async (ens: string) => {
  const res = await fetch(`https://api.thegraph.com/subgraphs/name/ensdomains/ens`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: `{
                    domains(where: {name: "${ens}"}) {
                        name
                        resolvedAddress {
                            id
                        }
                    }
                }`,
    }),
  })
  console.log(res)

  const data = await res.json()

  if (data?.data?.domains.length === 0) return ethers.constants.AddressZero

  return data?.data?.domains[0]?.resolvedAddress?.id
}
