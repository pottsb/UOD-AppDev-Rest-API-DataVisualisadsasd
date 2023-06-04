//Requests all drivers from the API and returns them as a promise
function getAllDrivers()
{
    return new Promise((resolve) => {
        setTimeout(() => {
            $.ajax({
                url: '/drivers',
                type: 'GET',
                cache: false,
                dataType: 'json',
                success: function (data) {
                    resolve(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
                }
            });
        }, 2000);
      });
}

//Called from the edit driver button in the table.
//Gets the driver from the API and creates a form to edit the driver.
//Requires a valid ID to be passed in.
function editDriver(driverId)
{
    $.ajax({
        url: '/drivers/' + driverId,
        type: 'GET',
        cache: false,
        dataType: 'json',
        success: function (data) {
            createEditDriverForm(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
    });
}

//Called from the runModal function if the unser confirms deletion.
//Deletes a driver, returns no content if successful.
//Requires a valid ID to be passed in.
function deleteDriver(driverId)
{
    $.ajax({
        url: '/drivers/' + driverId,
        type: 'DELETE',
        dataType: 'json',
        success: function () {
            $(`#driverTable tbody tr:contains('${driverId}')`).remove();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
    });
}

//Called from the submit button on the create driver form.
//Grabs the content of the HTML form and sends it to the API.
//returns no content if successful.
function addDriver()
{
    var DOB = new Date($('#DOBdateyear').val(), $('#DOBdatemonth').val() - 1, $('#DOBdateday').val()).toISOString().slice(0, 19).replace('T', ' ');
    var driver = {
        Id: $('#Id').val(),
        KidsDrive: $('#KidsDrive').val(),
        DOB: DOB,
        Age: $('#Age').val(),
        HomeKids: $('#HomeKids').val(),
        YOJ: $('#YOJ').val(),
        Income: $('#Income').val(),
        Parent: $('#Parent').val(),
        HomeVal: $('#HomeValue').val(),
        MStatus: $('#MStatus').val(),
        Gender: $('#Gender').val(),
        Education: $('#Education').val(),
        Occupation: $('#Occupation').val(),
        TravTime: $('#TravTime').val(),
        CarUse: $('#CarUse').val(),
        BlueBook: $('#BlueBook').val(),
        TIF: $('#TIF').val(),
        CarType: $('#CarType').val(),
        RedCar: $('#RedCar').val(),
        OldClaim: $('#OldClaim').val(),
        CLMFreq: $('#ClaimFrequency').val(),
        Revoked: $('#Revoked').val(),
        MVRPts: $('#MVR_PTS').val(),
        ClaimAmmount: $('#ClaimAmmount').val(),
        CarAge: $('#CarAge').val(),
        ClaimFlag: $('#ClaimFlag').val(),
        UrbanCity: $('#UrbanCity').val()
    };

    $.ajax({
        url: '/drivers',
        type: 'POST',
        data: JSON.stringify(driver),
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            getAllDrivers();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
    });
    $("#newdriverform").html("");

}

//Called from the cancel button when creating or editing a driver.
//removes the form from the page.
function cancelChangeDriver()
{
    $("#newdriverform").html("");
}

//Called from the submit button on the edit driver form.
//Grabs the content of the HTML form and sends it to the API.
//returns no content if successful.
function editDriverValues()
{
    var DOB = new Date($('#DOBdateyear').val(), $('#DOBdatemonth').val() - 1, $('#DOBdateday').val()).toISOString().slice(0, 19).replace('T', ' ');
    var driver = {
        Id: $('#Id').val(),
        KidsDrive: $('#KidsDrive').val(),
        DOB: DOB,
        Age: $('#Age').val(),
        HomeKids: $('#HomeKids').val(),
        YOJ: $('#YOJ').val(),
        Income: $('#Income').val(),
        Parent: $('#Parent').val(),
        HomeVal: $('#HomeValue').val(),
        MStatus: $('#MStatus').val(),
        Gender: $('#Gender').val(),
        Education: $('#Education').val(),
        Occupation: $('#Occupation').val(),
        TravTime: $('#TravTime').val(),
        CarUse: $('#CarUse').val(),
        BlueBook: $('#BlueBook').val(),
        TIF: $('#TIF').val(),
        CarType: $('#CarType').val(),
        RedCar: $('#RedCar').val(),
        OldClaim: $('#OldClaim').val(),
        CLMFreq: $('#ClaimFrequency').val(),
        Revoked: $('#Revoked').val(),
        MVRPts: $('#MVR_PTS').val(),
        ClaimAmmount: $('#ClaimAmmount').val(),
        CarAge: $('#CarAge').val(),
        ClaimFlag: $('#ClaimFlag').val(),
        UrbanCity: $('#UrbanCity').val()
    };

    $.ajax({
        url: '/drivers',
        type: 'PUT',
        data: JSON.stringify(driver),
        contentType: "application/json;charset=utf-8",
        success: function () {
            getAllDrivers();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
    });
    $("#newdriverform").html("");

}

//Called by the Get ALl Drivers button.
//Gets all drivers from the API and creates a table to display them.
async function createDriverTable()
{
    var loadingHTML = "<div id='loadingContainer'><img src='/Images/throbber.gif' width='100' height='100' ><br><br><p class='loadingtext'>LOADING...<br></p></div>";
    $("#mainContent").html(loadingHTML);
    $("#newdriverform").html("");

    drivers = await getAllDrivers();
    
    var strResult = '<div class="col-md-12">' + 
                    '<table  id="driverTable" class="table table-bordered table-hover">' +
                    '<thead>' +
                    '<tr>' +
                    '<th>ID</th>' +
                    '<th>Kids Drive</th>' +
                    '<th>DateOfBirth</th>' +
                    '<th>Age</th>' +
                    '<th>Kids At Home</th>' +
                    '<th>YOJ</th>' +
                    '<th>Income</th>' +
                    '<th>Parent</th>' +
                    '<th>Home Value</th>' +
                    '<th>Marital Status</th>' +
                    '<th>Gender</th>' +
                    '<th>Education</th>' +
                    '<th>Occupation</th>' +
                    '<th>Travel Time</th>' +
                    '<th>Car Use</th>' +
                    '<th>Bluebook</th>' +
                    '<th>TIF</th>' +
                    '<th>Car Type</th>' +
                    '<th>Red Car</th>' +
                    '<th>Old Claim</th>' +
                    '<th>Claim Frequency</th>' +
                    '<th>Revoked</th>' +
                    '<th>Penalty Points</th>' +
                    '<th>Claim Ammount</th>' +
                    '<th>Car Age</th>' +
                    '<th>Claim Flag</th>' +
                    '<th>Highly/Urban/Urban</th>' +  
                    '<th></th>' +  
                    '<th></th>' +                    
                    '</tr>' +
                    '</thead>' +
                    '<tbody>';
    $.each(drivers, function (index, driver) 
    {   
        deleteAction = "runModal('Please Confirm', 'Are you sure you want to delete driver " + driver.Id + "?', 'Delete', 'deleteDriver(" + driver.Id + ")') "
        strResult +=  `<tr><td>`;
        strResult +=  + driver.Id + "</td><td>" 
        + driver.KidsDrive + "</td><td>" 
        + driver.DOB + "</td><td>" 
        + driver.Age + "</td><td>" 
        + driver.HomeKids + "</td><td>" 
        + driver.YOJ + "</td><td>" 
        + driver.Income + "</td><td>" 
        + driver.Parent + "</td><td>" 
        + driver.HomeValue + "</td><td>" 
        + driver.MStatus + "</td><td>" 
        + driver.Gender + "</td><td>" 
        + driver.Education + "</td><td>" 
        + driver.Occupation + "</td><td>" 
        + driver.TravTime + "</td><td>" 
        + driver.CarUse + "</td><td>" 
        + driver.BlueBook + "</td><td>" 
        + driver.TIF + "</td><td>" 
        + driver.CarType + "</td><td>" 
        + driver.RedCar + "</td><td>" 
        + driver.OldClaim + "</td><td>" 
        + driver.ClaimFrequency + "</td><td>" 
        + driver.Revoked + "</td><td>" 
        + driver.MVR_PTS + "</td><td>" 
        + driver.ClaimAmmount + "</td><td>" 
        + driver.CarAge + "</td><td>" 
        + driver.ClaimFlag + "</td><td>" 
        + driver.UrbanCity + "</td><td>";        
        strResult += '<input type="button" value="Edit Driver" class="btn btn-sm btn-primary" onclick="editDriver(' + driver.Id + ');" />';
        strResult += '</td><td>';
        strResult += '<input type="button" value="Delete Driver" class="btn btn-sm btn-primary" onclick="' + deleteAction + '" />';
        strResult += "</td></tr>";
        
    });
    strResult += "</tbody></table>";
    $("#mainContent").html(strResult);
    $('#driverTable').dynatable({
        features: {
            search: false // Disable the search box
        }
    });
}

//Called by the Add New Driver button.
//Creates a form to add a new driver.
function createNewDriverForm()
{
    var strResult = '<div class="col-md-12">';
    strResult += '<form class="form-horizontal" role="form">';
    strResult += '<div class="form-group"><label for="Id" class="col-md-3 control-label">ID</label><div class="col-md-9"><input type="text" class="form-control" id="Id"></div></div>';
    strResult += '<div class="form-group"><label for="KidsDrive" class="col-md-3 control-label">Kids Drive</label><div class="col-md-9"><input type="text" class="form-control" id="KidsDrive"></div></div>';
    strResult += '<div class="form-group"><label for="DOBdateday" class="col-md-3 control-label">DOB</label><div class="col-md-1"><input type="text" class="form-control" id="DOBdateday" placeholder="dd" size="2"></div><div class="col-md-1"><input type="text" class="form-control" id="DOBdatemonth" placeholder="mm" size="2"></div><div class="col-md-1"><input type="text" class="form-control" id="DOBdateyear" placeholder="yyyy" size="4"></div></div>';
    strResult += '<div class="form-group"><label for="Age" class="col-md-3 control-label">Age</label><div class="col-md-9"><input type="text" class="form-control" id="Age"></div></div>';
    strResult += '<div class="form-group"><label for="HomeKids" class="col-md-3 control-label">HomeKids</label><div class="col-md-9"><input type="text" class="form-control" id="HomeKids"></div></div>';
    strResult += '<div class="form-group"><label for="YOJ" class="col-md-3 control-label">YOJ</label><div class="col-md-9"><input type="text" class="form-control" id="YOJ"></div></div>';
    strResult += '<div class="form-group"><label for="Income" class="col-md-3 control-label">Income</label><div class="col-md-9"><input type="text" class="form-control" id="Income"></div></div>';
    strResult += '<div class="form-group"><label for="Parent" class="col-md-3 control-label">Parent</label><div class="col-md-9"><select id="Parent" class="form-control"><option value="Yes">Yes</option><option value="No">No</option></select></div></div>';
    strResult += '<div class="form-group"><label for="HomeValue" class="col-md-3 control-label">HomeValue</label><div class="col-md-9"><input type="text" class="form-control" id="HomeValue"></div></div>';
    strResult += '<div class="form-group"><label for="MStatus" class="col-md-3 control-label">Marital Status</label><div class="col-md-9"><select id="MStatus" class="form-control"><option value="Yes">Yes</option><option value="No">No</option></select></div></div>';
    strResult += '<div class="form-group"><label for="Gender" class="col-md-3 control-label">Gender</label><div class="col-md-9"><select id="Gender" class="form-control"><option value="M">M</option><option value="F">F</option></select></div></div>';
    strResult += '<div class="form-group"><label for="Education" class="col-md-3 control-label">Education</label><div class="col-md-9"><select id="Education" class="form-control"><option value="High School">High School</option><option value="PhD">PhD</option><option value="Bachelors">Bachelors</option><option value="Masters">Masters</option></select></div></div>';
    strResult += '<div class="form-group"><label for="Occupation" class="col-md-3 control-label">Occupation</label><div class="col-md-9"><input type="text" class="form-control" id="Occupation"></div></div>';
    strResult += '<div class="form-group"><label for="TravTime" class="col-md-3 control-label">TravTime</label><div class="col-md-9"><input type="text" class="form-control" id="TravTime"></div></div>';
    strResult += '<div class="form-group"><label for="CarUse" class="col-md-3 control-label">CarUse</label><div class="col-md-9"><select id="CarUse" class="form-control"><option value="Private">Private</option><option value="Commercial">Commercial</option></select></div></div>';
    strResult += '<div class="form-group"><label for="BlueBook" class="col-md-3 control-label">BlueBook</label><div class="col-md-9"><input type="text" class="form-control" id="BlueBook"></div></div>';
    strResult += '<div class="form-group"><label for="TIF" class="col-md-3 control-label">TIF</label><div class="col-md-9"><input type="text" class="form-control" id="TIF"></div></div>';
    strResult += '<div class="form-group"><label for="CarType" class="col-md-3 control-label">CarType</label><div class="col-md-9"><select id="CarType" class="form-control"><option value="Pickup">Pickup</option><option value="Minivan">Minivan</option><option value="Sports Car">Sports Car</option><option value="Van">Van</option><option value="Panel Truck">Panel Truck</option></select></div></div>';
    strResult += '<div class="form-group"><label for="RedCar" class="col-md-3 control-label">RedCar</label><div class="col-md-9"><select id="RedCar" class="form-control"><option value="Yes">Yes</option><option value="No">No</option></select></div></div>';
    strResult += '<div class="form-group"><label for="OldClaim" class="col-md-3 control-label">Old Claim</label><div class="col-md-9"><input type="text" class="form-control" id="OldClaim"></div></div>';
    strResult += '<div class="form-group"><label for="ClaimFrequency" class="col-md-3 control-label">Claim Frequency</label><div class="col-md-9"><input type="text" class="form-control" id="ClaimFrequency"></div></div>';
    strResult += '<div class="form-group"><label for="Revoked" class="col-md-3 control-label">Revoked</label><div class="col-md-9"><input type="text" class="form-control" id="Revoked"></div></div>';
    strResult += '<div class="form-group"><label for="MVR_PTS" class="col-md-3 control-label">Penalty Points</label><div class="col-md-9"><input type="text" class="form-control" id="MVR_PTS"></div></div>';
    strResult += '<div class="form-group"><label for="ClaimAmmount" class="col-md-3 control-label">Claim Ammount</label><div class="col-md-9"><input type="text" class="form-control" id="ClaimAmmount"></div></div>';
    strResult += '<div class="form-group"><label for="CarAge" class="col-md-3 control-label">Car Age</label><div class="col-md-9"><input type="text" class="form-control" id="CarAge"></div></div>';
    strResult += '<div class="form-group"><label for="ClaimFlag" class="col-md-3 control-label">Claim Flag</label><div class="col-md-9"><input type="text" class="form-control" id="ClaimFlag"></div></div>';
    strResult += '<div class="form-group"><label for="UrbanCity" class="col-md-3 control-label">Urban/City</label><div class="col-md-9"><select id="UrbanCity" class="form-control"><option value="Highly Urban/ Urban">Highly Urban/ Urban</option><option value="Highly Rural/ Rural">Highly Rural/ Rural</option></select></div></div>';    
    strResult += '<div class="form-group"><div class="col-md-offset-3 col-md-9"><input type="button" value="Add Driver" class="btn btn-sm btn-primary" onclick="addDriver();" />&nbsp;&nbsp;<input type="button" value="Cancel" class="btn btn-sm btn-primary" onclick="cancelChangeDriver();" /></div></div>';
    strResult += '</form></div>';
    $("#newdriverform").html(strResult);
    document.querySelector('#newdriverform').scrollIntoView({behavior: 'smooth'});

}

//Called by the editDriver function after driver data has been returned by the API.
//Create the form to edit a driver
function createEditDriverForm(driverArray)
{
    driver = driverArray[0];
    var DOB = new Date(driver.DOB);
    var strResult = '<div class="col-md-12">';
    strResult += '<form class="form-horizontal" role="form">';

    strResult += '<div class="form-group"><label for="Id" class="col-md-3 control-label">ID</label><div class="col-md-9"><input type="text" class="form-control" id="Id" value="' + driver.Id+ '"></div></div>';
    strResult += '<div class="form-group"><label for="KidsDrive" class="col-md-3 control-label">Kids Drive</label><div class="col-md-9"><input type="text" class="form-control" id="KidsDrive" value="' + driver.KidsDrive+ '"></div></div>';
    strResult += '<div class="form-group"><label for="DOBdateday" class="col-md-3 control-label">DOB</label><div class="col-md-1"><input type="text" class="form-control" id="DOBdateday" placeholder="dd" size="2" value="' + DOB.getDate() + '"></div><div class="col-md-1"><input type="text" class="form-control" id="DOBdatemonth" placeholder="mm" size="2" value="' + (DOB.getMonth() + 1) + '"></div><div class="col-md-1"><input type="text" class="form-control" id="DOBdateyear" placeholder="yyyy" size="4" value="' + DOB.getFullYear() + '"></div></div>';
    strResult += '<div class="form-group"><label for="Age" class="col-md-3 control-label">Age</label><div class="col-md-9"><input type="text" class="form-control" id="Age" value="' + driver.Age+ '"></div></div>';
    strResult += '<div class="form-group"><label for="HomeKids" class="col-md-3 control-label">HomeKids</label><div class="col-md-9"><input type="text" class="form-control" id="HomeKids" value="' + driver.HomeKids+ '"></div></div>';
    strResult += '<div class="form-group"><label for="YOJ" class="col-md-3 control-label">YOJ</label><div class="col-md-9"><input type="text" class="form-control" id="YOJ" value="' + driver.YOJ+ '"></div></div>';
    strResult += '<div class="form-group"><label for="Income" class="col-md-3 control-label">Income</label><div class="col-md-9"><input type="text" class="form-control" id="Income" value="' + driver.Income+ '"></div></div>';
    strResult += '<div class="form-group"><label for="Parent" class="col-md-3 control-label">Parent</label><div class="col-md-9"><select id="Parent" class="form-control"><option value="Yes">Yes</option><option value="No">No</option></select></div></div>';
    strResult += '<div class="form-group"><label for="HomeValue" class="col-md-3 control-label">HomeValue</label><div class="col-md-9"><input type="text" class="form-control" id="HomeValue" value="' + driver.HomeValue+ '"></div></div>';
    strResult += '<div class="form-group"><label for="MStatus" class="col-md-3 control-label">Marital Status</label><div class="col-md-9"><select id="MStatus" class="form-control"><option value="Yes">Yes</option><option value="No">No</option></select></div></div>';
    strResult += '<div class="form-group"><label for="Gender" class="col-md-3 control-label">Gender</label><div class="col-md-9"><select id="Gender" class="form-control"><option value="M">M</option><option value="F">F</option></select></div></div>';
    strResult += '<div class="form-group"><label for="Education" class="col-md-3 control-label">Education</label><div class="col-md-9"><select id="Education" class="form-control"><option value="High School">High School</option><option value="PhD">PhD</option><option value="Bachelors">Bachelors</option><option value="Masters">Masters</option></select></div></div>';
    strResult += '<div class="form-group"><label for="Occupation" class="col-md-3 control-label">Occupation</label><div class="col-md-9"><input type="text" class="form-control" id="Occupation" value="' + driver.Occupation+ '"></div></div>';
    strResult += '<div class="form-group"><label for="TravTime" class="col-md-3 control-label">TravTime</label><div class="col-md-9"><input type="text" class="form-control" id="TravTime" value="' + driver.TravTime+ '"></div></div>';
    strResult += '<div class="form-group"><label for="CarUse" class="col-md-3 control-label">CarUse</label><div class="col-md-9"><select id="CarUse" class="form-control"><option value="Private">Private</option><option value="Commercial">Commercial</option></select></div></div>';
    strResult += '<div class="form-group"><label for="BlueBook" class="col-md-3 control-label">BlueBook</label><div class="col-md-9"><input type="text" class="form-control" id="BlueBook" value="' + driver.BlueBook+ '"></div></div>';
    strResult += '<div class="form-group"><label for="TIF" class="col-md-3 control-label">TIF</label><div class="col-md-9"><input type="text" class="form-control" id="TIF" value="' + driver.TIF+ '"></div></div>';
    strResult += '<div class="form-group"><label for="CarType" class="col-md-3 control-label">CarType</label><div class="col-md-9"><select id="CarType" class="form-control"><option value="Pickup">Pickup</option><option value="Minivan">Minivan</option><option value="Sports Car">Sports Car</option><option value="Van">Van</option><option value="Panel Truck">Panel Truck</option><option value="SUV">SUV</option></select></div></div>';
    strResult += '<div class="form-group"><label for="RedCar" class="col-md-3 control-label">RedCar</label><div class="col-md-9"><select id="RedCar" class="form-control"><option value="Yes">Yes</option><option value="No">No</option></select></div></div>';
    strResult += '<div class="form-group"><label for="OldClaim" class="col-md-3 control-label">Old Claim</label><div class="col-md-9"><input type="text" class="form-control" id="OldClaim" value="' + driver.OldClaim+ '"></div></div>';
    strResult += '<div class="form-group"><label for="ClaimFrequency" class="col-md-3 control-label">Claim Frequency</label><div class="col-md-9"><input type="text" class="form-control" id="ClaimFrequency" value="' + driver.ClaimFrequency+ '"></div></div>';
    strResult += '<div class="form-group"><label for="Revoked" class="col-md-3 control-label">Revoked</label><div class="col-md-9"><input type="text" class="form-control" id="Revoked" value="' + driver.Revoked+ '"></div></div>';
    strResult += '<div class="form-group"><label for="MVR_PTS" class="col-md-3 control-label">Penalty Points</label><div class="col-md-9"><input type="text" class="form-control" id="MVR_PTS" value="' + driver.MVR_PTS+ '"></div></div>';
    strResult += '<div class="form-group"><label for="ClaimAmmount" class="col-md-3 control-label">Claim Ammount</label><div class="col-md-9"><input type="text" class="form-control" id="ClaimAmmount" value="' + driver.ClaimAmmount+ '"></div></div>';
    strResult += '<div class="form-group"><label for="CarAge" class="col-md-3 control-label">Car Age</label><div class="col-md-9"><input type="text" class="form-control" id="CarAge" value="' + driver.CarAge+ '"></div></div>';
    strResult += '<div class="form-group"><label for="ClaimFlag" class="col-md-3 control-label">Claim Flag</label><div class="col-md-9"><input type="text" class="form-control" id="ClaimFlag" value="' + driver.ClaimFlag+ '"></div></div>';
    strResult += '<div class="form-group"><label for="UrbanCity" class="col-md-3 control-label">Urban/City</label><div class="col-md-9"><select id="UrbanCity" class="form-control"><option value="Highly Urban/ Urban">Highly Urban/ Urban</option><option value="Highly Rural/ Rural">Highly Rural/ Rural</option></select></div></div>';    

    strResult += '<div class="form-group"><div class="col-md-offset-3 col-md-9"><input type="button" value="Edit Driver" class="btn btn-sm btn-primary" onclick="editDriverValues(' + driver.Id + ');" />&nbsp;&nbsp;<input type="button" value="Cancel" class="btn btn-sm btn-primary" onclick="cancelChangeDriver();" /></div></div>';
    strResult += '</form></div>';
    $("#newdriverform").html(strResult);

    $("#Parent").val(driver.Parent);
    $("#MStatus").val(driver.MStatus);
    $("#Gender").val(driver.Gender);
    $("#Education").val(driver.Education);
    $("#CarUse").val(driver.CarUse);
    $("#CarType").val(driver.CarType);
    $("#RedCar").val(driver.RedCar);
    $("#UrbanCity").val(driver.UrbanCity);

    document.querySelector('#newdriverform').scrollIntoView({behavior: 'smooth'});
}

//Called by Delete driver button in the table, prompts user to confirm deletion.
//Creates a model with the given title, body, button text and button function.
function runModal(title, body, buttonText, buttonFunction){

    $('#ModalLabel').text(title); 
    $('#ModalBody').text(body);
    $("#ModalConfirmButton").attr("onclick", buttonFunction);
    $("#ModalConfirmButton").text(buttonText);

    $('#Modal').modal('show')

    $('#Modal').on('shown.bs.modal', function () {
        $('#myInput').trigger('focus')})

}