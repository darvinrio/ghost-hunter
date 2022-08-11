import { useQuery, gql } from '@apollo/client'
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

export const UsersTxs = () => {

    const { loading, error, data } = useQuery<Txs, TxDataVars>(
        GET_TRANSACTIONS,
        // { variables: { user: "0x364f7fd945b8c76c3c77d6ac253f1fea3b65e00d" } }
        { variables: { user: "0x1908bb246da7d358e4f79cea8b3d2ce5e81e6d64" } }
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