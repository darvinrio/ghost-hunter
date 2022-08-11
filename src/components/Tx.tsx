import axios from "axios"
import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';

import { AaveTx } from "./AaveTx"

const ETHERSCAN_API_KEY = process.env.REACT_APP_ETHERSCAN_API_KEY
export const API_URL = (
    tx_hash: string
) => {
    return `
        https://api.etherscan.io/api?module=proxy&action=eth_getTransactionReceipt&txhash=${tx_hash}&apikey=${ETHERSCAN_API_KEY}
    `
}

interface log {
    address: string,
    topics: string[],
    data: string,
    blockNumber: string,
    transactionHash: string,
    transactionIndex: string,
    blockHash: string,
    logIndex: string,
    removed: boolean
}

interface receipt {
    blockHash: string,
    blockNumber: string,
    contractAddress: string | null,
    cumulativeGasUsed: string,
    effectiveGasPrice: string,
    from: string,
    gasUsed: string,
    logs: log[],
    logsBloom: string,
    status: string,
    to: string,
    transactionHash: string,
    transactionIndex: string,
    type: string
}

export const handleReceipt = (receipt: receipt) => {
    let blockNumber = parseInt(receipt.blockNumber, 16)
    let tx_hash = receipt.transactionHash
    let tx_position = parseInt(receipt.transactionIndex, 16)

    let log_indexes = receipt.logs.map((log: log) => {
        return parseInt(log.logIndex, 16)
    })

    let aave_ids = log_indexes.map((index: number) => {
        return '' + blockNumber + ':' + tx_position + ':' + tx_hash + ':' + index + ':' + index
    })

    return aave_ids
}

type RouteParams = {
    tx_hash: string
}

export const Tx = () => {

    const {tx_hash} = useParams<RouteParams>()

    const [errorAxios, setErrorAxios] = useState<string | null>(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [AAVEIDs, setAAVEIDs] = useState<string[]>([]);

    useEffect(() => {

        axios.get(API_URL(tx_hash!))
            .then((response) => {

                setIsLoaded(true)

                let result = response.data.result
                if (result === null) {
                    setErrorAxios('Transaction not found')
                } else {
                    setAAVEIDs(handleReceipt(result))
                }
            })
            .catch((error) => {
                console.log(error)
            })

    }, [])

    if (errorAxios) {
        return (
            <div>
                {errorAxios}
            </div>
        )
    }

    if (!isLoaded) {
        return (
            <div>
                Loading
            </div>
        )
    }


    return (
        <div>
            <div>
                <AaveTx AAVEIDs={AAVEIDs} />
            </div>
        </div>
    )

}