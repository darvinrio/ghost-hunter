interface vTokenBalanceHistory {
    timestamp: number,
    scaledVariableDebt: string
}
interface sTokenBalanceHistory {
    timestamp: number,
    currentStableDebt: string
}
interface borrowHistory {
    timestamp: number,
    amount: string
}
interface repayHistory {
    timestamp: number,
    amount: string
}
interface reserve {
    symbol: string,
    decimals: number
}
interface aTokenBalanceHistory {
    timestamp: number,
    scaledATokenBalance: string
}
interface depositHistory {
    timestamp: number,
    amount: string
}
interface redeemUnderlyingHistory {
    timestamp: number,
    amount: string
}
interface liquidationCallHistory {
    timestamp: number,
    amount: string
}

export interface ReserveHistory {
    id: string,
    reserve: reserve,
    
    aTokenBalanceHistory: aTokenBalanceHistory[],
    depositHistory: depositHistory[],
    redeemUnderlyingHistory: redeemUnderlyingHistory[],
    liquidationCallHistory: liquidationCallHistory[],

    vTokenBalanceHistory: vTokenBalanceHistory[],
    sTokenBalanceHistory: sTokenBalanceHistory[],
    borrowHistory: borrowHistory[],
    repayHistory: repayHistory[],
}