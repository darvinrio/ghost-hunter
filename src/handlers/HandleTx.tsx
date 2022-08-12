import styled from 'styled-components'
import { useState } from 'react'

import { TxReserves } from '../components/TxReserves'

interface reserve {
    symbol: string,
    decimals?: number
}
interface userReserve {
    id: string
}

interface normalTx {
    id: string,
    timestamp: number,
    reserve: reserve,
    amount: string,
    userReserve?: userReserve
}

interface usageTx {
    id: string,
    timestamp: number,
    reserve: reserve,
    toState?: boolean,
    borrowRateModeTo?: string,
    userReserve?: userReserve
}

interface liqTx {
    id: string,
    timestamp: number,
    collateralReserve: reserve,
    principalReserve: reserve,
    collateralAmount: string,
    principalAmount: string,
    liquidator: string
}

export interface Txs {
    deposits: normalTx[],
    usageAsCollaterals: usageTx[],
    redeemUnderlyings: normalTx[],
    borrows: normalTx[],
    repays: normalTx[],
    swaps: usageTx[],
    liquidationCalls: liqTx[],
    flashLoans: normalTx[]
}

interface TxOut {
    block_number: number,
    tx_hash: string,
    event_index: number,
    tx_time: string,
    reserve: string,
    event: string
}

export const formatTime = (date: Date) => {
    return (
        date.getDate() +
        "/" + (date.getMonth() + 1) +
        "/" + date.getFullYear() +
        " " + date.getHours() +
        ":" + date.getMinutes() +
        ":" + date.getSeconds()
    )
}

interface props {
    txs: Txs
}

export const HandleTxs = ({ txs }: props) => {

    const [userReserve, setuserReserve] = useState<string[]>([])

    const pushReserve = (reserve_id: string, tx_hash: string) => {
        if (typeof (reserve_id) === 'string') {
            let info_id = reserve_id + tx_hash
            if (!(userReserve.includes(info_id))) {
                let tmpReserve = userReserve
                tmpReserve.push(info_id)
                setuserReserve(tmpReserve)
            }
        }
    }

    const handleNormalTransactions = (normalTx: normalTx, event: string): TxOut => {

        let id_array: string[] = normalTx.id.split(':')
        let block_number: number = parseInt(id_array[0])
        let tx_hash: string = id_array[2]
        let event_index: number = parseInt(id_array[3])

        let reserve_id = normalTx.userReserve?.id!
        pushReserve(reserve_id, tx_hash)

        let tx_time = new Date(normalTx.timestamp * 1000)
        let reserve = normalTx.reserve.symbol
        let decimals = normalTx.reserve.decimals
        let amount = parseInt(normalTx.amount) / (10 ** decimals!)

        let action_verb: string = ''
        if (event === 'Deposit' || event === 'Repay') {
            action_verb = ''
        }
        if (event === 'FlashLoan') {
            action_verb = ''
        }

        let json = {
            block_number: block_number,
            tx_hash: tx_hash,
            event_index: event_index,
            tx_time: formatTime(tx_time),
            reserve: reserve,
            event: event + " " + amount + " " + action_verb + " " + reserve
        }

        return json
    }

    const handleUsageTransactions = (usageTx: usageTx): TxOut => {

        let id_array: string[] = usageTx.id.split(':')
        let block_number: number = parseInt(id_array[0])
        let tx_hash: string = id_array[2]
        let event_index: number = parseInt(id_array[3])

        let reserve_id = usageTx.userReserve?.id!
        pushReserve(reserve_id, tx_hash)

        let tx_time = new Date(usageTx.timestamp * 1000)
        let reserve = usageTx.reserve.symbol

        let action: string = ''

        if (usageTx.toState !== undefined) {
            if (usageTx.toState) {
                action = 'Enable Collateral on ' + reserve
            } else {
                action = 'Disable Collateral on ' + reserve
            }
        } else {
            action = 'Switch to' + usageTx.borrowRateModeTo! + 'Rate on ' + reserve
        }

        let json = {
            block_number: block_number,
            tx_hash: tx_hash,
            event_index: event_index,
            tx_time: formatTime(tx_time),
            reserve: reserve,
            event: action
        }

        return json

    }

    const handleLiquidationTransactions = (liqTx: liqTx): TxOut => {

        let id_array: string[] = liqTx.id.split(':')
        let block_number: number = parseInt(id_array[0])
        let tx_hash: string = id_array[2]
        let event_index: number = parseInt(id_array[3])

        let tx_time = new Date(liqTx.timestamp * 1000)
        let collateral_reserve = liqTx.collateralReserve.symbol
        let collateral_decimals = liqTx.collateralReserve.decimals
        let collateral_amount = parseInt(liqTx.collateralAmount) / (10 ** collateral_decimals!)
        let principal_reserve = liqTx.principalReserve.symbol
        let principal_decimals = liqTx.principalReserve.decimals
        let principal_amount = parseInt(liqTx.principalAmount) / (10 ** principal_decimals!)

        let json = {
            block_number: block_number,
            tx_hash: tx_hash,
            event_index: event_index,
            tx_time: formatTime(tx_time),
            reserve: collateral_reserve,
            event: collateral_amount + ' ' + collateral_reserve + ' Liquidated'
        }

        return json

    }

    // console.log(txs)

    let deposits = txs.deposits.map((normalTxs: normalTx) => {
        return handleNormalTransactions(normalTxs, 'Deposit')
    })

    let repays = txs.repays.map((normalTxs: normalTx) => {
        return handleNormalTransactions(normalTxs, 'Repay')
    })

    let borrows = txs.borrows.map((normalTxs: normalTx) => {
        return handleNormalTransactions(normalTxs, 'Borrow')
    })

    let redeems = txs.redeemUnderlyings.map((normalTxs: normalTx) => {
        return handleNormalTransactions(normalTxs, 'Redeem')
    })

    let flashloans = txs.flashLoans.map((normalTxs: normalTx) => {
        return handleNormalTransactions(normalTxs, 'FlashLoan')
    })

    let enableCollat = txs.usageAsCollaterals.map((usageTxs: usageTx) => {
        return handleUsageTransactions(usageTxs)
    })

    let changeRate = txs.swaps.map((usageTxs: usageTx) => {
        return handleUsageTransactions(usageTxs)
    })

    let liquidations = txs.liquidationCalls.map((liqTxs: liqTx) => {
        return handleLiquidationTransactions(liqTxs)
    })

    let div_data = deposits.concat(repays, borrows, redeems, flashloans, enableCollat, changeRate, liquidations)
    div_data.sort((a: TxOut, b: TxOut) => {
        if (a.block_number == b.block_number) {
            return a.event_index - b.event_index
        }
        return b.block_number - a.block_number
    });

    if (div_data.length == 0) {
        return (
            <div>
                Not a Ghost
            </div>
        )
    }

    return (
        <>
            <EventsTable>
                {
                    div_data.map((tx: TxOut) => {
                        return (
                            <tr>
                                <td> {tx.event} </td>
                            </tr>
                        )
                    })
                }
            </EventsTable>

            <TxReserves reserveIds={userReserve}/>
        </>
    )

}

const EventsTable = styled.table`
    width: 80% ;

    td{
        padding: 8px;
    }
`