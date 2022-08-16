import {
    XAxis, YAxis, Tooltip, Legend,
    ResponsiveContainer,
    AreaChart, Area,
    TooltipProps
} from 'recharts';
import {getStartDate, getEndDate, dateFormatter, getTicks, fillTicksData} from './PlotHelpers'

import styled from 'styled-components';

interface dataprop {
    timestamp: number,
    balance: number
}

interface props {
    plotdata: dataprop[]
}

export const TokenHistory = ({ plotdata }: props) => {

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
    // plotdata.map((data) => {
    //     data.timestampDate = new Date(data.timestamp)
    // })
    // console.log(plotdata)

    const startDate = getStartDate(plotdata)
    const endDate = getEndDate(plotdata)
    const ticks = getTicks(startDate, endDate, 5)
    const filledData = fillTicksData(ticks, plotdata)

    return (
        <>
            <ResponsiveContainer width={"90%"} height={300}>
                <AreaChart data={filledData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="pink" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="pink" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <Area type="stepAfter" dataKey="balance" stroke="pink" fillOpacity={1} fill="url(#colorUv)" />
                    <XAxis dataKey="timestamp" axisLine={false}
                        scale="time"
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
                    {/* <Legend /> */}
                </AreaChart>
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