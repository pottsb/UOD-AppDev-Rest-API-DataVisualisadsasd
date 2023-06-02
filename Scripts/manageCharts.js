class ChartContainer {
    constructor(name, config) {

        this.name = name;
        this.config = config;
        this.data = data;
        this.chart;
        
        this.renderChart();
    }
      
    renderChart(){
        let ctx = document.getElementById(this.name);
        this.chart = new Chart(ctx, this.config);
    }

    updateChart(labels, data){
        
        this.chart.data.labels = labels;
        this.chart.data.datasets[0].data = data;
        this.chart.update();
    }
}
  


function getAllDrivers(filterstate)
{
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


function getMetric(drivers, metric)
{

    let keys = [];
    let metricCount = [];
    for(let i = 0; i < drivers.length; i++)
    {
        if(keys.includes(drivers[i][metric]))
        {
            let index = keys.indexOf(drivers[i][metric]);
            metricCount[index]++;
        }
        else
        {
            keys.push(drivers[i][metric]);
            metricCount.push(1);
        }
    }
    return [keys, metricCount];
}

function getScatter(drivers,metric1,metric2)
{

    data = [];

    for(let i = 0; i < drivers.length; i++)
    {
        let dataPoint = {};
        dataPoint.x = drivers[i][metric1];
        dataPoint.y = drivers[i][metric2];
        dataPoint.r = 5;
        data.push(dataPoint);
    }


    return data
}


function getFilterState(){

    const supportedInputs = ["inputGender", 
                            "inputRedCar", 
                            "inputMarried", 
                            "inputEducation", 
                            "inputCarType", 
                            "inputParent", 
                            "inputClaim"]

    let inputGender = document.getElementById('inputGender').value;
    let inputRedCar = document.getElementById('inputRedCar').value;
    let inputMarried = document.getElementById('inputMarried').value;
    let inputEducation = document.getElementById('inputEducation').value;
    let inputCarType = document.getElementById('inputCarType').value;
    let inputParent = document.getElementById('inputParent').value;
    let inputClaim = document.getElementById('inputClaim').value;

    let filterState = {};

    if (inputGender !== "unset"){
        filterState.Gender = inputGender;
    }
    if (inputRedCar !== "unset"){
        filterState.RedCar = inputRedCar;
    }

    if (inputMarried !== "unset"){
        filterState.MStatus = inputMarried;
    }

    if (inputEducation !== "unset"){
        filterState.Education = inputEducation;
    }

    if (inputCarType !== "unset"){
        filterState.CarType = inputCarType;
    }

    if (inputParent !== "unset"){
        filterState.Parent = inputParent;
    }

    if (inputClaim !== "unset"){
        filterState.ClaimFlag = parseInt(inputClaim);
    }

    return filterState;
}

let chartObject = [];

async function renderCharts(){

    filterstate = getFilterState();
    data = await getAllDrivers(filterstate);
    $("#resultCount").text("Results Returned: " + data.length + "");

    let professions = getMetric(data, "Occupation");
    let carType = getMetric(data, "CarType");
    let MVRPoints = getMetric(data, "MVR_PTS");
    let Age = getMetric(data, "Age");
    let carUse = getMetric(data, "CarUse");
    let homeKids = getMetric(data, "HomeKids");
    let kidsDrive = getMetric(data, "KidsDrive");
    let revoked = getMetric(data, "Revoked");
    let carAge = getMetric(data, "CarAge");
    let claimFrequency = getMetric(data, "ClaimFrequency");
    let UrbanCity = getMetric(data, "UrbanCity");


    let scatterData = getScatter(data, "BlueBook", "HomeValue"); //this modifies the base data :(



    professionsChartConfig = {
        type: 'pie',
        data:  {
            labels: professions[0],
            datasets: [{
            label: 'Count',
            data: professions[1],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
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
        labels: MVRPoints[0],
        datasets: [{
        label: 'Penalty Points',
        data: MVRPoints[1],
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
            labels: Age[0],
            datasets: [{
            label: 'Driver Age',
            data: Age[1],
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
            labels: carAge[0],
            datasets: [{
            label: 'Car Age',
            data: carAge[1],
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
            labels: carType[0],
            datasets: [{
            label: 'Count',
            data: carType[1],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
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
            labels: carUse[0],
            datasets: [{
            label: 'Count',
            data: carUse[1],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
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
            labels: homeKids[0],
            datasets: [{
            label: 'Count',
            data: homeKids[1],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
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
            labels: kidsDrive[0],
            datasets: [{
            label: 'Count',
            data: kidsDrive[1],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
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
            labels: revoked[0],
            datasets: [{
            label: 'Count',
            data: revoked[1],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
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
            data: scatterData,
            backgroundColor: 'rgb(255, 99, 132)'
            }],
        },
        options: {
            events: [],
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
            labels: claimFrequency[0],
            datasets: [{
            label: 'Count',
            data: claimFrequency[1],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
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
            labels: UrbanCity[0],
            datasets: [{
            label: 'Count',
            data: UrbanCity[1],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
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
        { name: "professionsChart", config: professionsChartConfig },
        { name: "penaltyPointChart", config: penaltyPointConfiguration },
        { name: "carTypeChart", config: carTypeChartConfig },
        { name: "ageChart", config: ageChartConfiguration },
        { name: "carUseChart", config: carUseChartConfig },
        { name: "homeKidsChart", config: homeKidsChartConfig },
        { name: "kidsDriveChart", config: kidsDriveChartConfig },
        { name: "revokedChart", config: revokedChartConfig },
        { name: "carAgeChart", config: carAgeChartConfiguration },
        { name: "claimFrequencyChart", config: claimFrequencyChartConfig },
        { name: "urbanCityChart", config: urbanCityChartConfig },
        { name: "scatterChart", config: ScatterConfig }
      ];
      
      charts.forEach(({ name, config }) => {
        chartObject[name] = new ChartContainer(name, config);
      });

}

async function updateCharts() {

    filterstate = getFilterState();
    data = await getAllDrivers(filterstate);

    $("#resultCount").text("Results Returned: " + data.length + "");

    let professions = getMetric(data, "Occupation");
    let carType = getMetric(data, "CarType");
    let MVRPoints = getMetric(data, "MVR_PTS");
    let Age = getMetric(data, "Age");
    let carUse = getMetric(data, "CarUse");
    let homeKids = getMetric(data, "HomeKids");
    let kidsDrive = getMetric(data, "KidsDrive");
    let revoked = getMetric(data, "Revoked");
    let carAge = getMetric(data, "CarAge");
    let claimFrequency = getMetric(data, "ClaimFrequency");
    let UrbanCity = getMetric(data, "UrbanCity");


    let scatterData = getScatter(data, "BlueBook", "HomeValue"); //this modifies the base data :(

    chartObject.professionsChart.updateChart(professions[0], professions[1]);
    chartObject.carTypeChart.updateChart(carType[0], carType[1]);
    chartObject.penaltyPointChart.updateChart(MVRPoints[0], MVRPoints[1]);
    chartObject.ageChart.updateChart(Age[0], Age[1]);
    chartObject.carUseChart.updateChart(carUse[0], carUse[1]);
    chartObject.homeKidsChart.updateChart(homeKids[0], homeKids[1]);
    chartObject.kidsDriveChart.updateChart(kidsDrive[0], kidsDrive[1]);
    chartObject.revokedChart.updateChart(revoked[0], revoked[1]);
    chartObject.carAgeChart.updateChart(carAge[0], carAge[1]);
    chartObject.claimFrequencyChart.updateChart(claimFrequency[0], claimFrequency[1]);
    chartObject.urbanCityChart.updateChart(UrbanCity[0], UrbanCity[1]);
    //chartObject.scatterChart.updateChart(false, scatterData);

}