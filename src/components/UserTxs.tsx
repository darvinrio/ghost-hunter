import { useQuery, gql } from "@apollo/client";

import { Txs, HandleTransactions } from "../handlers/HandleTransactions";

const GET_TRANSACTIONS = gql`
  query GetTxs($user: String, $skip: Int) {
    deposits(
      skip: $skip
      first: 1000
      orderBy: timestamp
      orderDirection: desc
      where: { user: $user }
    ) {
      id
      timestamp
      reserve {
        symbol
        decimals
      }
      amount
    }
    usageAsCollaterals(
      skip: $skip
      first: 1000
      orderBy: timestamp
      orderDirection: desc
      where: { user: $user }
    ) {
      id
      timestamp
      reserve {
        symbol
      }
      toState
    }
    redeemUnderlyings(
      skip: $skip
      first: 1000
      orderBy: timestamp
      orderDirection: desc
      where: { user: $user }
    ) {
      id
      timestamp
      reserve {
        symbol
        decimals
      }
      amount
    }
    borrows(
      skip: $skip
      first: 1000
      orderBy: timestamp
      orderDirection: desc
      where: { user: $user }
    ) {
      id
      timestamp
      reserve {
        symbol
        decimals
      }
      amount
    }
    repays(
      skip: $skip
      first: 1000
      orderBy: timestamp
      orderDirection: desc
      where: { user: $user }
    ) {
      id
      timestamp
      reserve {
        symbol
        decimals
      }
      amount
    }
    swaps(
      skip: $skip
      first: 1000
      orderBy: timestamp
      orderDirection: desc
      where: { user: $user }
    ) {
      id
      timestamp
      reserve {
        symbol
      }
      borrowRateModeTo
    }
    liquidationCalls(
      skip: $skip
      first: 1000
      orderBy: timestamp
      orderDirection: desc
      where: { user: $user }
    ) {
      id
      timestamp
      collateralReserve {
        symbol
        decimals
      }
      principalReserve {
        symbol
        decimals
      }
      collateralAmount
      principalAmount
      liquidator
    }
    flashLoans(
      skip: $skip
      first: 1000
      orderBy: timestamp
      orderDirection: desc
      where: { initiator: $user }
    ) {
      id
      timestamp
      reserve {
        symbol
        decimals
      }
      amount
    }
  }
`;
interface TxDataVars {
  user: string;
  skip: number;
}

interface props {
  user: string;
}

export const UsersTxs = ({ user }: props) => {
  const { loading, error, data } = useQuery<Txs, TxDataVars>(GET_TRANSACTIONS, {
    variables: { user: user!, skip: 0 },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!!!</p>;

  // console.log(data)

  return (
    <div>
      <p>
        <h2>Transactions</h2> - (Click to expand AAVE events or Click on hash)
      </p>
      <HandleTransactions txs={data!} />
    </div>
  );
};
