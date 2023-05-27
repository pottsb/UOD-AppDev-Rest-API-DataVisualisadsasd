<?php

function extractDriverFromJSON($requestBody)
{
    $driverArray = json_decode($requestBody, true);
    $driver = new Driver(
        $driverArray['Id'],
        $driverArray['KidsDrive'],
        $driverArray['DOB'],
        $driverArray['Age'],
        $driverArray['HomeKids'],
        $driverArray['YOJ'],
        $driverArray['Income'],
        $driverArray['Parent'],
        $driverArray['HomeVal'],
        $driverArray['MStatus'],
        $driverArray['Gender'],
        $driverArray['Education'],
        $driverArray['Occupation'],
        $driverArray['TravTime'],
        $driverArray['CarUse'],
        $driverArray['BlueBook'],
        $driverArray['TIF'],
        $driverArray['CarType'],
        $driverArray['RedCar'],
        $driverArray['OldClaim'],
        $driverArray['CLMFreq'],
        $driverArray['Revoked'],
        $driverArray['MVRPts'],
        $driverArray['ClaimAmmount'],
        $driverArray['CarAge'],
        $driverArray['ClaimFlag'],
        $driverArray['UrbanCity']
    );
    unset($driverArray);
    return $driver;

}

?>