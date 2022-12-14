import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Metric } from '../charts/Metric'
import { MovementHistory } from '../charts/MovementHistory'
import { TokenHistory } from '../charts/TokenHistory'
import { ReserveHistory } from './HistoryInterfaces'

interface props {
    data: ReserveHistory
}
export const HandleDepositHistory = ({ data }: props) => {

    const NumberFormatter = (value: number) => {
        return new Intl.NumberFormat('en-GB', {
            notation: "compact",
            compactDisplay: "short"
        }).format(value)
    }

    // console.log(data)

    let aHistory = data.aTokenBalanceHistory.map((bals) => {
        return {
            timestamp: bals.timestamp * 1000,
            balance: parseInt(bals.scaledATokenBalance) / 10 ** data.reserve.decimals
        }
    })

    let depositHistory = data.depositHistory.map((deposit) => {
        return {
            timestamp: deposit.timestamp * 1000,
            balance: parseInt(deposit.amount) / 10 ** data.reserve.decimals
        }
    })

    let redeemUnderlyingHistory = data.redeemUnderlyingHistory.map((redeem) => {
        return {
            timestamp: redeem.timestamp * 1000,
            balance: -(parseInt(redeem.amount) / 10 ** data.reserve.decimals)
        }
    })

    let liquidations = data.liquidationCallHistory.map((liq) => {
        return {
            timestamp: liq.timestamp * 1000,
            balance: -(parseInt(liq.amount) / 10 ** data.reserve.decimals)
        }
    })

    aHistory.sort((a, b) => {
        return a.timestamp - b.timestamp
    })

    console.log(aHistory)
    let currentBal = 0
    try {
        let currentBal = aHistory[aHistory.length - 1].balance
    } catch (Error) {
        console.log(Error)
        currentBal = 0
    }
    const depositCount = depositHistory.length
    const redeemCount = redeemUnderlyingHistory.length
    const liquidationCount = liquidations.length

    if (depositCount == 0) {
        return (
            <>
                <Link to={'/user/' + data.id.substring(0, 42)}>
                    <h2>
                        {data.id.substring(0, 42)}
                    </h2>
                </Link>
                <h1>{data.reserve.symbol}</h1>

                <h3>
                    Lending Side
                </h3>
                No Deposits
            </>
        )
    }

    return (
        <>
            {/* <h2>{data.id.substring(0, 42)}</h2> */}
            <Link to={'/user/' + data.id.substring(0, 42)}>
                <h2>
                    {data.id.substring(0, 42)}
                </h2>
            </Link>
            <h1>{data.reserve.symbol}</h1>

            <h3>
                Lending Side
            </h3>

            <MetricsDiv>
                <Metric label='Current Balance' value={NumberFormatter(currentBal)} />
                <Metric label='Deposits' value={depositCount} />
                <Metric label='Withdrawals' value={redeemCount} />
                <Metric label='Liquidations' value={liquidationCount} />
            </MetricsDiv>

            <DepositChartsDiv>
                <div>
                    <p>Lending History</p>
                    <TokenHistory plotdata={aHistory} />
                </div>
                <div>
                    <p>Deposits and Withdrawals</p>
                    <MovementHistory
                        plotdata={depositHistory.concat(redeemUnderlyingHistory.concat(liquidations))}
                    />
                </div>
            </DepositChartsDiv>
        </>
    )
}

const DepositChartsDiv = styled.div`
    display:grid;
    grid-template-columns: 1fr 1fr ;

    @media (max-width: 1200px){
        display: flex;
        flex-direction: column;
        align-items:flex-start;
        justify-content: left;
    }

    padding: 10px ;
    margin: 20px ;
`

const MetricsDiv = styled.div`
    display: grid ;
    grid-template-columns: 1fr 1fr 1fr 1fr ;

    padding: 10px ;
    margin: 20px ;
`