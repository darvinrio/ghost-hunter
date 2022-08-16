import { useParams, Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client'

import {HandleDepositHistory} from '../handlers/HandleDepositHistory'
import {HandleBorrowHistory} from '../handlers/HandleBorrowHistory'
import { ReserveHistory } from '../handlers/HistoryInterfaces'

const GET_USER_RESERVE_DEPOSIT_HISTORY = gql`
    query GetDepositHistory($reserve_id: String) {
        userReserves(
            where:{
                id: $reserve_id
            }
        ){
            id,
            reserve{
                symbol,
                decimals
            },
            aTokenBalanceHistory{
                timestamp,
                scaledATokenBalance
            },
            depositHistory{
                timestamp,
                amount
            },
            redeemUnderlyingHistory{
                timestamp,
                amount
            },
            liquidationCallHistory{
                timestamp,
                collateralAmount
            },
            vTokenBalanceHistory{
                timestamp,
                scaledVariableDebt
            },
            sTokenBalanceHistory{
                timestamp,
                currentStableDebt
            },
            borrowHistory{
                timestamp,
                amount
            },
            repayHistory{
                timestamp,
                amount
            }
        }
    }
`
interface ReserveHistoryData{
    userReserves:ReserveHistory[]
}
interface ReserveHistoryVars {
    reserve_id:string
}

type RouteParams = {
    reserve_id: string
}

export const UserReserve = () => {

    const { reserve_id } = useParams<RouteParams>()

    const { loading, error, data } = useQuery<ReserveHistoryData, ReserveHistoryVars>(
        GET_USER_RESERVE_DEPOSIT_HISTORY,
        { variables: { reserve_id: reserve_id! } }
    );

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error!!!</p>

    let history_data = data!.userReserves[0]

    return(
        <div>
            <HandleDepositHistory data={history_data} />
            <HandleBorrowHistory data={history_data} />
        </div>
    )

}