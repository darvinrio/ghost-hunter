import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Metric } from '../charts/Metric'
import { MovementHistory } from '../charts/MovementHistory'
import { TokenHistory } from '../charts/TokenHistory'

import { ReserveHistory } from './HistoryInterfaces'

interface props {
    data: ReserveHistory
}
export const HandleBorrowHistory = ({ data }: props) => {

    const NumberFormatter = (value: number) => {
        return new Intl.NumberFormat('en-GB', {
            notation: "compact",
            compactDisplay: "short"
        }).format(value)
    }

    let vBorrows = data.vTokenBalanceHistory.map((bals) => {
        return {
            timestamp: bals.timestamp * 1000,
            balance: parseInt(bals.scaledVariableDebt) / 10 ** data.reserve.decimals
        }
    })

    console.log(vBorrows)

    let sBorrows = data.sTokenBalanceHistory.map((deposit) => {
        return {
            timestamp: deposit.timestamp * 1000,
            balance: parseInt(deposit.currentStableDebt) / 10 ** data.reserve.decimals
        }
    })

    let borrows = data.borrowHistory.map((redeem) => {
        return {
            timestamp: redeem.timestamp * 1000,
            balance: -(parseInt(redeem.amount) / 10 ** data.reserve.decimals)
        }
    })

    let repays = data.repayHistory.map((liq) => {
        return {
            timestamp: liq.timestamp * 1000,
            balance: (parseInt(liq.amount) / 10 ** data.reserve.decimals)
        }
    })

    vBorrows.sort((a, b) => {
        return a.timestamp - b.timestamp
    })

    const currentVBorrow = vBorrows[vBorrows.length - 1].balance
    const currentSBorrow = sBorrows[sBorrows.length - 1].balance
    const borrowCount = borrows.length
    const repayCount = repays.length


    return (
        <>
            <h3>
                Borrowing Side
            </h3>

            <MetricsDiv>
                <Metric label='Current Variable Borrow' value={NumberFormatter(currentVBorrow)} />
                <Metric label='Current Stable Borrow' value={currentSBorrow} />
                <Metric label='Borrows' value={borrowCount} />
                <Metric label='Repays' value={repayCount} />
            </MetricsDiv>

            <DepositChartsDiv>
                <div>
                    <p>Borrowing History</p>
                    <TokenHistory plotdata={vBorrows} />
                </div>
                <div>
                    <p>Borrows and Repays</p>
                    <MovementHistory
                        plotdata={borrows.concat(repays)}
                    />
                </div>
            </DepositChartsDiv>
        </>
    )
}

const DepositChartsDiv = styled.div`
    display:grid;
    grid-template-columns: 1fr 1fr ;

    padding: 10px ;
    margin: 20px ;
`

const MetricsDiv = styled.div`
    display: grid ;
    grid-template-columns: 1fr 1fr 1fr 1fr ;

    padding: 10px ;
    margin: 20px ;
`