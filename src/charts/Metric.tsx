import React from 'react'
import styled from 'styled-components'

interface props {
  label: string,
  value: string | number
}

export const Metric = ({ label, value }: props) => {
  return (
    <MetricDiv>
      <h3>{label}</h3>
      <h1>{value}</h1>
    </MetricDiv>
  )
}

const MetricDiv = styled.div`
  justify-content: center ;
  align-items: center ;

  border: 1px ;
  border-style: solid;
  border-color: white ;
  border-radius: 10px ;

  padding: 10px ;
  margin: 20px ;
`
