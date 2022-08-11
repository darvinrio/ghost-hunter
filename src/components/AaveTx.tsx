import { useQuery, gql } from '@apollo/client'

import { Txs, HandleTransactions } from "../handlers/HandleTransactions"


const GET_TRANSACTION_INFO = gql`
query GetTxInfo($aave_ids: [String]) {
    deposits(
        where: {
            id_in : $aave_ids
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
            id_in : $aave_ids
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
            id_in : $aave_ids
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
            id_in : $aave_ids
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
            id_in : $aave_ids
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
            id_in : $aave_ids
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
            id_in : $aave_ids
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
            id_in : $aave_ids
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
interface TxInfoVars {
    aave_ids: string[]
}

interface props {
    AAVEIDs: string[]
}

export const AaveTx = ({AAVEIDs}:props) => {

    const { loading, error, data } = useQuery<Txs, TxInfoVars>(
        GET_TRANSACTION_INFO,
        // { variables: { user: "0x364f7fd945b8c76c3c77d6ac253f1fea3b65e00d" } }
        { variables: { aave_ids: AAVEIDs } }
    );

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error!!!</p>

    return (
        <div>
            <HandleTransactions txs={data!} />
        </div>
    )
}
