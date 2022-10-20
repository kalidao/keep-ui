import Link from 'next/link'
import { Stack, Heading, Avatar, Text, Card } from '@kalidao/reality'
import Image from 'next/image'
import { FaDiscord, FaTwitter, FaTelegramPlane } from 'react-icons/fa'

const Profile = () => {
  return (
    <Card padding="6" width="full">
      <Stack space="4" align="center" justify={'center'}>
        <Avatar shape="circle" size="24" label="brand_pic" src="/logo.jpeg" />
        <Text>
          We form companies with code and solve legal for DAOs 👉 Install: http://wrappr.wtf - http://app.kali.gg
        </Text>
        <hr
          style={{
            width: '100%',
            borderRadius: '20px',
            border: '1px solid white',
          }}
        />
        <Stack direction={'horizontal'}>
          <Link href="https://discord.gg/e9cqr6MEwR">
            <FaDiscord color="white" size="25" />
          </Link>
          <Link href="https://discord.gg/e9cqr6MEwR">
            <FaTwitter color="white" size="25" />
          </Link>
          <Link href="https://discord.gg/e9cqr6MEwR">
            <FaTelegramPlane color="white" size="25" />
          </Link>
        </Stack>
      </Stack>
    </Card>
  )
}

export default Profile
