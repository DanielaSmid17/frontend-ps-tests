import React from 'react';
import {
    Chart,
    ChartSeries,
    ChartSeriesItem,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
    ChartLegend,

} from '@progress/kendo-react-charts';

import 'hammerjs';

import Grid from '@material-ui/core/Grid'



function LineChart() {


    const categories = ['24-apr', '25-apr', '26-apr', '27-apr', '28-apr', '29-apr', '30-apr', '01-may'];
    const series = [
        {
            name: "Oracle",
            data: [21, 34, 12, 8, 16, 13, 9]
        },
        {
            name: "Coca-Cola",
            data: [12, 38, 8, 2, 6, 10, 6]
        },
        {
            name: "Lemonade",
            data: [9, 7, 23, 2, 6, 25, 12]
        },
    ];

    return (
        <Grid item container direction='column'>
         <Chart style={{ height: 350, width: 550, fontFamily: 'Raleway' }}>
            <ChartLegend position="right" orientation="vertical
            " />
            <ChartCategoryAxis>
                <ChartCategoryAxisItem categories={categories} startAngle={45} style={{ fontFamily: 'Raleway' }}/>
            </ChartCategoryAxis>
            <ChartSeries>
                {series.map((item, idx) => (
                    <ChartSeriesItem
                        key={idx}
                        type="line"
                        tooltip={{ visible: true }}
                        data={item.data}
                        name={item.name}
                    />
                ))}
            </ChartSeries>
         </Chart>
        </Grid>

    );
}

export default LineChart;