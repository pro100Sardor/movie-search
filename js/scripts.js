var elSearchForm = $_ ('#searchForm');
var elUserSearch = $_ ('#userSearch', elSearchForm);

var elPageMain = $_ ('#pageMain');
var elMoviesList = $_ ('#moviesList', elPageMain);


// for the convenience of the tester :)
var elMoviesTitleList = $_ ('#moviesTitleList', elPageMain);


var normalizedMovies = movies.map(function (movie, i) {
  return {
    id: i + 1,
    title: movie.Title.toString(),
    year: movie.movie_year,
    categories: movie.Categories.split('|'),
    summary: movie.summary,
    imdbId: movie.imdb_id,
    imdbRating: movie.imdb_rating,
    runtime: movie.runtime,
    language: movie.language,
    youtubeId: movie.ytid
  }
});

function createCinemaItem (itemFeatureTitle, itemFeatureText) {
  var item = createElement('li', 'mb-4 px-3');

  var cinemaItemFeatureTitle = createElement ('span', 'font-weight-bold', itemFeatureTitle);

  item.appendChild(cinemaItemFeatureTitle);
  item.innerHTML += itemFeatureText;
  return item;
}


// this part has nothing to do with logic, only for the convenience of the tester
function copyToClipboard(copyItemId) {
  var copyText = document.querySelector(`#${copyItemId}`);
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand('copy');

  // var tooltip = document.getElementById('titleTooltip');
  // tooltip.innerHTML = 'Copied: ' + copyText.value;
}

// function outFunc() {
//   var tooltip = document.getElementById('titleTooltip');
//   tooltip.innerHTML = 'Copy to clipboard';
// }

normalizedMovies.forEach(function(movie){

  var item = createElement('li', 'mb-4 px-3');

  var itemTitle = createElement('span', 'font-weight-bold', 'Title: ');
  item.appendChild(itemTitle);

  var itemText = document.createElement('span');
  itemText.id = `title${movie.id}`;
  itemText.textContent = movie.title;
  item.appendChild(itemText);

  var itemCopyButton = createElement('button', 'btn movies-title-list__copy-button ml-3');
  itemCopyButton.setAttribute('onclick', `copyToClipboard(${itemText.id})`);
  // itemCopyButton.setAttribute('onmouseout', 'outFunc()');
  item.appendChild(itemCopyButton);

  elMoviesTitleList.appendChild(item);
});



elSearchForm.addEventListener('submit', function (evt) {
  evt.preventDefault();

  var userSearch = elUserSearch.value.trim();

  elMoviesList.innerHTML = '';

  if (!isInputEmpty(userSearch)) {

    var searchRegex = new RegExp(userSearch, 'gi');

    normalizedMovies.forEach(function(movie){

      if (movie.title.match(searchRegex)) {

        elMoviesList.appendChild(createCinemaItem('№: ', movie.id));
        elMoviesList.appendChild(createCinemaItem('Title: ', movie.title));
        elMoviesList.appendChild(createCinemaItem('Year: ', movie.year));
        elMoviesList.appendChild(createCinemaItem('Category: ', movie.categories));
        elMoviesList.appendChild(createCinemaItem('Summary: ', movie.summary));
        elMoviesList.appendChild(createCinemaItem('IMDB id: ', movie.imdbId));
        elMoviesList.appendChild(createCinemaItem('IMDB Reiting: ', movie.imdbRating));
        elMoviesList.appendChild(createCinemaItem('Runtime: ', movie.runtime));
        elMoviesList.appendChild(createCinemaItem('Language: ', movie.language));

        var cinemaTriller = document.createElement('a');
        cinemaTriller.href = `http://youtube.com/watch?v=${movie.youtubeId}`;
        cinemaTriller.target = '_blank';
        cinemaTriller.textContent = movie.youtubeId;
        elMoviesList.appendChild(createCinemaItem('Triller: ', cinemaTriller));
      }
    });

    if (elMoviesList.innerHTML === '') {
      elMoviesList.appendChild(createElement('li', 'text-danger px-3', 'No movie with this title was found'));
    }
  } else {
    elMoviesList.appendChild(createElement('li', 'text-danger px-3', 'No information was entered in the search field'));
  }
});


