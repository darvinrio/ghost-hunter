import { useParams } from 'react-router-dom';

import { UsersTxs } from './UserTxs';
import { CurrentPosition } from './CurrentPosition'

type RouteParams = {
    user: string
}

export const User = () => {

    const { user } = useParams<RouteParams>()

    return (
        <div>
            <CurrentPosition user={user!} />
            <br />
            <UsersTxs user={user!} />
        </div>
    )

}