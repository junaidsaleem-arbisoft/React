import React from "react";
import BarChart from 'react-bar-chart';
function chart(props) {
    const margin = { top: 20, right: 0, bottom: 30, left: 40 };
    const width = 400;
    return (
        <BarChart ylabel='Daily Forecast in F'
            width={width}
            height={500}
            margin={margin}
            data={props.chartData} />
    );
}

export default chart;