import styled from 'styled-components'
import { BaseCard } from '@/components/Base/Card'
import { Text } from '@/components/Base/Text'
import { FlexRow, FlexCol } from '@/components/Base/Div'
import Loans from '@/containers/Loans'
import { wei } from '@synthetixio/wei'

import {
  abi as OVM_ABI,
  address as OVM_ADDRESS,
} from '@synthetixio/contracts/build/mainnet-ovm/deployment/CollateralEth'
import {
  abi as ETH_ABI,
  address as ETH_ADDRESS,
} from '@synthetixio/contracts/build/mainnet/deployment/CollateralEth'
import { Contract, Signer } from 'ethers'
import Connector from '@/containers/connector/Connector'

const PendingWithdrawals = () => {
  const { pendingWithdrawals, reloadPendingWithdrawals } =
    Loans.useContainer()
  const { signer, isL2 } = Connector.useContainer()
  const collateralEth = new Contract(
    isL2 ? OVM_ADDRESS : ETH_ADDRESS,
    isL2 ? OVM_ABI : ETH_ABI,
    signer as Signer
  )

  const claimPendingWithdrawals = async () => {
    await collateralEth['claim'](pendingWithdrawals)
    reloadPendingWithdrawals()
  }
  return (
    <Container>
      <Text size={20}>Pending Withdrawals</Text>
      <TotalClaim>
        {pendingWithdrawals.gt(0) ? (
          <>
            <FlexCol>
              <Text size={16}>Total to claim</Text>
              <Text size={18}>{wei(pendingWithdrawals).toString(2)} ETH</Text>
            </FlexCol>
            <ClaimButton onClick={claimPendingWithdrawals}>Claim</ClaimButton>
          </>
        ) : (
          <Text size={16}> You have no pending withdrawals. </Text>
        )}
      </TotalClaim>
    </Container>
  )
}

export default PendingWithdrawals

const Container = styled(BaseCard)`
  padding: 20px;

  .react-table {
    border: unset;
    margin-top: 20px;

    .table-body-row {
      border: unset;
      justify-content: space-between;
      margin-bottom: 10px;
    }

    .table-body-cell {
      width: unset;

      &:first-child {
        padding-left: unset;
      }

      &:last-child {
        padding-right: unset;
      }
    }
  }
`

const TotalClaim = styled(FlexRow)`
  border: 1px solid #2d2d38;
  display: flex;
  height: 85px;
  justify-content: space-around;
  align-items: center;
  border-radius: 6px;
  margin-top: 20px;
`

const ClaimButton = styled.button`
  pointer: cursor;
  width: 72px;
  height: 40px;
  color: #00d1ff;
  background: transparent;
  border: 1px solid #00d1ff;
  border-radius: 4px;
`

const LoanCell = styled(FlexCol)``
const AmountCell = styled.div`
  text-align: right;
`
