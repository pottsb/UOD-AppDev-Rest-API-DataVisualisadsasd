<?php
class Driver{


    public $Id;
    public $KidsDrive;
    public $DOB;
    public $Age;
    public $HomeKids;
    public $YOJ;
    public $Income;
    public $Parent;
    public $HomeValue;
    public $MStatus;
    public $Gender;
    public $Education;
    public $Occupation;
    public $TravTime;
    public $CarUse;
    public $BlueBook;
    public $TIF;
    public $CarType;
    public $RedCar;
    public $OldClaim;
    public $ClaimFrequency;
    public $Revoked;
    public $MVR_PTS;
    public $ClaimAmmount;
    public $CarAge;
    public $ClaimFlag;
    public $UrbanCity;

    public function __construct($id, $kidsdrive, $dob, $age, $homekids, $yoj, $income, $parent, $homevalue, 
                                $mstatus, $gender, $education, $occupation, $travtime, $caruse, $bluebook, $tif, $cartype, $redcar, $oldclaim,
                                $claimfrequency, $revoked, $mvr_pts, $claimammount, $carage, $claimflag, $urbancity)
    {
        $this->Id = (int)$id;
        $this->KidsDrive = (int)$kidsdrive;
        $this->DOB = $dob;
        $this->Age = (int)$age;
        $this->HomeKids = (int)$homekids;
        $this->YOJ = $yoj;
        $this->Income = $income;
        $this->Parent = $parent;
        $this->HomeValue = $homevalue;
        $this->MStatus = $mstatus;
        $this->Gender = $gender;
        $this->Education = $education;
        $this->Occupation = $occupation;
        $this->TravTime = $travtime;
        $this->CarUse = $caruse;
        $this->BlueBook = $bluebook;
        $this->TIF = $tif;
        $this->CarType = $cartype;
        $this->RedCar = $redcar;
        $this->OldClaim = $oldclaim;
        $this->ClaimFrequency = $claimfrequency;
        $this->Revoked = $revoked;
        $this->MVR_PTS = (int)$mvr_pts;
        $this->ClaimAmmount = $claimammount;
        $this->CarAge = (int)$carage;
        $this->ClaimFlag = $claimflag;
        $this->UrbanCity = $urbancity;
    }

    public function getId()
    {
        return $this->Id;
    }

    public function getKidsDrive()
    {
        return $this->KidsDrive;
    }

    public function getDOB()
    {
        return $this->DOB;
    }

    public function getAge()
    {
        return $this->Age;
    }

    public function getHomeKids()
    {
        return $this->HomeKids;
    }

    public function getYOJ()
    {
        return $this->YOJ;
    }

    public function getIncome()
    {
        return $this->Income;
    }

    public function getParent()
    {
        return $this->Parent;
    }

    public function getHomeValue()
    {
        return $this->HomeValue;
    }

    public function getMStatus()
    {
        return $this->MStatus;
    }

    public function getGender()
    {
        return $this->Gender;
    }

    public function getEducation()
    {
        return $this->Education;
    }

    public function getOccupation()
    {
        return $this->Occupation;
    }

    public function getTravTime()
    {
        return $this->TravTime;
    }

    public function getCarUse()
    {
        return $this->CarUse;
    }

    public function getBlueBook()
    {
        return $this->BlueBook;
    }

    public function getTIF()
    {
        return $this->TIF;
    }

    public function getCarType()
    {
        return $this->CarType;
    }

    public function getRedCar()
    {
        return $this->RedCar;
    }

    public function getOldClaim()
    {
        return $this->OldClaim;
    }

    public function getClaimFrequency()
    {
        return $this->ClaimFrequency;
    }

    public function getRevoked()
    {
        return $this->Revoked;
    }

    public function getMVR_PTS()
    {
        return $this->MVR_PTS;
    }

    public function getClaimAmmount()
    {
        return $this->ClaimAmmount;
    }

    public function getCarAge()
    {
        return $this->CarAge;
    }

    public function getClaimFlag()
    {
        return $this->ClaimFlag;
    }

    public function getUrbanCity()
    {
        return $this->UrbanCity;
    }




}
?>
