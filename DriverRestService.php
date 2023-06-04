<?php
    require "dbinfo.php";
    require "RestService.php";
    require "Driver.php";
	require "Operations/Delete.php";
	require "Operations/Get.php";
	require "Operations/Post.php";
	require "Operations/Put.php";
	require 'Helpers/ExtractDriverFromJSON.php';
	require 'Helpers/Data.php';

class DriverRestService extends RestService 
{
	private $drivers;
    
	public function __construct() 
	{
		parent::__construct("drivers");
	}

	public function performGet($url, $requestLocation, $requestBody, $accept, $parameters) 
	{
		//IMPORTANT NOTE
		//The logic typically flows like this.
		//First the data is filtered removing any drivers that do not match the filter parameters passed in the GET request.
		//This requires all collumns of data to allow for filtering in PHP.
		//Then the data is pruned to only include the metric of interest then sorted.
		//Finally the data is formatted into a format that the chart.js library can use.
		switch (count($requestLocation))
		{	
			// /drivers
			//Returns all Drivers
			case 1: 
				header('Content-Type: application/json; charset=utf-8');
				header('no-cache,no-store');
				$drivers = getAlldrivers();
				$filteredResults = filterResults($parameters, $drivers);
				echo json_encode($filteredResults);
				break;

			// /driver/{DRIVER_ID}
			//Returns a specific Driver
			case 2: 
				$id = $requestLocation[1];
				$driver = getdriverById($id);
				if ($driver != null)
				{
					header('Content-Type: application/json; charset=utf-8');
					header('no-cache,no-store');
					$filteredResults = filterResults($parameters, $driver);
					echo json_encode($filteredResults);
				}
				else
				{
					$this->notFoundResponse();
				}
				break;
			// /drivers/metric/{METRIC_NAME}
			//Returns a specific metric for drivers after being filtered by parameters passed in the GET request.
			case 3: 
				$metric = $requestLocation[2];
				header('Content-Type: application/json; charset=utf-8');
				header('no-cache,no-store');
				$drivers = getAlldrivers();
				$filteredResults = filterResults($parameters, $drivers); //Filter the results based on the parameters passed in the GET request.

				//If the metric is financial, we need to format the data differently returning spesific data for the metric.
				//Else we use getMetric to select the collumn we're interested in, then format the data for the chart.
				if ($metric === "Financial"){
					$formattedResults = formatFianancialData($filteredResults);
				}else{
					$prunedResults = pruneResults($metric, $filteredResults);
					$formattedResults = formatChartData($metric,$prunedResults);
				}
				

				echo json_encode($formattedResults);
				break;
			// /drivers/metric/{METRIC_NAME}/{METRIC_NAME}
			//Filters the results by the parameters passed in the GET request, then returns the XY data for a plot of two metrics.
			case 4: 
				$metric1 = $requestLocation[2];
				$metric2 = $requestLocation[3];
				$drivers = getAlldrivers();
				$filteredResults = filterResults($parameters, $drivers);
				$formattedResults = formatScatterData($filteredResults, $metric1, $metric2);
				echo json_encode($formattedResults);
				break;
				
			default:	
				$this->methodNotAllowedResponse();
		}
	}

	public function performPost($url, $requestLocation, $requestBody, $accept, $parameters) 
	{
		$result = createDriver($url, $requestLocation, $requestBody, $accept);

		if ($result == TRUE)
		{
			$this->noContentResponse();
		}
		else
		{
			$this->errorResponse($result);
		}
	}

	public function performPut($url, $requestLocation, $requestBody, $accept, $parameters) 
	{
		$result = updateDriver($url, $requestLocation, $requestBody, $accept);

		if ($result == TRUE)
		{
			$this->noContentResponse();
		}
		else
		{
			$this->errorResponse($result);
		}
	}
	

    public function performDelete($url, $requestLocation, $requestBody, $accept, $parameters) 
    {
		
		if (count($requestLocation) == 2)
		{
			$result = deleteDriver($url, $requestLocation, $requestBody, $accept);

			if ($result == TRUE)
			{
				$this->noContentResponse();
			}
			else
			{
				$this->errorResponse($result);
			}
		}
		else
		{
			$this->methodNotAllowedResponse();
		}
		
    } 
}
?>
