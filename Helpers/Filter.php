<?php


function filterResults($parameters, $driverArray)
{

    #only return red cars
    if(array_key_exists('red', $parameters) && $parameters['red'] == 'true'):
        $driverArray = array_filter($driverArray, function($driver) {
            return $driver->RedCar == 'Yes';
        });
    endif;

    #filter by gender
    if(array_key_exists('gender', $parameters) && $parameters['gender'] == 'm'):
        $driverArray = array_filter($driverArray, function($driver) {
            return $driver->Gender == 'M';
        });
    endif;

    if(array_key_exists('gender', $parameters) && $parameters['gender'] == 'f'):
        $driverArray = array_filter($driverArray, function($driver) {
            return $driver->Gender == 'F';
        });
    endif;


    return $driverArray;
}

?>