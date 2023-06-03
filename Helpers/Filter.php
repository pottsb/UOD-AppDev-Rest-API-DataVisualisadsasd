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

?>