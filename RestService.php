<?php

class RestService 
{
    private $supportedMethods;
    private $apiStringToMatch;

    public function __construct($apiStringToMatch) 
    {
		$this->supportedMethods = "GET, PUT, POST, DELETE";
		$this->apiStringToMatch = $apiStringToMatch;
    }

    public function handleRawRequest() 
    {
		$url = $this->getFullUrl();
		$method = $_SERVER['REQUEST_METHOD'];
		$requestBody = file_get_contents('php://input');

		if (isset($_GET['q']))
		{
			//Get's the original request location now a paramiter after being parsed by the rewrite rule
			$requestLocation = explode("/", $_GET['q']); 
			$parameters = $_GET;
			unset($parameters['q']);
			if (strlen($this->apiStringToMatch) > 0 && count($requestLocation) > 0)
			{
				if (strcmp($this->apiStringToMatch, $requestLocation[0]) != 0)
				{
					$this->notImplementedResponse();
					return;
				}
			}
		}
		else
		{
			$parameters = array();
		}
		if (isset($_SERVER['HTTP_ACCEPT'])) 
		{
		  $accept = $_SERVER['HTTP_ACCEPT'];
		}
		else 
		{
		  $accept = "";
		}
		$this->handleRequest($url, $method, $requestLocation, $requestBody, $accept, $parameters);
    }

    protected function getFullUrl() 
    {
		if (isset($_SERVER['HTTPS']))
		{
			$protocol = $_SERVER['HTTPS'] == 'on' ? 'https' : 'http';
		}
		else
		{
			$protocol = 'http';
		}
		$location = $_SERVER['REQUEST_URI'];
		return $protocol.'://'.$_SERVER['HTTP_HOST'].$location;
    }

    public function handleRequest($url, $method, $requestLocation, $requestBody, $accept, $parameters) 
    {
		switch($method) 
		{
		  case 'GET':
			$this->performGet($url, $requestLocation, $requestBody, $accept, $parameters);
			break;
		  case 'POST':
			$this->performPost($url, $requestLocation, $requestBody, $accept, $parameters);
			break;
		  case 'PUT':
			$this->performPut($url, $requestLocation, $requestBody, $accept, $parameters);
			break;
		  case 'DELETE':
			$this->performDelete($url, $requestLocation, $requestBody, $accept, $parameters);
			break;
		  default:
			$this->notImplementedResponse();
		}
	}

	protected function errorResponse($errorMessage)
    {
		// 500 Server Error 
		header("Error: $errorMessage", true, 500);
    }
  
    protected function notImplementedResponse() 
    {
		// 501 Not Implemented 
		header('Allow: ' . $this->supportedMethods, true, 501);
	}

	protected function methodNotAllowedResponse() 
	{
		// 405 (Method Not Allowed)
		header('Allow: ' . $this->supportedMethods, true, 405);
	}

	protected function notFoundResponse()
	{
		header("HTTP/1.1 404 Not Found");
	}

	protected function noContentResponse()
	{
		header("HTTP/1.1 204 No Content");
	}

	// Override the following methods to provide the appropriate functionality
	
	public function performGet($url, $requestLocation, $requestBody, $accept, $parameters) 
	{
		$this->methodNotAllowedResponse();
	}

	public function performPost($url, $requestLocation, $requestBody, $accept, $parameters) 
	{
		$this->methodNotAllowedResponse();
	}

	public function performPut($url, $requestLocation, $requestBody, $accept, $parameters) 
	{
		$this->methodNotAllowedResponse();
	}

	public function performDelete($url, $requestLocation, $requestBody, $accept, $parameters) 
	{
		$this->methodNotAllowedResponse();
	}

}
?>