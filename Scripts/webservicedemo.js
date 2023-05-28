// jQuery functions to manipulate the main page and handle communication with
// the books web service via Ajax.
//
// Note that there is very little error handling in this file.  In particular, there
// is no validation in the handling of form data.  This is to avoid obscuring the 
// core concepts that the demo is supposed to show.


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
    $("#newbookform").html("");

}




function cancelChangeBook()
{
    $("#newbookform").html("");
}

function editDriver(bookId)
{
    $.ajax({
        url: '/drivers/' + bookId,
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

function editDriverkValues(bookId)
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
        success: function (data) {
            getAllDrivers();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
    });
    $("#newbookform").html("");

}

function deleteDriver(bookId)
{
    $.ajax({
        url: '/drivers/' + bookId,
        type: 'DELETE',
        dataType: 'json',
        success: function (data) {
            $(`#driverTable tbody tr:contains('${bookId}')`).remove();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
    });
}


async function createDriverTable()
{
    var loadingHTML = "<div id='loadingContainer'><img src='/Images/throbber.gif' width='100' height='100' ><br><br><p class='loadingtext'>LOADING...<br></p></div>";
    $("#allbooks").html(loadingHTML);

    books = await getAllDrivers();
    
    var strResult = '<div class="col-md-12">' + 
                    '<table  id="driverTable" class="table table-bordered table-hover">' +
                    '<thead>' +
                    '<tr>' +
                    '<th>ID</th>' +
                    '<th>KIDSDRIVE</th>' +
                    '<th>DateofBirth</th>' +
                    '<th>AGE</th>' +
                    '<th>HOMEKIDS</th>' +
                    '<th>YOJ</th>' +
                    '<th>INCOME</th>' +
                    '<th>PARENT</th>' +
                    '<th>HOME_VAL</th>' +
                    '<th>MSTATUS</th>' +
                    '<th>GENDER</th>' +
                    '<th>EDUCATION</th>' +
                    '<th>OCCUPATION</th>' +
                    '<th>TRAVTIME</th>' +
                    '<th>CAR_USE</th>' +
                    '<th>BLUEBOOK</th>' +
                    '<th>TIF</th>' +
                    '<th>CAR_TYPE</th>' +
                    '<th>RED_CAR</th>' +
                    '<th>OLDCLAIM</th>' +
                    '<th>CLM_FREQ</th>' +
                    '<th>REVOKED</th>' +
                    '<th>MVR_PTS</th>' +
                    '<th>CLM_AMT</th>' +
                    '<th>CAR_AGE</th>' +
                    '<th>CLAIM_FLAG</th>' +
                    '<th>Highly/Urban/Urban=====</th>' +  
                    '<th></th>' +  
                    '<th></th>' +                    
                    '</tr>' +
                    '</thead>' +
                    '<tbody>';
    $.each(books, function (index, book) 
    {   
        deleteAction = "runModal('Please Confirm', 'Are you sure you want to delete driver " + book.Id + "?', 'Delete', 'deleteDriver(" + book.Id + ")') "
        strResult +=  `<tr><td>`;
        strResult +=  + book.Id + "</td><td>" 
        + book.KidsDrive + "</td><td>" 
        + book.DOB + "</td><td>" 
        + book.Age + "</td><td>" 
        + book.HomeKids + "</td><td>" 
        + book.YOJ + "</td><td>" 
        + book.Income + "</td><td>" 
        + book.Parent + "</td><td>" 
        + book.HomeValue + "</td><td>" 
        + book.MStatus + "</td><td>" 
        + book.Gender + "</td><td>" 
        + book.Education + "</td><td>" 
        + book.Occupation + "</td><td>" 
        + book.TravTime + "</td><td>" 
        + book.CarUse + "</td><td>" 
        + book.BlueBook + "</td><td>" 
        + book.TIF + "</td><td>" 
        + book.CarType + "</td><td>" 
        + book.RedCar + "</td><td>" 
        + book.OldClaim + "</td><td>" 
        + book.ClaimFrequency + "</td><td>" 
        + book.Revoked + "</td><td>" 
        + book.MVR_PTS + "</td><td>" 
        + book.ClaimAmmount + "</td><td>" 
        + book.CarAge + "</td><td>" 
        + book.ClaimFlag + "</td><td>" 
        + book.UrbanCity + "</td><td>";        
        strResult += '<input type="button" value="Edit Driver" class="btn btn-sm btn-primary" onclick="editDriver(' + book.Id + ');" />';
        strResult += '</td><td>';
        strResult += '<input type="button" value="Delete Driver" class="btn btn-sm btn-primary" onclick="' + deleteAction + '" />';
        strResult += "</td></tr>";
        
    });
    strResult += "</tbody></table>";
    $("#allbooks").html(strResult);
    $('#driverTable').dynatable({
        features: {
            search: false // Disable the search box
        }
    });

    
}


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
    strResult += '<div class="form-group"><label for="Income" class="col-md-3 control-label">Income</label><div class="col-md-9"><div class="input-group-prepend"><span class="input-group-text">£</span></div><input type="text" class="form-control" id="Income"></div></div>';
    strResult += '<div class="form-group"><label for="Parent" class="col-md-3 control-label">Parent</label><div class="col-md-9"><select id="Parent" class="form-control"><option value="Yes">Yes</option><option value="No">No</option></select></div></div>';
    strResult += '<div class="form-group"><label for="HomeValue" class="col-md-3 control-label">HomeValue</label><div class="col-md-9"><div class="input-group-prepend"><span class="input-group-text">£</span></div><input type="text" class="form-control" id="HomeValue"></div></div>';
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
    strResult += '<div class="form-group"><label for="MVR_PTS" class="col-md-3 control-label">MVR_PTS</label><div class="col-md-9"><input type="text" class="form-control" id="MVR_PTS"></div></div>';
    strResult += '<div class="form-group"><label for="ClaimAmmount" class="col-md-3 control-label">Claim Ammount</label><div class="col-md-9"><input type="text" class="form-control" id="ClaimAmmount"></div></div>';
    strResult += '<div class="form-group"><label for="CarAge" class="col-md-3 control-label">Car Age</label><div class="col-md-9"><input type="text" class="form-control" id="CarAge"></div></div>';
    strResult += '<div class="form-group"><label for="ClaimFlag" class="col-md-3 control-label">Claim Flag</label><div class="col-md-9"><input type="text" class="form-control" id="ClaimFlag"></div></div>';
    strResult += '<div class="form-group"><label for="UrbanCity" class="col-md-3 control-label">Urban/City</label><div class="col-md-9"><select id="UrbanCity" class="form-control"><option value="Highly Urban/ Urban">Highly Urban/ Urban</option><option value="Highly Rural/ Rural">Highly Rural/ Rural</option></select></div></div>';    
    strResult += '<div class="form-group"><div class="col-md-offset-3 col-md-9"><input type="button" value="Add Driver" class="btn btn-sm btn-primary" onclick="addDriver();" />&nbsp;&nbsp;<input type="button" value="Cancel" class="btn btn-sm btn-primary" onclick="cancelChangeBook();" /></div></div>';
    strResult += '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">$</span></div><input type="text" class="form-control" aria-label="Amount (to the nearest dollar)"><div class="input-group-append"><span class="input-group-text">.00</span></div></div>';
    strResult += '</form></div>';
    $("#newbookform").html(strResult);


}

function createEditDriverForm(driver)
{
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
    strResult += '<div class="form-group"><label for="MVR_PTS" class="col-md-3 control-label">MVR_PTS</label><div class="col-md-9"><input type="text" class="form-control" id="MVR_PTS" value="' + driver.MVR_PTS+ '"></div></div>';
    strResult += '<div class="form-group"><label for="ClaimAmmount" class="col-md-3 control-label">Claim Ammount</label><div class="col-md-9"><input type="text" class="form-control" id="ClaimAmmount" value="' + driver.ClaimAmmount+ '"></div></div>';
    strResult += '<div class="form-group"><label for="CarAge" class="col-md-3 control-label">Car Age</label><div class="col-md-9"><input type="text" class="form-control" id="CarAge" value="' + driver.CarAge+ '"></div></div>';
    strResult += '<div class="form-group"><label for="ClaimFlag" class="col-md-3 control-label">Claim Flag</label><div class="col-md-9"><input type="text" class="form-control" id="ClaimFlag" value="' + driver.ClaimFlag+ '"></div></div>';
    strResult += '<div class="form-group"><label for="UrbanCity" class="col-md-3 control-label">Urban/City</label><div class="col-md-9"><select id="UrbanCity" class="form-control"><option value="Highly Urban/ Urban">Highly Urban/ Urban</option><option value="Highly Rural/ Rural">Highly Rural/ Rural</option></select></div></div>';    

    strResult += '<div class="form-group"><div class="col-md-offset-3 col-md-9"><input type="button" value="Edit Driver" class="btn btn-sm btn-primary" onclick="editDriverkValues(' + driver.Id + ');" />&nbsp;&nbsp;<input type="button" value="Cancel" class="btn btn-sm btn-primary" onclick="cancelChangeBook();" /></div></div>';
    strResult += '</form></div>';
    $("#newbookform").html(strResult);

    $("#Parent").val(driver.Parent);
    $("#MStatus").val(driver.MStatus);
    $("#Gender").val(driver.Gender);
    $("#Education").val(driver.Education);
    $("#CarUse").val(driver.CarUse);
    $("#CarType").val(driver.CarType);
    $("#RedCar").val(driver.RedCar);
    $("#UrbanCity").val(driver.UrbanCity);
}

function createEditBookForm(book)
{
    var publishDate = new Date(book.PublishDate);
    var strResult = '<div class="col-md-12">';
    strResult += '<form class="form-horizontal" role="form">';
    strResult += '<div class="form-group"><label for="booktitle" class="col-md-3 control-label">Book Title</label><div class="col-md-9"><input type="text" class="form-control" id="booktitle" value="' + book.Title + '" ></div></div>';
    strResult += '<div class="form-group"><label for="bookauthor" class="col-md-3 control-label">Author</label><div class="col-md-9"><input type="text" class="form-control" id="bookauthor" value="' + book.Author + '" ></div></div>';
    strResult += '<div class="form-group"><label for="bookdesc" class="col-md-3 control-label">Description</label><div class="col-md-9"><input type="text" class="form-control" id="bookdesc"  value="' + book.Description + '" ></div></div>';
    strResult += '<div class="form-group"><label for="bookgenre" class="col-md-3 control-label">Genre</label><div class="col-md-9"><input type="text" class="form-control" id="bookgenre" value="' + book.Genre + '" ></div></div>';
    strResult += '<div class="form-group"><label for="bookdateday" class="col-md-3 control-label">Publication Date</label><div class="col-md-1"><input type="text" class="form-control" id="bookdateday" placeholder="dd" size="2" value="' + publishDate.getDate() + '"> </div><div class="col-md-1"><input type="text" class="form-control" id="bookdatemonth" placeholder="mm" size="2" value="' + (publishDate.getMonth() + 1) + '"></div><div class="col-md-1"><input type="text" class="form-control" id="bookdateyear" placeholder="yyyy" size="4" value="' + publishDate.getFullYear() + '"></div></div>';
    strResult += '<div class="form-group"><label for="bookprice" class="col-md-3 control-label">Price</label><div class="col-md-9"><input type="text" class="form-control" id="bookprice" value="' + book.Price + '" ></div></div>';
    
    strResult += '<div class="form-group"><div class="col-md-offset-3 col-md-9"><input type="button" value="Edit Book" class="btn btn-sm btn-primary" onclick="editBookValues(' + book.BookId + ');" />&nbsp;&nbsp;<input type="button" value="Cancel" class="btn btn-sm btn-primary" onclick="cancelChangeBook();" /></div></div>';
    strResult += '</form></div>';
    $("#newbookform").html(strResult);

}

function runModal(title, body, buttonText, buttonFunction){


    console.log("runModal");
    $('#ModalLabel').text(title); 
    $('#ModalBody').text(body);
    $("#ModalConfirmButton").attr("onclick", buttonFunction);
    $("#ModalConfirmButton").text(buttonText);

    $('#Modal').modal('show')


    $('#Modal').on('shown.bs.modal', function () {
        $('#myInput').trigger('focus')})

}