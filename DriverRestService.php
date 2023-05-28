<?php
    require "dbinfo.php";
    require "RestService.php";
    require "Driver.php";
	require "Operations/Delete.php";
	require "Operations/Get.php";
	require "Operations/Post.php";
	require "Operations/Put.php";
	require 'Helpers/ExtractDriverFromJSON.php';
	require 'Helpers/Filter.php';
 
class DriverRestService extends RestService 
{
	private $drivers;
    
	public function __construct() 
	{
		parent::__construct("drivers");
	}

	public function performGet($url, $requestLocation, $requestBody, $accept, $parameters) 
	{
		switch (count($requestLocation))
		{
			case 1:
				header('Content-Type: application/json; charset=utf-8');
				header('no-cache,no-store');
				$drivers = getAlldrivers();
				$filteredResults = filterResults($parameters, $drivers);
				echo json_encode($filteredResults);
				break;

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

			case 4:
				$year = $requestLocation[1];
				$month = $requestLocation[2];
				$day = $requestLocation[3];
				header('Content-Type: application/json; charset=utf-8');
				header('no-cache,no-store');
				$this->getdriversByDate($year, $month, $day);
				echo json_encode($this->drivers);
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
		if (count($parameters) == 2)
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
    }

	 
}
?>
