import Image from 'next/image'
import { RainbowKitProvider, AvatarComponent } from '@rainbow-me/rainbowkit'
import { Avatar } from '@kalidao/reality'

const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
  if (ensImage)
    return <Image alt="user avatar" src={ensImage} width={size} height={size} style={{ borderRadius: 999 }} />

  return (
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: 999,
        height: size,
        width: size,
      }}
    >
      :)
    </div>
  )
}

export default CustomAvatar
