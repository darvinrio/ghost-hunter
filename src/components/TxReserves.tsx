import { useQuery, gql } from '@apollo/client'

import {TxReserve, HandleTxReserves} from '../handlers/HandleTxReserves'

const GET_TRANSACTION_RESERVES = gql`
    query GetTxReserves($reserve_ids: [String]) {
        atokenBalanceHistoryItems(
            where:{
                id_in: $reserve_ids
            }
        ){
            id,
            userReserve{
            reserve{
                symbol,
                decimals
            }
            }
            scaledATokenBalance
        },
        vtokenBalanceHistoryItems(
            where:{
                id_in: $reserve_ids
            }
        ){
            id,
            userReserve{
            reserve{
                symbol,
                decimals
            }
            }
            scaledVariableDebt
        }
    }
`
interface TxReserveVars {
    reserve_ids: string[]
}

interface props {
    reserveIds : string[]
}

export const TxReserves = ({reserveIds}: props) => {

    const { loading, error, data } = useQuery<TxReserve, TxReserveVars>(
        GET_TRANSACTION_RESERVES,
        { variables: { reserve_ids: reserveIds } }
    );

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error!!!</p>

    return(
        <div>
            <HandleTxReserves txReserve={data!}/>
        </div>
    )
}