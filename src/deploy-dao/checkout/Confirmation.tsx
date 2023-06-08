import { Box, IconCheck, IconClose, Stack, Text } from '@kalidao/reality'
import { ethers } from 'ethers'
import { useStateMachine } from 'little-state-machine'
import { formatVotingPeriod, votingPeriodToSeconds } from '~/utils/index'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@design/Accordion'
import { UserName } from '~/components/user'

import { legalEntities } from '../../constants/legalEntities'
import { DaoStore, useDaoStore } from '../tx/useDaoStore'

// import { User } from '@components/tools/User'

const Row = ({ name, value }: { name: string | React.ReactNode; value: React.ReactNode }) => {
  return (
    <Box width="full" padding="3">
      <Stack direction="horizontal" align="center" justify={'space-between'}>
        {typeof name == 'string' ? <Text>{name}</Text> : name}
        <Text weight="bold">{value}</Text>
      </Stack>
    </Box>
  )
}

type FounderProps = {
  member: string
  shares: number
}

const Founder = ({ member, shares }: FounderProps) => {
  return <Row name={<UserName address={member}></UserName>} value={ethers.utils.formatEther(ethers.utils.parseEther(shares.toString()))} />
}

export default function Confirmation() {
  // const { state } = useStateMachine()
  // console.log('state', state)
  const { identity, governance, redemption, crowdsale, founders, legalData, hardMode } = useDaoStore()
  const voting = votingPeriodToSeconds(governance.votingPeriod, governance.votingPeriodUnit)

  return (
    <Accordion type="single" defaultValue="token" collapsible>
      <AccordionItem value="token">
        <AccordionTrigger>Token</AccordionTrigger>
        <AccordionContent>
          <Row name="Name" value={identity.name} />
          <Row name="Symbol" value={identity.symbol} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="gov">
        <AccordionTrigger>Governance</AccordionTrigger>
        <AccordionContent>
          <Row name="Participation Needed" value={`${governance.quorum}%`} />
          <Row name="Approval Needed" value={`${governance.approval}%`} />
          <Row name="Voting Period" value={`${typeof voting == 'number' ? formatVotingPeriod(voting) : 'Invalid'}`} />
          <Row
            name="Token Transferability"
            value={governance.transferability === true ? <IconCheck color="green" /> : <IconClose color="red" />}
          />
        </AccordionContent>
      </AccordionItem>
      {/* <AccordionItem value="apps">
        <AccordionTrigger>Apps</AccordionTrigger>
        <AccordionContent>
          <Row name="Tribute" value={<IconCheck color="green" />} />
          <Row name="Crowdsale" value={crowdsale.crowdsale ? <IconCheck color="green" /> : <IconClose color="red" />} />
          <Row name="Redemption" value={redemption.redemption ? <IconCheck color="green" /> : <IconClose color="red" />} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="legal">
        <AccordionTrigger>Legal</AccordionTrigger>
        <AccordionContent>
          <Row
            name="Structure"
            value={
              hardMode ? (
                legalData.legal ? (
                  legalData.docType == 'none' ? (
                    <IconClose color="red" />
                  ) : (
                    legalEntities[legalData.docType]['text']
                  )
                ) : (
                  <IconClose color="red" />
                )
              ) : (
                <IconClose color="red" />
              )
            }
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="members">
        <AccordionTrigger>Member</AccordionTrigger>
        <AccordionContent>
          {founders.map((founder, index) => (
            <Founder key={index} member={founder.member} shares={founder.share} />
          ))}
        </AccordionContent>
      </AccordionItem> */}
    </Accordion>
  )
}
