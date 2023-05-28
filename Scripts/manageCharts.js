

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


function getProfessions(drivers)
{
    let professions = [];
    let professionCount = [];
    for(let i = 0; i < drivers.length; i++)
    {
        if(professions.includes(drivers[i].Occupation))
        {
            let index = professions.indexOf(drivers[i].Occupation);
            professionCount[index]++;
        }
        else
        {
            professions.push(drivers[i].Occupation);
            professionCount.push(1);
        }
    }
    return [professions, professionCount];
}



async function renderCharts(){

    const ctx = document.getElementById('myChart');

    data = await getAllDrivers();

    let professions = getProfessions(data);

    console.log(professions[0]);
    console.log(professions[1]);
      
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: professions[0],
    datasets: [{
      label: '# of Votes',
      data: professions[1],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

}

