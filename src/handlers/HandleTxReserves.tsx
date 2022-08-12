import { ReserveUserGrouper } from '../groupers/ReserveUserGrouper'

interface reserve {
    symbol: string,
    decimals: number
}
interface userReserve {
    reserve: reserve
}
interface atokenBalanceHistoryItems {
    id: string,
    userReserve: userReserve,
    scaledATokenBalance: string
}
interface vtokenBalanceHistoryItems {
    id: string,
    userReserve: userReserve,
    scaledVariableDebt: string
}
export interface TxReserve {
    atokenBalanceHistoryItems: atokenBalanceHistoryItems[],
    vtokenBalanceHistoryItems: vtokenBalanceHistoryItems[]
}

interface props {
    txReserve: TxReserve
}

export const HandleTxReserves = ({ txReserve }: props) => {



    console.log(txReserve)

    const handleAToken = (aTokens: atokenBalanceHistoryItems) => {
        let user = aTokens.id.substring(0, 42)
        let reserve = aTokens.userReserve.reserve.symbol
        let decimals = aTokens.userReserve.reserve.decimals

        let currentBalance = parseInt(aTokens.scaledATokenBalance) / 10 ** decimals

        return {
            user: user,
            reserve: reserve,
            currentBalance: currentBalance
        }
    }

    const handleVToken = (vTokens: vtokenBalanceHistoryItems) => {
        let user = vTokens.id.substring(0, 42)
        let reserve = vTokens.userReserve.reserve.symbol
        let decimals = vTokens.userReserve.reserve.decimals

        let currentBalance = parseInt(vTokens.scaledVariableDebt) / 10 ** decimals

        return {
            user: user,
            reserve: reserve,
            currentBalance: currentBalance
        }
    }

    let aToken = txReserve.atokenBalanceHistoryItems.map((aToken: atokenBalanceHistoryItems) => {
        return handleAToken(aToken)
    })

    let vToken = txReserve.vtokenBalanceHistoryItems.map((vToken: vtokenBalanceHistoryItems) => {
        return handleVToken(vToken)
    })

    return (
        <div>
            <p>
                Lending Positions after transaction:
            </p>
            <ReserveUserGrouper reserve={aToken} />
            <br />
            <p>
                Borrowing Positions after transaction:
            </p>
            <ReserveUserGrouper reserve={vToken} />
        </div>
    )
}