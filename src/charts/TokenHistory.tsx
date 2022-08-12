import {
    XAxis, YAxis, Tooltip, Legend,
    ResponsiveContainer,
    AreaChart, Area,
    Line
} from 'recharts';

interface dataprop {
    // timestamp: string,
    timestamp: number,
    balance: number
}

interface props {
    plotdata: dataprop[]
}

export const TokenHistory = ({ plotdata }: props) => {

    console.log(plotdata)

    return (
        <>
            {/* <ResponsiveContainer width={"90%"} height={300}>
                <AreaChart data={plotdata} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="pink" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="pink" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <Area type="monotone" dataKey="balance" stroke="pink" fillOpacity={1} fill="url(#colorUv)" />
                    <XAxis dataKey="timestamp" axisLine={false}
                        scale="time"
                    />
                    <YAxis axisLine={false} type={'number'}
                        tickFormatter={(value) => {
                            return new Intl.NumberFormat('en-GB', {
                                notation: "compact",
                                compactDisplay: "short"
                            }).format(value);
                        }}
                    />
                    <Tooltip />
                    <Legend />
                </AreaChart>
            </ResponsiveContainer> */}
        </>
    )
}