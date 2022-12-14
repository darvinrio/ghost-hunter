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
            <h1>
                {user}
            </h1>
            <hr />
            <CurrentPosition user={user!} />
            <br />
            <hr />
            <UsersTxs user={user!} />
        </div>
    )

}