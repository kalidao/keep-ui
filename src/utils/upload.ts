import axios from 'axios'

export const convertIpfsHash = (source: string): string => {
  const desiredGatewayPrefix = 'https://content.wrappr.wtf/ipfs/'
  return desiredGatewayPrefix + source
}

export async function uploadFile(attachment: any) {
  const formData = new FormData()

  formData.append('file', attachment)

  const metadata = JSON.stringify({
    name: 'File name',
  })
  formData.append('pinataMetadata', metadata)

  const options = JSON.stringify({
    cidVersion: 0,
  })
  formData.append('pinataOptions', options)

  try {
    const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
      maxBodyLength: Infinity,
      headers: {
        // @ts-expect-error
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
      },
    })
    console.log(res.data)
    return convertIpfsHash(res.data.IpfsHash)
  } catch (error) {
    console.log(error)
  }
}

export async function uploadJSON(obj: any) {
  try {
    const result = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
      },
      body: JSON.stringify(obj),
    }).then((res) => res.json())
    const url = convertIpfsHash(result.IpfsHash)
    return url
  } catch (e) {
    console.error(e)
    return new Error('Something wrong with upload.')
  }
}
