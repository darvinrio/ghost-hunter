import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from "styled-components"

interface userReserves {
    user: string,
    reserve: string,
    currentBalance: number
}

interface props {
    reserve: userReserves[]
}

interface userPositionDIV {
    user: string,
    divs: JSX.Element[]
    // divs: string[]
}

export const ReserveUserGrouper = ({ reserve }: props) => {

    const [userPositions, setuserPositions] = useState<userPositionDIV[]>([])
    const [users, setUsers] = useState<String[]>([])

    const pushUserDiv = (user: string, div: JSX.Element) => {
        if (users.includes(user)) {
            let tmpPositions = userPositions.map((position) => {
                if (position.user === user) {
                    position.divs.push(div)
                }
                return position
            })
        } else {
            let tmpUsers = users
            tmpUsers.push(user)

            let tmpPositions = userPositions
            tmpPositions.push({
                user: user,
                divs: [div]
            })
        }
    }

    reserve.map((position) => {

        let { user, reserve, currentBalance } = position

        // let reserve_div = reserve
        let reserve_div = (
            <p>
                {currentBalance + ' ' + reserve}
            </p>
        )

        pushUserDiv(user, reserve_div)

    })

    return (
        <>
            {
                userPositions.map((position) => {
                    return (
                        <TxUserReserveDiv>
                            <h4>
                                <Link to={'/user/'+position.user}>
                                    {position.user}
                                </Link>
                            </h4>
                            <div>
                                {position.divs}
                            </div>
                        </TxUserReserveDiv>
                    )
                })
            }
        </>
    )
}

const TxUserReserveDiv = styled.div`
    padding: 10px ;
    margin: 20px ;

    border: 1px ;
    border-style: solid;
    border-color: white ;
    border-radius: 20px ;
`