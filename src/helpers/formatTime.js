const formatUnixToRealTime = (filteredUnixTimeList, period) => {
    const realTime = filteredUnixTimeList.map(unixTime => {
        let date = new Date(unixTime);
        let time = date.getHours() > 12
            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
            : `${date.getHours()}:${date.getMinutes()} AM`;
        return period === 1 ? time : date.toLocaleDateString();
    });
    return realTime;
}

export default formatUnixToRealTime;