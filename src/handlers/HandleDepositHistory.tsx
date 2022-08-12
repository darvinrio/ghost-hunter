import { TokenHistory } from '../charts/TokenHistory'

interface aTokenBalanceHistory {
    timestamp: number,
    scaledATokenBalance: string
}
interface depositHistory {
    timestamp: number,
    amount: string
}
interface redeemUnderlyingHistory {
    timestamp: number,
    amount: string
}
interface liquidationCallHistory {
    timestamp: number,
    amount: string
}
interface reserve {
    symbol: string,
    decimals: number
}
export interface ReserveHistory {
    id: string,
    reserve: reserve,
    aTokenBalanceHistory: aTokenBalanceHistory[],
    depositHistory: depositHistory[],
    redeemUnderlyingHistory: redeemUnderlyingHistory[],
    liquidationCallHistory: liquidationCallHistory[],
}

interface props {
    data: ReserveHistory
}
export const HandleDepositHistory = ({ data }: props) => {

    let aHistory = data.aTokenBalanceHistory.map((bals) => {
        return {
            // timestamp: (new Date(bals.timestamp * 1000)).toString,
            timestamp: bals.timestamp*1000,
            balance: parseInt(bals.scaledATokenBalance) / 10 ** data.reserve.decimals
        }
    })


    return (
        <div>
            {/* <TokenHistory plotdata={aHistory} /> */}
            <h2>
                wORK uNDER pROGRESS
            </h2>
        </div>
    )
}