import { Box } from '@kalidao/reality'
import { container } from './create.css'
import { Type } from './Type'
import { Name } from './Name'
import { Signers } from './Signers'
import { Confirm } from './Confirm'
import { NFT } from './NFT'
import { CreateStore, useCreateStore } from './useCreateStore'

const Create = () => {
  const view = useCreateStore((state) => state.view)

  const views: {
    [key in CreateStore['view']]: JSX.Element
  } = {
    type: <Type key="type" />,
    identity: <Name key="name" />,
    signers: <Signers key="signers" />,
    nft: <NFT key="nft" />,
    confirm: <Confirm key="review" />,
  }

  return <Box className={container}>{views[view]}</Box>
}

export default Create
