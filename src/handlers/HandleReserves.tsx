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

    let lending_div: JSX.Element[] = []
    let borrowing_div: JSX.Element[] = []

    positions.map((position) => {

        let decimals = position.reserve.decimals
        let current_lending = parseInt(position.currentATokenBalance) / 10 ** decimals
        let current_v_debt = parseInt(position.currentVariableDebt) / 10 ** decimals
        let current_s_debt = parseInt(position.currentStableDebt) / 10 ** decimals

        console.log(position.reserve.symbol)
        console.log(current_v_debt)

        let active_borrow = current_v_debt + current_s_debt
        let active = current_lending + active_borrow

        if (!active) {
            return
        }

        if (active_borrow != 0) {
            borrowing_div.push(
                <p>
                    Reserve Name: {position.reserve.symbol}

                    Current Debts : {current_v_debt + current_s_debt}
                    - ({current_v_debt + ' variable '})
                    - ({current_s_debt + ' stable '})
                </p>
            )
        }

        lending_div.push(
            <div>
                <p>
                    Reserve Name: {position.reserve.symbol}
                    Collateral : {position.reserve.usageAsCollateralEnabled}

                    Amount Lend : {current_lending}
                </p>
            </div>
        )
    })

    return (
        <div>
            {lending_div}
            {borrowing_div}
        </div>
    )
}