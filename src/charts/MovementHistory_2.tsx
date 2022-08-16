import {
    Chart as ChartJS,
    TimeScale,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { dateFormatter } from './PlotHelpers';

ChartJS.register(
    TimeScale,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface dataprop {
    timestamp: number;
    balance: number;
}
interface props {
    depositHistory: dataprop[],
    redeemUnderlyingHistory: dataprop[]
}

export const MovementHistory_2 = ({ depositHistory, redeemUnderlyingHistory }: props) => {

    let plotdata: dataprop[] = depositHistory.concat(redeemUnderlyingHistory)
    plotdata.sort((a, b) => {
        return a.timestamp - b.timestamp
    })

    const timestamps = plotdata.map((data) => {
        return dateFormatter(data.timestamp)
    })
    const balances = plotdata.map((data) => {
        return data.balance
    })
    const bgcolor = plotdata.map((data) => {
        return (data.balance > 0) ? 'rgba(75, 192, 192, 0.2)' : 'rgba(255, 99, 132, 0.2)'
    })
    const bordercolor = plotdata.map((data) => {
        return (data.balance > 0) ? 'rgb(75, 192, 192)' : 'rgb(255, 99, 132)'
    })

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
            scales: {
                x: {
                    type: 'time'
                }
            },
        },
    }

    const data = {
        labels: timestamps,
        datasets: [{
            data: balances,
            backgroundColor: bgcolor,
            borderColor: bordercolor,
            borderWidth: 1
        }]
    }
    return (
        <>
            <Bar
                height={"300 px"}
                width={"30%"}
                datasetIdKey='MovementHist'
                options={options}
                data={data}
            />
        </>
    )
}
