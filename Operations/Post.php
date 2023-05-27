<?php

function createDriver($url, $parameters, $requestBody, $accept) 
	{
		global $dbserver, $dbusername, $dbpassword, $dbdatabase;

		$newBook = extractDriverFromJSON($requestBody);
		$connection = new mysqli($dbserver, $dbusername, $dbpassword, $dbdatabase);
		if (!$connection->connect_error)
		{
			$sql = "insert into data (ID, KIDSDRIVE, DOB, AGE, HOMEKIDS, YOJ, INCOME, PARENT, HOME_VAL, MSTATUS, GENDER, EDUCATION, OCCUPATION, TRAVTIME, 
			CAR_USE, BLUEBOOK, TIF, CAR_TYPE, RED_CAR, OLDCLAIM, CLM_FREQ, REVOKED, MVR_PTS, CLM_AMT, CAR_AGE, CLAIM_FLAG, URBANICITY) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
			// We pull the fields of the book into local variables since 
			// the parameters to bind_param are passed by reference.
			$statement = $connection->prepare($sql);

			$Id = $newBook->getId();
			$KidsDrive = $newBook->getKidsDrive();
			$DOB = $newBook->getDOB();
			$Age = $newBook->getAge();
			$HomeKids = $newBook->getHomeKids();
			$YOJ = $newBook->getYOJ();
			$Income = $newBook->getIncome();
			$Parent = $newBook->getParent();
			$HomeValue = $newBook->getHomeValue();
			$MStatus = $newBook->getMStatus();
			$Gender = $newBook->getGender();
			$Education = $newBook->getEducation();
			$Occupation = $newBook->getOccupation();
			$TravTime = $newBook->getTravTime();
			$CarUse = $newBook->getCarUse();
			$BlueBook = $newBook->getBlueBook();
			$TIF = $newBook->getTIF();
			$CarType = $newBook->getCarType();
			$RedCar = $newBook->getRedCar();
			$OldClaim = $newBook->getOldClaim();
			$ClaimFrequency = $newBook->getClaimFrequency();
			$Revoked = $newBook->getRevoked();
			$MVR_PTS = $newBook->getMVR_PTS();
			$ClaimAmmount = $newBook->getClaimAmmount();
			$CarAge = $newBook->getCarAge();
			$ClaimFlag = $newBook->getClaimFlag();
			$UrbanCity = $newBook->getUrbanCity();

			$statement->bind_param('ddsddddsdssssdsddssddsdddds', $Id, $KidsDrive, $DOB, $Age, $HomeKids, $YOJ, $Income, $Parent, $HomeValue, $MStatus, $Gender, $Education, 
									$Occupation, $TravTime, $CarUse, $BlueBook, $TIF, $CarType, $RedCar, $OldClaim, $ClaimFrequency, $Revoked, 
									$MVR_PTS, $ClaimAmmount, $CarAge, $ClaimFlag, $UrbanCity);
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