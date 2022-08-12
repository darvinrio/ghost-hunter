import { useQuery, gql } from '@apollo/client'
import {Reserve, HandleReserves} from '../handlers/HandleReserves'

const GET_POSTION = gql`
    query GetPosition($user: String) {
        users (
            where: {
                id: $user
            }
        ) {
            reserves{
                id,
                reserve{
                    symbol,
                    usageAsCollateralEnabled,
                    decimals
                },
                currentATokenBalance,
                currentVariableDebt,
                currentStableDebt
            }
        }
    }
`

interface User {
    reserves : Reserve[]
}
interface CurrentPosition {
    users: User[]
}

interface CurrentPositionVars {
    user:string
}

interface props {
    user: string
}

export const CurrentPosition = ({user}:props) => {

    const { loading, error, data } = useQuery<CurrentPosition, CurrentPositionVars>(
        GET_POSTION,
        { variables: { user: user} }
    );

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error!!!</p>
    
    return (
        <div>
            <HandleReserves positions={data!.users![0].reserves} />
        </div>
    )

}