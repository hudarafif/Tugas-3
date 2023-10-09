const searchButton = document.getElementById('search-button')
const inputKeyword = document.getElementById('input')
const display = document.getElementById('display')

searchButton.addEventListener('click', async function() {
  const query = inputKeyword.value
  display.innerHTML = '';
  try {
    const reqdata = await fetch(`https://covid-193.p.rapidapi.com/statistics?country=${query}`,{
      method: 'GET',
	    headers: {
        'X-RapidAPI-Key': '23f0a5e01amsha395c4325d81974p1da7ecjsnedababe694e6',
		    'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
    }})
    
    const data = await reqdata.json()
    
    const { cases, deaths, tests} = data.response[0];
    console.log({cases , deaths, tests});
    
    const casesAktive = showdata(cases.active, "Aktive cases")
    const casesNew = showdata(cases.new, "New cases")
    const casesRecovered = showdata(cases.recovered, "Recovered cases")
    const casesTotal = showdata(cases.total, "Total cases")

    const totalDeaths = showdata(deaths.total, "Total Deaths")
    const totalTest = showdata(tests.total, "Total Test")

    console.log(cases.Total , deaths.total, );

    display.append(casesAktive, casesNew, casesRecovered, casesTotal, totalDeaths, totalTest)
  } 
  catch(error){
    console.log(error);
    // alert('Sorry Country Not Found')
    const dataError = document.createElement('p')
    dataError.innerText = 'Maaf Data tidak ditemukan';
    dataError.classList.add('text-lg', 'text-center', 'color-white', 'justify-items-center')
    display.appendChild(dataError)
  }
})

//data yang ditampilkan 
function showdata(data, tittle){
  document.querySelector('.country').innerHTML = inputKeyword.value
  const container = document.createElement('div')
  const tittleInput = document.createElement('p')
  const dataInput = document.createElement('p')

  container.classList.add('p-4', 'shadow-xl', 'text-center', 'bg-warning', 'text-xl')
  tittleInput.classList.add('p-4', 'font-bold', 'text-center')
  dataInput.classList.add('text-lg', 'text-center','text-black')

  tittleInput.innerText = tittle
  dataInput.innerText = data ? data : '-'
  container.append(tittleInput , dataInput)

  return container;

}



// button di kasi function
// bikin function buat hit ke api nya rapidapi pake fetch, string di taro di url nya
// data yg di dapet di render ke halaman web
