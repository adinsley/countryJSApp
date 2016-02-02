
var countries = [] 

var loadCountries = function(){

  for (var i = 0; i < countries.length;  i++){
  var countryName = document.createElement("option");
  countryName.innerText = countries[i].name;
  
  var countryList = document.querySelector("select");
  countryList.appendChild(countryName);
  }
}

var selectedName = function(){

  localStorage.currentCountry = {}
  var name = document.getElementById("s1").value
  var result = _.find(countries, function(o){return o.name === name;})
  localStorage.setItem('currentCountry', JSON.stringify(result) );
  countryInfo();
  
  
}

var countryInfo = function(){

  var result = JSON.parse(localStorage.getItem('currentCountry') ) 

  var countryTitle = document.querySelector(".country-name");
  countryTitle.innerText = result.name;

  var countryPopulation = document.querySelector(".population");
  countryPopulation.innerText = "Population: " + Number(result.population).toLocaleString();
  
  var countryCapital = document.querySelector(".capital");
  countryCapital.innerText = "Capital City: " + result.capital;

  var countryCurrency = document.querySelector(".currency");
  countryCurrency.innerText = "Currency: " + result.currencies;

  borderArray = result.borders;

  for(var i = 0; i < borderArray.length;  i++){
    var borderer = _.find(countries, function(o){return o.alpha3Code === borderArray[i];});
    //console.log(borderer)
    var bordering = document.createElement("p")
    bordering.style.display = "inline-block";
    bordering.style.padding = "10px"
    bordering.innerText = borderer.name;
    bordering.style.color ="red"

    var borderParent = document.querySelector(".borders");
    borderParent.appendChild(bordering);
  }  
}


window.onload = function(){
 
  
  var url = 'https://restcountries.eu/rest/v1';
  var request = new XMLHttpRequest();
  request.open("GET", url)

  request.onload = function(){
    if(request.status === 200){
      console.log('got the data')
      //console.log(request.responseText)
      countries = JSON.parse(request.responseText );
     
      loadCountries();
      countryInfo();
      selected = document.getElementById("s1")
      selected.onchange = selectedName;
    }
  }

  request.send(null)

};

