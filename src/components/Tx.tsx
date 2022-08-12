import axios from "axios"
import { useState, useEffect } from "react"
import { useParams, Link } from 'react-router-dom';

import { AaveTx } from "./AaveTx"
import { formatTime } from "../handlers/HandleTx";

const ETHERSCAN_API_KEY = process.env.REACT_APP_ETHERSCAN_API_KEY
export const API_URL = (tx_hash: string) => {
    return `
        https://api.etherscan.io/api?module=proxy&action=eth_getTransactionReceipt&txhash=${tx_hash}&apikey=${ETHERSCAN_API_KEY}
    `
}
export const BLOCK_URL = (block: string) => {
    return `
        https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=${block}&boolean=true&apikey=${ETHERSCAN_API_KEY}
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

    const { tx_hash } = useParams<RouteParams>()

    const [errorAxios, setErrorAxios] = useState<string | null>(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [AAVEIDs, setAAVEIDs] = useState<string[]>([]);

    const [blockNumber, setBlockNumber] = useState<string>('')
    const [blockTimestamp, setBlockTimestamp] = useState<string>('')
    const [Gas, setGas] = useState<string>('')
    const [Gwei, setGwei] = useState<string>('')
    const [User, setUser] = useState<string>('')


    useEffect(() => {

        axios.get(API_URL(tx_hash!))
            .then((response) => {
                // setIsLoaded(true)
                let result = response.data.result
                // console.log(result)
                if (result === null) {
                    setErrorAxios('Transaction not found')
                } else {
                    setBlockNumber(result.blockNumber)
                    setGas(result.cumulativeGasUsed)
                    setGwei(result.effectiveGasPrice)
                    setUser(result.from)

                    axios.get(BLOCK_URL(result.blockNumber))
                        .then((response) => {
                            setIsLoaded(true)
                            let result = response.data.result
                            setBlockTimestamp(result.timestamp)
                        })

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
            <h2>
                {tx_hash}
            </h2>
            <p>
                <a href={'https://etherscan.io/tx/' + tx_hash} target="_blank">Etherscan Link</a>
            </p>
            <p>
                Block Number:
                {parseInt(blockNumber, 16)}
            </p>
            <p>
                Block Timestamp:
                {formatTime(new Date(parseInt(blockTimestamp, 16) * 1000))}
            </p>
            <p>
                User:
                <Link to={"/user/" + User}>
                    {User}
                </Link>
            </p>
            <p>
                Gas:
                {parseInt(Gas, 16) + ' units at ' + parseInt(Gwei, 16) / 10 ** 9 + ' gwei'}
            </p>
            <br />

            <p>
                Events:
            </p>
            <div>
                <AaveTx AAVEIDs={AAVEIDs} />
            </div>
        </div>
    )
}