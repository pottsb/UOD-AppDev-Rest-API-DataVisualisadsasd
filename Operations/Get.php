<?php

function getAlldrivers()
    {
        global $dbserver, $dbusername, $dbpassword, $dbdatabase;

        $connection = new mysqli($dbserver, $dbusername, $dbpassword, $dbdatabase);
        if (!$connection->connect_error)
        {
            $query = "select * from data";
            if ($result = $connection->query($query))
            {
                while ($row = $result->fetch_assoc())
                {
                    $drivers[] = new driver($row["ID"], $row["KIDSDRIVE"], $row["DOB"], $row["AGE"], $row["HOMEKIDS"], $row["YOJ"], 
                    $row["INCOME"], $row["PARENT"], $row["HOME_VAL"], $row["MSTATUS"], $row["GENDER"], 
                    $row["EDUCATION"], $row["OCCUPATION"], $row["TRAVTIME"], $row["CAR_USE"], $row["BLUEBOOK"], 
                    $row["TIF"], $row["CAR_TYPE"], $row["RED_CAR"], $row["OLDCLAIM"], $row["CLM_FREQ"], 
                    $row["REVOKED"], $row["MVR_PTS"], $row["CLM_AMT"], $row["CAR_AGE"], $row["CLAIM_FLAG"], 
                    $row["URBANICITY"] );
                }
                $result->close();
            }
            $connection->close();
            return $drivers;
        }
    }	 

function getdriverById($id)
    {
        global $dbserver, $dbusername, $dbpassword, $dbdatabase;
        
        $connection = new mysqli($dbserver, $dbusername, $dbpassword, $dbdatabase);
        if (!$connection->connect_error)
        {
            $query = "select * from data where ID = ?";
            $statement = $connection->prepare($query);
            $statement->bind_param('i', $id);
            $statement->execute();
            $statement->store_result();
            $statement->bind_result($id, $kidsdrive, $dob, $age, $homekids, $yoj, $income, $parent, $home_val, $mstatus, $gender, $education, $occupation, $travtime, $car_use, $bluebook, $tif, $car_type, $red_car, $oldclaim, $clm_freq, $revoked, $mvr_pts, $clm_amt, $car_age, $claim_flag, $urbanicity);
            if ($statement->fetch())
            {
                return new driver($id, $kidsdrive, $dob, $age, $homekids, $yoj, $income, $parent, $home_val, $mstatus, $gender, $education, $occupation, $travtime, $car_use, $bluebook, $tif, $car_type, $red_car, $oldclaim, $clm_freq, $revoked, $mvr_pts, $clm_amt, $car_age, $claim_flag, $urbanicity);
            }
            else
            {
                return null;
            }
            $statement->close();
            $connection->close();
        }
    }	

function getdriversByDate($year, $month, $day)
    {
        global $dbserver, $dbusername, $dbpassword, $dbdatabase;

        $connection = new mysqli($dbserver, $dbusername, $dbpassword, $dbdatabase);
        if (!$connection->connect_error)
        {
            $date = $year."-".$month."-".$day;
            $query = "select id, title, author, genre, publishdate, description, price from drivers where publishdate >= ?";
            $statement = $connection->prepare($query);
            $statement->bind_param('s', $date);
            $statement->execute();
            $statement->store_result();
            $statement->bind_result($id, $title, $author, $genre, $publishdate, $description, $price);
            while ($statement->fetch())
            {
                $this->drivers[] = new driver($id, $title, $author, $genre, $publishdate, $description, $price);
            }
            $statement->close();
            $connection->close();
        }
    }

?>