class ChartContainer {
    constructor(name, metric, config) {

        this.name = name;
        this.metric = metric;
        this.config = config;
        this.chart;
        
        this.renderChart();
    }


    getChartData(filterstate, metricName){
        return new Promise((resolve) => {
            setTimeout(() => {
                $.ajax({
                    url: '/drivers/metric/' + metricName,
                    type: 'GET',
                    data: filterstate,
                    cache: false,
                    dataType: 'json',
                    success: function (data) {
                        resolve(data);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
                    }
                });
            }, 2000);
        });
    }
      
    renderChart(){
        let ctx = document.getElementById(this.name);
        this.chart = new Chart(ctx, this.config);
    }

   async updateChart(){

        let returnedData = await this.getChartData(getFilterState(), this.metric);
        
        if (this.name === "scatterChart"){
            this.chart.data.datasets[0].data = returnedData;
        }else{
            this.chart.data.labels = returnedData[0];
            this.chart.data.datasets[0].data = returnedData[1];
        }
        this.chart.update();

    }
}
  


function getAllDrivers(filterstate){
    return new Promise((resolve) => {
        setTimeout(() => {
            $.ajax({
                url: '/drivers',
                type: 'GET',
                data: filterstate,
                cache: false,
                dataType: 'json',
                success: function (data) {
                    resolve(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
                }
            });
        }, 2000);
      });
}



function getFilterState() {
    const inputMetrics = [
        {inputId: "inputGender", metricKey: "Gender"}, 
        {inputId: "inputRedCar", metricKey: "RedCar"}, 
        {inputId: "inputMarried", metricKey: "MStatus"}, 
        {inputId: "inputEducation", metricKey: "Education"}, 
        {inputId: "inputCarType", metricKey: "CarType"}, 
        {inputId: "inputParent", metricKey: "Parent"}, 
        {inputId: "inputClaim", metricKey: "ClaimFlag"}
    ];

    let filterState = {};

    for (let i = 0; i < inputMetrics.length; i++) {
        let input = document.getElementById(inputMetrics[i].inputId).value;
        if (input != "unset"){
            filterState[inputMetrics[i].metricKey] = input; 
        }
    }

    return filterState;
}

let chartObject = [];

async function renderCharts(){

    let chartColours = [
        'rgb(255, 99, 132)',  // Red
        'rgb(54, 162, 235)',  // Blue
        'rgb(255, 205, 86)',  // Yellow
        'rgb(201, 203, 207)',  // Grey
        'rgb(64, 20, 64)',  // "Magenta"
        'rgb(153, 102, 255)',  // Purple
        'rgb(20, 128, 20)',  // Lime
        'rgb(255, 159, 64)',  // Orange
        'rgb(75, 192, 192)'  // Cyan
    ];

    professionsChartConfig = {
        type: 'pie',
        data:  {
            datasets: [{
            label: 'Count',
            backgroundColor: chartColours,
            hoverOffset: 4
            }]
        },
        options: {
        responsive: true,
        plugins: {
            legend: {
            position: 'top',
            },
            title: {
            display: true,
            text: 'Professions'
            }
        }
        }
    }
        
    penaltyPointConfiguration = {
    type: 'bar',
    data: {
        datasets: [{
        label: 'Penalty Points',
        borderWidth: 1
        }]
    },
    options: {
        scales: {
        y: {
            beginAtZero: true
        }
        }
    }
    }

    ageChartConfiguration = {
        type: 'bar',
        data: {
            datasets: [{
            label: 'Driver Age',
            borderWidth: 1
            }]
        },
        options: {
            scales: {
            y: {
                beginAtZero: true
            }
            }
        }
        }


    carAgeChartConfiguration = {
        type: 'bar',
        data: {
            datasets: [{
            label: 'Car Age',
            borderWidth: 1
            }]
        },
        options: {
            scales: {
            y: {
                beginAtZero: true
            }
            }
        }
        }

    carTypeChartConfig = {
        type: 'pie',
        data:  {
            datasets: [{
            label: 'Count',
            backgroundColor: chartColours,
            hoverOffset: 4
            }]
        },
        options: {
        responsive: true,
        plugins: {
            legend: {
            position: 'top',
            },
            title: {
            display: true,
            text: 'Car Type'
            }
        }
        }
    }

    carUseChartConfig = {
        type: 'pie',
        data:  {
            datasets: [{
            label: 'Count',
            backgroundColor: chartColours,
            hoverOffset: 4
            }]
        },
        options: {
        responsive: true,
        plugins: {
            legend: {
            position: 'top',
            },
            title: {
            display: true,
            text: 'Car Use'
            }
        }
        }
    }

    homeKidsChartConfig = {
        type: 'pie',
        data:  {
            datasets: [{
            label: 'Count',
            backgroundColor: chartColours,
            hoverOffset: 4
            }]
        },
        options: {
        responsive: true,
        plugins: {
            legend: {
            position: 'top',
            },
            title: {
            display: true,
            text: 'Children at Home'
            }
        }
        }
    }

    kidsDriveChartConfig = {
        type: 'pie',
        data:  {
            datasets: [{
            label: 'Count',
            backgroundColor: chartColours,
            hoverOffset: 4
            }]
        },
        options: {
        responsive: true,
        plugins: {
            legend: {
            position: 'top',
            },
            title: {
            display: true,
            text: 'Children on Policy'
            }
        }
        }
    }

    revokedChartConfig = {
        type: 'pie',
        data:  {
            datasets: [{
            label: 'Count',
            backgroundColor: chartColours,
            hoverOffset: 4
            }]
        },
        options: {
        responsive: true,
        plugins: {
            legend: {
            position: 'top',
            },
            title: {
            display: true,
            text: 'Insurance Revoked'
            }
        }
        }
    }

    ScatterConfig =  {
        type: 'scatter',
        data:   {
            datasets: [{
            label: 'Bluebook / Home Value',
            backgroundColor: 'rgb(255, 99, 132)'
            }],
        },
        options: {
            //events: [],
            responsive: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Bluebook'
                        },
                type: 'linear',
                position: 'bottom'
                },

                y: {
                    title: {
                        display: true,
                        text: 'Home Value'
                        }
                }
            }
        }
    }

    claimFrequencyChartConfig = {
        type: 'pie',
        data:  {
            datasets: [{
            label: 'Count',
            backgroundColor: chartColours,
            hoverOffset: 4
            }]
        },
        options: {
        responsive: true,
        plugins: {
            legend: {
            position: 'top',
            },
            title: {
            display: true,
            text: 'Claim Frequency'
            }
        }
        }
    }

    urbanCityChartConfig = {
        type: 'pie',
        data:  {
            datasets: [{
            label: 'Count',
            backgroundColor: chartColours,
            hoverOffset: 4
            }]
        },
        options: {
        responsive: true,
        plugins: {
            legend: {
            position: 'top',
            },
            title: {
            display: true,
            text: 'Car Usage'
            }
        }
        }
    }

    

    const charts = [
        { name: "professionsChart", metric:"Occupation", config: professionsChartConfig },
        { name: "penaltyPointChart", metric:"MVR_PTS", config: penaltyPointConfiguration },
        { name: "carTypeChart", metric:"CarType", config: carTypeChartConfig },
        { name: "ageChart", metric:"Age", config: ageChartConfiguration },
        { name: "carUseChart", metric:"CarUse", config: carUseChartConfig },
        { name: "homeKidsChart", metric:"HomeKids", config: homeKidsChartConfig },
        { name: "kidsDriveChart", metric:"KidsDrive", config: kidsDriveChartConfig },
        { name: "revokedChart", metric:"Revoked", config: revokedChartConfig },
        { name: "carAgeChart", metric:"CarAge", config: carAgeChartConfiguration },
        { name: "claimFrequencyChart", metric:"ClaimFrequency", config: claimFrequencyChartConfig },
        { name: "urbanCityChart", metric:"UrbanCity", config: urbanCityChartConfig },
        { name: "scatterChart", metric:"BlueBook/HomeValue", config: ScatterConfig }
      ];
      
      charts.forEach(({ name, metric, config }) => {
        chartObject[name] = new ChartContainer(name, metric, config);
      });

      await updateCharts();

}

async function updateCharts() {

    $("#resultCount").text("LOADING...");
    filterstate = getFilterState();
    
    await Promise.all([
        data = await getAllDrivers(filterstate),
        chartObject.professionsChart.updateChart(),
        chartObject.carTypeChart.updateChart(),
        chartObject.penaltyPointChart.updateChart(),
        chartObject.ageChart.updateChart(),
        chartObject.carUseChart.updateChart(),
        chartObject.homeKidsChart.updateChart(),
        chartObject.kidsDriveChart.updateChart(),
        chartObject.revokedChart.updateChart(),
        chartObject.carAgeChart.updateChart(),
        chartObject.claimFrequencyChart.updateChart(),
        chartObject.urbanCityChart.updateChart(),
        chartObject.scatterChart.updateChart()
      ]);
    

    $("#resultCount").text("Results Returned: " + data.length + "");

}