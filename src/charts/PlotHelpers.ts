import { add, format, differenceInCalendarDays, isFuture } from 'date-fns'

interface dataprop {
    timestamp: number,
    balance: number
}

export const getStartDate = (plotdata:dataprop[]) => {
    return new Date(
        Math.min(
            ...plotdata.map((element) => {
                return element.timestamp
            }),
        ),
    )
}

export const getEndDate = (plotdata:dataprop[]) => {
    return new Date(
        Math.max(
            ...plotdata.map((element) => {
                return element.timestamp
            }),
        ),
    )
}

export const dateFormatter = (date: number) => {
    return format(new Date(date), "MMM dd, yyyy");
}

export const getTicks = (startDate: Date, endDate: Date, num: number) => {
    const diffDays = differenceInCalendarDays(endDate, startDate);

    let current = startDate,
        velocity = Math.round(diffDays / (num - 1));

    const ticks = [startDate.getTime()];

    for (let i = 1; i < num - 1; i++) {
        ticks.push(add(current, { days: i * velocity }).getTime());
    }

    ticks.push(endDate.getTime());
    return ticks;
}

export const fillTicksData = (_ticks: number[], data: dataprop[]) => {
    const ticks = [..._ticks];
    const filled = [];
    let currentTick = ticks.shift()!;
    let lastData = null;
    for (const it of data) {
        if (ticks.length && it.timestamp > currentTick && lastData) {
            filled.push({ ...lastData, ...{ timestamp: currentTick } });
            currentTick = ticks.shift()!;
        } else if (ticks.length && it.timestamp === currentTick) {
            currentTick = ticks.shift()!;
        }

        filled.push(it);
        lastData = it;
    }

    return filled;
}

export const fillTicksBarData = (_ticks: number[], data: dataprop[]) => {
    const ticks = [..._ticks];
    const filled = [];
    let currentTick = ticks.shift()!;
    let lastData = null;
    for (const it of data) {
        if (ticks.length && it.timestamp > currentTick && lastData) {
            filled.push({ ...{balance: 0}, ...{ timestamp: currentTick } });
            currentTick = ticks.shift()!;
        } else if (ticks.length && it.timestamp === currentTick) {
            currentTick = ticks.shift()!;
        }

        filled.push(it);
        lastData = it;
    }

    return filled;
}