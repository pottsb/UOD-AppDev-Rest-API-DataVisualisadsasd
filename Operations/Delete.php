<?php

function deleteDriver($url, $parameters, $requestBody, $accept) 
{
    global $dbserver, $dbusername, $dbpassword, $dbdatabase;
    
    $connection = new mysqli($dbserver, $dbusername, $dbpassword, $dbdatabase);
    if (!$connection->connect_error)
    {
        $id = $parameters[1];
        $sql = "delete from data where Id = ?";
        $statement = $connection->prepare($sql);
        $statement->bind_param('i', $id);
        $result = $statement->execute();
        if ($result == FALSE)
        {
            $errorMessage = $statement->error;
        }
        $statement->close();
        $connection->close();
        if ($result == TRUE)
        {

            return TRUE;
        }
        else
        {
            return $errorMessage;
        }
    }
}

?>