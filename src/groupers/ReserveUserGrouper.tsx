import { useState } from 'react'
import { Link } from 'react-router-dom'

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
        <div>
            {
                userPositions.map((position) => {
                    return (
                        <div>
                            <h4>
                                <Link to={'/user/'+position.user}>
                                    {position.user}
                                </Link>
                            </h4>
                            <div>
                                {position.divs}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}