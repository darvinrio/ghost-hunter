import { useState } from 'react'
import styled from 'styled-components'

import { UserTxLayout } from '../components/UserTxLayout'

interface TxOut {
    block_number: number,
    tx_hash: string,
    event_index: number,
    tx_time: string,
    reserve: string,
    event: string
}

interface props {
    txs: TxOut[]
}

interface userTxDIV {
    tx_hash: string,
    tx_time: string,
    block_number: number,
    events: string[]
}

export const UserTxGrouper = ({ txs }: props) => {

    const [TxOnly, setTxOnly] = useState<userTxDIV[]>([])
    const [txHashes, settxHashes] = useState<String[]>([])

    const pushTX = (tx: TxOut) => {
        if (txHashes.includes(tx.tx_hash)) {

            TxOnly.map((Tx) => {
                if (Tx.tx_hash === tx.tx_hash) {
                    Tx.events.push(tx.event)
                }
            })

        } else {
            txHashes.push(tx.tx_hash)

            TxOnly.push({
                tx_hash: tx.tx_hash,
                tx_time: tx.tx_time,
                block_number: tx.block_number,
                events: [tx.event]
            })
        }
    }

    txs.map((tx) => {
        pushTX(tx)
    })

    return (
        <TxsTable>
            <tr>
                <th> Block Number </th>
                <th> Timestamp </th>
                <th> TxHash </th>
                {/* <th> Events </th> */}
            </tr>
            {
                TxOnly.map((Tx) => {
                    return (
                        <UserTxLayout key={Tx.tx_hash} tx={Tx} />
                    )
                })
            }
        </TxsTable>
    )
}

const TxsTable = styled.table`
    width: 80% ;
    .hide{
        visibility: collapse ;
    }
    .shown{
        background-color: #525252;
    }
    .highlight{
        background-color: #1d1d1c
    }
    tr:hover {
        background-color: #6b6b6b;
    }
    th{
        text-align: left;
    }
    td{
        padding: 8px;
    }
`