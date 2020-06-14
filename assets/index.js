//---- Fetch API - https://hr.oat.taocloud.org/api/
let inputSearch = document.querySelector('#search');
let responseData = document.querySelector('#data-details');

// Listening if a key is pressed to start entering symbols for search
inputSearch.addEventListener('keyup', function() {
  setTimeout( gettingSearchParam, 300 )
});

// Getting search parameter to request and invocation fetch request
let gettingSearchParam = () => {
  let searchParam = inputSearch.value;
  let fetchUrl = 'https://hr.oat.taocloud.org/v1/users?name=' +  searchParam + '&limit=20&offset=0';
  fetchData(fetchUrl);
}

// The fetch-request itself
const fetchData = (url) => {
  fetch(url)
    .then(response => response.json())
    .then((data) => {
      if( isError(data) ) {
        return;        
      }
      if(data) {
        showResult(data);
      } 
    })
}

// Check if the data came
let isError = (searchList) => {
  let errorMessage = document.querySelector('#error-message');
  let dataSearchLength = searchList ? searchList.length : 0; 
  errorMessage.innerText = '';
  
  if(!dataSearchLength) {
    errorMessage.innerText = 'The enter data is not correct';
    return true;
  }
  return false;
};

// Output additional data for the selected instance
let showResult = (searchList) =>  {
  let searchValue = inputSearch.value;
  let resultCount = document.querySelector('.users-count span');
  let users = '';

  if(searchValue) {
    for ( let i = 0; i < searchList.length; i += 1 ) {
      users += '<div class=\'user\'>' + searchList[i].firstName + '&nbsp;' + searchList[i].lastName + '<span>&nbsp;(userId: ' + searchList[i].userId + ')</span>' + '</div>';
    }
    responseData.innerHTML = users;
    resultCount.innerText = searchList.length;
  }
}