<?php


function filterResults($parameters, $driverArray)
{

    #only return red cars
    if($parameters['red'] == 'true'):
        $driverArray = array_filter($driverArray, function($driver) {
            return $driver->RedCar == 'Yes';
        });
    endif;

    #filter by gender
    if($parameters['gender'] == 'm'):
        $driverArray = array_filter($driverArray, function($driver) {
            return $driver->Gender == 'M';
        });
    endif;

    if($parameters['gender'] == 'f'):
        $driverArray = array_filter($driverArray, function($driver) {
            return $driver->Gender == 'F';
        });
    endif;


    return $driverArray;
}

?>