<?php

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

function getMetric($metric, $filteredResults){

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