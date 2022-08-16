import { add, differenceInCalendarDays } from 'date-fns';
import { Bar, BarChart, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from 'recharts';
import styled from 'styled-components';
import { dateFormatter, getStartDate, getEndDate, fillTicksBarData, getTicks } from './PlotHelpers'

interface dataprop {
  timestamp: number;
  balance: number;
}
interface props {
  plotdata: dataprop[]
  // depositHistory: dataprop[],
  // redeemUnderlyingHistory: dataprop[],
  // liquidationHistory: dataprop[]
}

export const MovementHistory = ({ plotdata }: props) => {

  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <ToolTipDiv>
          <h3>
            {new Intl.NumberFormat('en-GB', {
              notation: "compact",
              compactDisplay: "short"
            }).format(payload[0].value!)}
          </h3>
          <p>{dateFormatter(label)}</p>
        </ToolTipDiv>
      );
    }

    return null;
  };

  plotdata.sort((a, b) => {
    return a.timestamp - b.timestamp
  })

  const getDates = (startDate: Date, endDate: Date, num: number) => {
    const diffDays = differenceInCalendarDays(endDate, startDate);
    let current = startDate,
      velocity = 1;

    const ticks = [startDate.getTime()];

    for (let i = 1; i < diffDays - 1; i++) {
      ticks.push(add(current, { days: i * velocity }).getTime());
    }

    ticks.push(endDate.getTime());
    return ticks;
  }

  const startDate = getStartDate(plotdata)
  const endDate = getEndDate(plotdata)
  const ticks = getTicks(startDate, endDate, 5)
  const dates = getDates(startDate, endDate, 3)
  const filledData = fillTicksBarData(dates, plotdata)
  filledData.sort((a, b) => {
    return a.timestamp - b.timestamp
  })

  return (
    <>
      <ResponsiveContainer width={"90%"} height={300}>
        <BarChart data={filledData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
          <Bar dataKey="balance" fill="hotpink" barSize={200} />
          <XAxis dataKey="timestamp" axisLine={false}
            // scale="time"
            // type='number'
            tickFormatter={dateFormatter}
            ticks={ticks}
          />
          <YAxis axisLine={false} type={'number'}
            tickFormatter={(value) => {
              return new Intl.NumberFormat('en-GB', {
                notation: "compact",
                compactDisplay: "short"
              }).format(value);
            }}
          />
          <Tooltip content={<CustomTooltip />} />

        </BarChart>
      </ResponsiveContainer>
    </>
  )
}

const ToolTipDiv = styled.div`
    border-width : 0;
    border-style : solid;
    border:none ;
    border-color: transparent ;
`