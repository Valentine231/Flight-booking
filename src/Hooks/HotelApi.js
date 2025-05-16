const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '',
      'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
    }
  };
  
  fetch('https://hotels4.p.rapidapi.com/locations/v2/search?query=paris&locale=en_US&currency=USD', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
  