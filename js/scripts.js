var elPageMain = $_ ('#pageMain');

function createCinemaItem (itemFeatureTitle, itemFeatureText) {
  var item = document.createElement('li');
  item.setAttribute('class', 'mb-4');

  var cinemaItemFeatureTitle = document.createElement('span');
  cinemaItemFeatureTitle.setAttribute('class', 'font-weight-bold');
  cinemaItemFeatureTitle.textContent = itemFeatureTitle;

  item.appendChild(cinemaItemFeatureTitle);
  item.innerHTML += itemFeatureText;
  return item;
}

movies.forEach(function(movie) {
  var cinemaList = document.createElement('ul');
  cinemaList.setAttribute('class', 'list-unstyled w-50 mb-4');

  var keys = Object.keys(movie);
  cinemaList.appendChild(createCinemaItem(`${keys[0]}: `, movie.title));
  cinemaList.appendChild(createCinemaItem(`${keys[1]}: `, movie.year));
  cinemaList.appendChild(createCinemaItem(`${keys[2]}: `, movie.cast));
  cinemaList.appendChild(createCinemaItem(`${keys[3]}: `, movie.genres));

  elPageMain.appendChild(cinemaList);
});

