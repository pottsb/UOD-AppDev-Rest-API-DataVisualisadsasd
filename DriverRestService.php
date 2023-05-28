<?php
    require "dbinfo.php";
    require "RestService.php";
    require "Driver.php";
	require "Operations/Delete.php";
	require "Operations/Get.php";
	require "Operations/Post.php";
	require "Operations/Put.php";
	require 'Helpers/ExtractDriverFromJSON.php';
 
class DriverRestService extends RestService 
{
	private $drivers;
    
	public function __construct() 
	{
		parent::__construct("drivers");
	}

	public function performGet($url, $parameters, $requestBody, $accept) 
	{
		switch (count($parameters))
		{
			case 1:
				header('Content-Type: application/json; charset=utf-8');
				header('no-cache,no-store');
				$drivers = getAlldrivers();
				echo json_encode($drivers);
				break;

			case 2:
				$id = $parameters[1];
				$driver = getdriverById($id);
				if ($driver != null)
				{
					header('Content-Type: application/json; charset=utf-8');
					header('no-cache,no-store');
					echo json_encode($driver);
				}
				else
				{
					$this->notFoundResponse();
				}
				break;

			case 4:
				$year = $parameters[1];
				$month = $parameters[2];
				$day = $parameters[3];
				header('Content-Type: application/json; charset=utf-8');
				header('no-cache,no-store');
				$this->getdriversByDate($year, $month, $day);
				echo json_encode($this->drivers);
				break;
				
			default:	
				$this->methodNotAllowedResponse();
		}
	}

	public function performPost($url, $parameters, $requestBody, $accept) 
	{
		$result = createDriver($url, $parameters, $requestBody, $accept);

		if ($result == TRUE)
		{
			$this->noContentResponse();
		}
		else
		{
			$this->errorResponse($result);
		}
	}

	public function performPut($url, $parameters, $requestBody, $accept) 
	{
		$result = updateDriver($url, $parameters, $requestBody, $accept);

		if ($result == TRUE)
		{
			$this->noContentResponse();
		}
		else
		{
			$this->errorResponse($result);
		}
	}
	

    public function performDelete($url, $parameters, $requestBody, $accept) 
    {
		if (count($parameters) == 2)
		{
			$result = deleteDriver($url, $parameters, $requestBody, $accept);

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
