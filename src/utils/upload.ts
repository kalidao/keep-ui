import axios from 'axios'
const { Readable } = require('stream')

const JWT = `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`

export const convertIpfsHash = (source: string): string => {
  const desiredGatewayPrefix = 'https://content.wrappr.wtf/ipfs/'
  return desiredGatewayPrefix + source
}

export async function uploadImageData(data: any, name?: string) {
  try {
    const buffer = Buffer.from(data, 'base64')
    const stream = Readable.from(buffer)
    const img = new FormData()
    img.append('file', stream, name || 'image')
    const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', data, {
      headers: {
        Authorization: JWT,
      },
    })
    console.log(res.data)
  } catch (error) {
    console.log(error)
  }
}

export async function uploadFile(attachment: any, name?: string) {
  const formData = new FormData()

  formData.append('file', attachment)

  const metadata = JSON.stringify({
    name: name || attachment.name || 'file',
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
        // @ts-ignore
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        Authorization: JWT,
      },
    })
    console.log(res.data)
    return convertIpfsHash(res.data.IpfsHash)
  } catch (error) {
    console.log(error)
    return ''
  }
}

export async function uploadJSON(obj: any) {
  try {
    const result = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: JWT,
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
