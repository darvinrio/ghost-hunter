import styled from "styled-components";
import { useNavigate } from "react-router-dom"

interface ReserveInfo {
    symbol: string,
    usageAsCollateralEnabled: boolean,
    decimals: number
}

export interface Reserve {
    id: string,
    reserve: ReserveInfo,
    currentATokenBalance: string,
    currentVariableDebt: string,
    currentStableDebt: string
}

interface props {
    positions: Reserve[]
}

export const HandleReserves = ({ positions }: props) => {

    let navigate = useNavigate();

    let lending_div: JSX.Element[] = []
    let borrowing_div: JSX.Element[] = []

    positions.map((position) => {

        const handleReserveClick = (e:any) => {
            navigate('/reserve/'+position.id)
        }

        let decimals = position.reserve.decimals
        let current_lending = parseInt(position.currentATokenBalance) / 10 ** decimals
        let current_v_debt = parseInt(position.currentVariableDebt) / 10 ** decimals
        let current_s_debt = parseInt(position.currentStableDebt) / 10 ** decimals

        let active_borrow = current_v_debt + current_s_debt
        let active = current_lending + active_borrow

        if (true) {
            borrowing_div.push(
                <ReserveDiv onClick={handleReserveClick}>
                    <p key={position.id}>
                        <h2>
                            {position.reserve.symbol}
                        </h2>
                        <h3>
                            {new Intl.NumberFormat('en-GB', {
                                notation: "compact",
                                compactDisplay: "short"
                            }).format(active_borrow)} {' ' + position.reserve.symbol}
                        </h3>
                        Variable : {new Intl.NumberFormat('en-GB', {
                            notation: "compact",
                            compactDisplay: "short"
                        }).format(current_v_debt)}
                        {' '}||
                        Stable : {new Intl.NumberFormat('en-GB', {
                            notation: "compact",
                            compactDisplay: "short"
                        }).format(current_s_debt)}
                    </p>
                </ReserveDiv>
            )
        }

        lending_div.push(
            <ReserveDiv onClick={handleReserveClick}>
                <p key={position.id}>
                    <h2>
                        {position.reserve.symbol}
                    </h2>
                    <h3>
                        {/* {current_lending} */}
                        {new Intl.NumberFormat('en-GB', {
                            notation: "compact",
                            compactDisplay: "short"
                        }).format(current_lending)} {' ' + position.reserve.symbol}
                    </h3>
                    Collateral : {position.reserve.usageAsCollateralEnabled ? 'yes' : 'no'}
                </p>
            </ReserveDiv>
        )
    })

    return (
        <CurrentPositionsDiv>
            <div>
                <h3>Lending Positions</h3>
                <PositionDiv>
                    {lending_div}
                </PositionDiv>

            </div>
            <div>
                <h3>Borrowing Positions</h3>
                {(borrowing_div.length == 0) ? 'None' : ''}
                <PositionDiv>
                    {borrowing_div}
                </PositionDiv>
            </div>
        </CurrentPositionsDiv>
    )
}

const CurrentPositionsDiv = styled.div`
    display: flex;
    flex-direction: column ;
    padding: 10px;
    margin: 10px;

    @media (max-width: 900px){
        display: flex;
        flex-direction: column;
        align-items:flex-start;
        justify-content: left;
    }
`

const PositionDiv = styled.div`
    display:grid;
    grid-template-columns: 1fr 1fr 1fr 1fr ;

    padding: 10px ;
    margin: 20px ;
`

const ReserveDiv = styled.div`
    justify-content: center ;
    align-items: center ;

    :hover{
        background-color: #6b6b6b;
        cursor: pointer;
    }

    padding: 20px ;
    margin: 20px ;

    border: 1px ;
    border-style: solid;
    border-color: white ;
    border-radius: 10px ;
`