import { useParams, Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client'

import {ReserveHistory, HandleDepositHistory} from '../handlers/HandleDepositHistory'

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

    return(
        <div>
            <HandleDepositHistory data={data!.userReserves[0]} />
        </div>
    )

}