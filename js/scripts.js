var elSearchForm = $_ ('#searchForm');
var elUserSearch = $_ ('#userSearch', elSearchForm);

var elPageMain = $_ ('#pageMain');


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

elSearchForm.addEventListener('submit', function (evt) {
  evt.preventDefault();

  var userSearch = elUserSearch.value.trim();

  var searchRegex = new RegExp(userSearch, 'gi');

  elPageMain.innerHTML = '';

  normalizedMovies.forEach(function(movie){
    if (movie.title.match(searchRegex)) {
      var cinemaList = createElement('ul', 'movies-list list-unstyled mb-4 bg-white rounded pt-3 shadow');

      cinemaList.appendChild(createCinemaItem('№: ', movie.id));
      cinemaList.appendChild(createCinemaItem('Title: ', movie.title));
      cinemaList.appendChild(createCinemaItem('Year: ', movie.year));
      cinemaList.appendChild(createCinemaItem('Category: ', movie.categories));
      cinemaList.appendChild(createCinemaItem('Summary: ', movie.summary));
      cinemaList.appendChild(createCinemaItem('IMDB id: ', movie.imdbId));
      cinemaList.appendChild(createCinemaItem('IMDB Reiting: ', movie.imdbRating));
      cinemaList.appendChild(createCinemaItem('Runtime: ', movie.runtime));
      cinemaList.appendChild(createCinemaItem('Language: ', movie.language));

      var cinemaTriller = document.createElement('a');
      cinemaTriller.href = `http://youtube.com/watch?v=${movie.youtubeId}`;
      cinemaTriller.target = '_blank';
      cinemaTriller.textContent = movie.youtubeId;
      cinemaList.appendChild(createCinemaItem('Triller: ', cinemaTriller));

      elPageMain.appendChild(cinemaList);
    }
  });

  if (elPageMain.innerHTML === '') {
    elPageMain.appendChild(createElement('p', 'text-white', 'Bunday titleli kino topilmadi'));
  }

});

