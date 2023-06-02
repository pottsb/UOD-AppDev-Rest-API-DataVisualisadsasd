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
            }
        }
    }

    return $filteredResults;
    
}

?>