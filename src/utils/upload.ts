import axios from 'axios'
const { Readable } = require('stream')
const FormData = require('form-data')

const JWT = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxOWE0OWJmOS0xMDEzLTQ1NDctOGJlYi1kYWRjMWMwNTE2YzciLCJlbWFpbCI6InJvc3NjYW1wYmVsbDlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImNiODIzOGVlODgwZTUxZWQ3ZjRiIiwic2NvcGVkS2V5U2VjcmV0IjoiMmQ1ZWZjNzQ5OTAxZGJkNmI1YjVmMWY2MDkxMzU1YWRhOWRmNDE0NGZjZWNhNjI0NjRlNzIwMGU3ZDU3ODI0NSIsImlhdCI6MTY2NDYyMjU5OX0.3ocl3dl3CbS6UoX4qdFEBeT7HgLLKBnyOJ6zYDfbSDg`

export const convertIpfsHash = (source: string): string => {
  const desiredGatewayPrefix = 'https://content.wrappr.wtf/ipfs/'
  return desiredGatewayPrefix + source
}

export async function uploadImageData(data: any, name?: string) {
  try {
    const buffer = Buffer.from(data, 'base64')
    const stream = Readable.from(buffer)
    const img = new FormData()
    img.append('file', stream, {
      filename: name || 'image',
      contentType: 'image/png',
    })
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
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxOWE0OWJmOS0xMDEzLTQ1NDctOGJlYi1kYWRjMWMwNTE2YzciLCJlbWFpbCI6InJvc3NjYW1wYmVsbDlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImNiODIzOGVlODgwZTUxZWQ3ZjRiIiwic2NvcGVkS2V5U2VjcmV0IjoiMmQ1ZWZjNzQ5OTAxZGJkNmI1YjVmMWY2MDkxMzU1YWRhOWRmNDE0NGZjZWNhNjI0NjRlNzIwMGU3ZDU3ODI0NSIsImlhdCI6MTY2NDYyMjU5OX0.3ocl3dl3CbS6UoX4qdFEBeT7HgLLKBnyOJ6zYDfbSDg`,
      },
    })
    console.log(res.data)
    return convertIpfsHash(res.data.IpfsHash)
  } catch (error) {
    console.log(error)
    return new Error('Something wrong with upload.')
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
