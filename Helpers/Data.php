<?php

// Requires the paramiters passed in the GET request and the array of drivers.
// Checks if any of the supported keys are in the paramiters array.
// If they are, it filters the drivers array by the value of the key.
function filterResults($parameters, $driverArray)
{
    $supportedKeys = [
        "Gender", 
        "RedCar", 
        "MStatus", 
        "Education", 
        "CarType",
        "Parent",
        "ClaimFlag"
    ];

    foreach ($supportedKeys as $value) {
        if(array_key_exists($value, $parameters)) {
            $driverArray = array_filter($driverArray, function($driver) use ($value, $parameters) {
                return $driver->$value == $parameters[$value];
            });
        }
    }

    return array_values($driverArray);
}

//Requires the metric of interest and a driver array.
//Removes all metrics apart from the metric of interest from the driver objects.
//Sorts the array by the metric of interest.
//Sorting supports strings and numbers.
function pruneResults($metric, $filteredResults){

    foreach ($filteredResults as $key => &$driver) {
        foreach (get_object_vars($driver) as $driverMetricKey => $value) {
            if ($driverMetricKey !== $metric) {
                unset($driver->$driverMetricKey);
            }else if($driver->$driverMetricKey === ""){ //If the value is empty, set it to Unknown
                $driver->$driverMetricKey = "Unknown";
            }
        }
    }
    
    usort($filteredResults, function($a, $b) use($metric) {
        $aMetric = $a->$metric;
        $bMetric = $b->$metric;
        if ($aMetric == $bMetric) {
            return 0;
        }
        return ($aMetric < $bMetric) ? -1 : 1;
    });
    
    return $filteredResults;
}

//Requires the metric of interest and a driver array.
//Formats the data into a format that the chart.js library can use for graphs.
//Returns an array of keys and a count of the number of times they appear in the array.
//Checks if the metric is in the key array yet.
//If it does, it increments the count of the key in the metricCount array.
//If it doesn't, it adds the key to the key array and pushes 1 into the metricCount array.
//Data should already be sorted before this function is called.
function formatChartData($metric, $drivers)
{
    $keys = array();
    $metricCount = array();

    foreach ($drivers as $key => &$driver) {
        foreach (get_object_vars($driver) as $driverMetricKey => $value) {
            if ($driverMetricKey === $metric) {
                if(in_array($value, $keys))
                {
                    $index = array_search($value, $keys);
                    $metricCount[$index]++;
                }
                else
                {
                    array_push($keys, $value);
                    array_push($metricCount, 1);
                }
            }
        }
    }
    return array($keys, $metricCount);
}

//Requires the two metrics of interest and a driver array.
//Formats the data into a format that the chart.js library can use for plots.
//Adds the metrics for each driver into an array as an X and Y coordinate.
function formatScatterData($drivers, $metric1, $metric2)
{
    $data = [];

    foreach ($drivers as $driver)
    {
        $dataPoint = [];
        $dataPoint['x'] = $driver->$metric1;
        $dataPoint['y'] = $driver->$metric2;

        if( $dataPoint['x'] != 0 && $dataPoint['y'] != 0){
            $data[] = $dataPoint;
        }
        
    }

    return $data;
}

//Requires a driver array.
//This is hard coded and always returns max, min and average for the financial metrics.
//Data should have already been filtered before this function is called.
function formatFianancialData($drivers){

    $IncomeArray = [];
    $OldClaimArray = [];
    $ClaimAmmountArray = [];

    foreach ($drivers as $driver)
    {
        if ($driver->Income != 0){
            array_push($IncomeArray, $driver->Income);
        }
        if ($driver->OldClaim != 0){
            array_push($OldClaimArray, $driver->OldClaim);
        }
        if ($driver->ClaimAmmount != 0){
            array_push($ClaimAmmountArray, $driver->ClaimAmmount);
        }

    }

    if (count($IncomeArray) == 0){
        $IncomeArray = [0];
    }
    if (count($OldClaimArray) == 0){
        $OldClaimArray = [0];
    }
    if (count($ClaimAmmountArray) == 0){
        $ClaimAmmountArray = [0];
    }
    $IncomeData = ["Min" =>(int)min($IncomeArray), "Max" => (int)max($IncomeArray), "Avg" => (int)(array_sum($IncomeArray) / count($IncomeArray))];
    $OldClaimData = ["Min" =>(int)min($OldClaimArray), "Max" => (int)max($OldClaimArray), "Avg" => (int)(array_sum($OldClaimArray) / count($OldClaimArray))];
    $ClaimAmmountData = ["Min" =>(int)min($ClaimAmmountArray), "Max" => (int)max($ClaimAmmountArray), "Avg" => (int)(array_sum($ClaimAmmountArray) / count($ClaimAmmountArray))];

    $data = ["Income" => $IncomeData, "OldClaim" => $OldClaimData, "ClaimAmmount" => $ClaimAmmountData];

    return $data;
}

?>