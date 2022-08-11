import { useQuery, gql } from '@apollo/client'
import { useParams } from 'react-router-dom';

import { Txs, HandleTransactions } from '../handlers/HandleTransactions'

const GET_TRANSACTIONS = gql`
    query GetTxs($user: String) {
    deposits(
        where: {
            user : $user
        } 
    ) {
        id, timestamp,
        reserve{
            symbol, decimals
        },
        amount
    },
    usageAsCollaterals(
        where: {
            user : $user
        }
    ) {
        id, timestamp,
        reserve{
            symbol
        },
        toState
    },
    redeemUnderlyings(
        where: {
            user : $user
        }
    ) {
        id, timestamp, 
        reserve {
            symbol,  decimals
        },
        amount
    },
    borrows (
    where: {
            user : $user
        }
    ) {
        id, timestamp, 
        reserve {
            symbol, decimals
        },
        amount
    },
    repays (
    where: {
            user : $user
        }
    ) {
        id, timestamp, 
        reserve {
            symbol, decimals
        },
        amount
    },
    swaps (
        where: {
            user : $user
        }
    ) {
        id, timestamp, 
        reserve {
            symbol
        },
        borrowRateModeTo
    },
    liquidationCalls (
        where: {
            user : $user
        }
    ) {
        id, timestamp,
        collateralReserve {
            symbol, decimals
        },
        principalReserve {
            symbol, decimals
        },
        collateralAmount,
        principalAmount,
        liquidator
    },
    flashLoans (
        where: {
            initiator : $user
        }
    ) {
        id, timestamp,
        reserve {
        symbol, decimals
        },
        amount
    }
    }
`
interface TxDataVars {
    user: string
}

interface props {
    user:string
}

type RouteParams = {
    user: string
}

export const UsersTxs = () => {

    const {user} = useParams<RouteParams>()

    const { loading, error, data } = useQuery<Txs, TxDataVars>(
        GET_TRANSACTIONS,
        { variables: { user: user! } }
    );

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error!!!</p>

    // console.log(data)
    // HandleTransactions(data)

    return (
        <div>
            <p>
                Loaded
            </p>
            <HandleTransactions txs={data!} />
        </div>
    )

}