import styled from 'styled-components'
import { BaseCard } from '@/components/Base/Card'
import { Text } from '@/components/Base/Text'
import { FlexRow, FlexCol } from '@/components/Base/Div'
import Loans from '@/containers/Loans'
import { wei } from '@synthetixio/wei'
import useSynthetixQueries from '@synthetixio/queries'

const PendingWithdrawals = () => {
  const { pendingWithdrawals, reloadPendingWithdrawals, ethLoanContract } =
    Loans.useContainer()
  const { useSynthetixTxn } = useSynthetixQueries()

  const claimTxn = useSynthetixTxn(
    `CollateralETH`,
    `claim`,
    [pendingWithdrawals],
    {},
    {
      enabled: Boolean(ethLoanContract) && pendingWithdrawals.gt(0),
      async onSuccess() {
        await reloadPendingWithdrawals()
      },
    }
  )

  const claimPendingWithdrawals = () => {
    claimTxn.mutate()
  }
  return (
    <Container>
      <Text size={20}>Pending Withdrawals</Text>
      <TotalClaim>
        <ClaimButton onClick={claimPendingWithdrawals}>Claim</ClaimButton>
        {pendingWithdrawals.gt(0) ? (
          <>
            <FlexCol>
              <Text size={16}>Total to claim</Text>
              <Text size={18}>{wei(pendingWithdrawals).toString(2)} ETH</Text>
            </FlexCol>
            <ClaimButton
              disabled={pendingWithdrawals.eq(0)}
              onClick={claimPendingWithdrawals}
            >
              Claim
            </ClaimButton>
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
