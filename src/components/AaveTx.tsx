import { useQuery, gql } from '@apollo/client'

import { Txs, HandleTxs } from "../handlers/HandleTx"


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
        amount,
        userReserve {
            id
        }
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
        toState,
        userReserve {
            id
        }
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
        amount,
        userReserve {
            id
        }
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
        amount,
        userReserve {
            id
        }
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
        amount,
        userReserve {
            id
        }
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
        borrowRateModeTo,
        userReserve {
            id
        }
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

    // console.log(AAVEIDs)

    const { loading, error, data } = useQuery<Txs, TxInfoVars>(
        GET_TRANSACTION_INFO,
        { variables: { aave_ids: AAVEIDs } }
    );

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error!!!</p>

    return (
        <div>
            <HandleTxs txs={data!} />
        </div>
    )
}
