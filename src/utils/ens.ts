import { ethers } from 'ethers'

export const validateEns = async (ens: string) => {
  console.log('ens', ens, ethers.utils.isAddress(ens))
  if (ethers.utils.isAddress(ens)) {
    return {
      status: true,
      isEns: false,
      address: ens,
      message: 'Valid address',
    }
  } else {
    if (ens.slice(-3) === 'eth') {
      const address = await getEnsAddress(ens)

      if (address === ethers.constants.AddressZero) {
        return {
          status: false,
          isEns: false,
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
      message: 'Not a valid address or ENS.',
    }
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
