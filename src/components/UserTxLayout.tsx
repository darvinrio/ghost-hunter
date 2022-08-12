import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface userTxDIV {
    tx_hash: string,
    tx_time: string,
    block_number: number,
    events: string[]
}

interface props {
    tx: userTxDIV
}

export const UserTxLayout = ({ tx }: props) => {

    const [ShowEvent, setShowEvent] = useState<boolean>(false)

    const clickHandler = () => {
        setShowEvent(!ShowEvent)
        console.log('click')
    }

    // useEffect(() => {

    // }, [ShowEvent])


    return (
        <>
            <tr onClick={clickHandler} className={ShowEvent ? 'highlight' : ''}>
                <td>{tx.block_number}</td>
                <td>{tx.tx_time}</td>
                <td>
                    <Link to={'/tx/' + tx.tx_hash}>
                        {tx.tx_hash}
                    </Link>
                </td>
                <td>
                    <a href={"https://etherscan.io/tx/" + tx.tx_hash} target="_blank">
                        Etherscan link
                        {/* <FontAwesomeIcon icon={solid('user-secret')} /> */}
                    </a>
                </td>
            </tr>

            <tr onClick={clickHandler} className={ShowEvent ? 'shown' : 'hide'}>
                <td colSpan={4} className="shown">
                    {tx.events.map((event) => {
                        return (
                            <p key={Math.random()}>
                                {event}
                            </p>
                        )
                    })}
                </td>
            </tr>
        </>
    )


}