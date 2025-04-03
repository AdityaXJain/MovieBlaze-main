const API_KEY = "3fd2be6f0c70a2a598f084ddfb75487c";
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
const YOUTUBE_SEARCH_URL = "https://www.youtube.com/results?search_query=";
const POPULAR_API = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=1`;
const TOP_RATED_API = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=1`;
const UPCOMING_API = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=1`;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const navLinks = document.querySelectorAll('.nav-link');

// New elements
const authLink = document.getElementById('auth-link');
const authModal = document.getElementById('auth-modal');
const closeModal = document.querySelector('.close');
const authForm = document.getElementById('auth-form');
const authMessage = document.getElementById('auth-message');
const userProfile = document.getElementById('user-profile');
const userName = document.getElementById('user-name');
const logoutBtn = document.getElementById('logout-btn');
const movieDetails = document.getElementById('movie-details');
const movieTitle = document.getElementById('movie-title');
const movieInfo = document.getElementById('movie-info');
const addToWatchlistBtn = document.getElementById('add-to-watchlist');
const markAsFavoriteBtn = document.getElementById('mark-as-favorite');
const reviewForm = document.getElementById('review-form');
const reviewsList = document.getElementById('reviews-list');
const recommendationsSection = document.getElementById('recommendations');
const recommendationsList = document.getElementById('recommendations-list');
const themeToggle = document.getElementById('theme-toggle');

let currentUser = null;

const showLoading = () => {
  main.innerHTML = '<div class="loading">Loading...</div>';
};

const getClassByRate = (vote) => {
  if (vote >= 8) return "green";
  else if (vote >= 7) return "lime";
  else if (vote >= 5) return "orange";
  else if (vote >= 3) return "red";
  else return "dark-red";
};

const showMovies = async (movies) => {
  if (!movies.length) {
    main.innerHTML = '<div class="no-results">No movies found</div>';
    return;
  }

  main.innerHTML = "";
  movies.forEach(async (movie) => {
    const { title, poster_path, vote_average, overview, id, release_date } = movie;
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");

    const posterUrl = poster_path 
      ? IMG_PATH + poster_path 
      : 'placeholder-image.jpg';

    let movieDetails;
    try {
      movieDetails = await getMovieDetails(id);
    } catch (error) {
      console.error(`Error fetching details for ${title}:`, error);
      movieDetails = { providers: [] };
    }

    const trailerUrl = YOUTUBE_SEARCH_URL + encodeURIComponent(`${title} trailer`);
    const ottLinks = movieDetails.providers.map(provider => 
      `<p>${provider.link} ${provider.name}</p>`).join(" ");

    movieElement.innerHTML = `
    <img
      src="${posterUrl}"
      alt="${title}"
    />
    <div class="movie-info">
      <h3>${title}</h3>
      <span class="${getClassByRate(vote_average)}">⭐${vote_average.toFixed(1)}</span>
    </div>
    <div class="overview">
      <h3>Overview</h3>
      ${overview}
      <p><strong>Release Year:</strong> ${release_date.split("-")[0]}</p>
      <p><strong>Available on:</strong> ${ottLinks || "Not Available"}</p>
      <button class="trailer-btn" onclick="window.open('${trailerUrl}', '_blank')">Watch Trailer</button>
    </div>
  `;
    movieElement.addEventListener('click', () => {
      showMovieDetails(movie);
      showRecommendations(movies.slice(0, 5)); // Show first 5 movies as recommendations
    });
    main.appendChild(movieElement);
  });
};

const getMovieDetails = async (movieId) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=watch/providers`,
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();

    const providers = (data['watch/providers']?.results?.IN?.flatrate || [])
      .map(provider => ({
        name: provider.provider_name,
        link: provider.provider_link || "#"
      }));

    return { providers };
  } catch (error) {
    console.error(`Error fetching movie ${movieId}:`, error);
    return { providers: [] };
  }
};

const getMovies = async (url) => {
  try {
    showLoading();
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    showMovies(data.results);
  } catch (error) {
    console.error('Error fetching movies:', error);
    main.innerHTML = '<div class="error">Failed to load movies. Please try again later.</div>';
  }
};

getMovies(API_URL);

let searchTimeout;
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value.trim();
  
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    if (searchTerm) {
      getMovies(SEARCH_API + encodeURIComponent(searchTerm));
      search.value = "";
    } else {
      getMovies(API_URL);
    }
  }, 300);
});

const handleSectionClick = (e) => {
  e.preventDefault();
  const section = e.target.dataset.section;
  
  // Remove active class from all links
  navLinks.forEach(link => link.classList.remove('active'));
  // Add active class to clicked link
  e.target.classList.add('active');
  
  // Determine which API URL to use
  let apiUrl;
  switch(section) {
    case 'popular':
      apiUrl = POPULAR_API;
      break;
    case 'top-rated':
      apiUrl = TOP_RATED_API;
      break;
    case 'upcoming':
      apiUrl = UPCOMING_API;
      break;
    default:
      apiUrl = API_URL;
  }
  
  getMovies(apiUrl);
};

navLinks.forEach(link => {
  link.addEventListener('click', handleSectionClick);
});

// User Authentication
authLink.addEventListener('click', () => {
  authModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
  authModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === authModal) {
    authModal.style.display = 'none';
  }
});

authForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  // Here you would typically send a request to your backend for authentication
  // For this example, we'll just simulate a successful login
  currentUser = { email, name: email.split('@')[0] };
  authMessage.textContent = 'Login successful!';
  setTimeout(() => {
    authModal.style.display = 'none';
    updateUserProfile();
  }, 1000);
});

logoutBtn.addEventListener('click', () => {
  currentUser = null;
  updateUserProfile();
});

function updateUserProfile() {
  if (currentUser) {
    userProfile.classList.remove('hidden');
    userName.textContent = currentUser.name;
    authLink.classList.add('hidden');
  } else {
    userProfile.classList.add('hidden');
    authLink.classList.remove('hidden');
  }
}

// Movie Details and User Interactions
function showMovieDetails(movie) {
  movieTitle.textContent = movie.title;
  movieInfo.innerHTML = `
    <p><strong>Release Date:</strong> ${movie.release_date}</p>
    <p><strong>Rating:</strong> ${movie.vote_average}</p>
    <p><strong>Overview:</strong> ${movie.overview}</p>
  `;
  movieDetails.classList.remove('hidden');
}

addToWatchlistBtn.addEventListener('click', () => {
  if (currentUser) {
    // Here you would typically send a request to your backend to add the movie to the user's watchlist
    alert('Movie added to watchlist!');
  } else {
    alert('Please log in to add movies to your watchlist.');
  }
});

markAsFavoriteBtn.addEventListener('click', () => {
  if (currentUser) {
    // Here you would typically send a request to your backend to mark the movie as a favorite
    alert('Movie marked as favorite!');
  } else {
    alert('Please log in to mark movies as favorites.');
  }
});

reviewForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (currentUser) {
    const reviewText = document.getElementById('review-text').value;
    const rating = document.getElementById('rating').value;
    // Here you would typically send a request to your backend to save the review
    addReview(currentUser.name, reviewText, rating);
    reviewForm.reset();
  } else {
    alert('Please log in to submit a review.');
  }
});

function addReview(userName, text, rating) {
  const reviewElement = document.createElement('div');
  reviewElement.classList.add('review');
  reviewElement.innerHTML = `
    <p><strong>${userName}</strong> rated it ${rating} star(s)</p>
    <p>${text}</p>
  `;
  reviewsList.appendChild(reviewElement);
}

// Movie Recommendations
function showRecommendations(movies) {
  recommendationsList.innerHTML = '';
  movies.forEach(movie => {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');
    movieElement.innerHTML = `
      <img src="${IMG_PATH + movie.poster_path}" alt="${movie.title}">
      <div class="movie-info">
        <h3>${movie.title}</h3>
        <span class="${getClassByRate(movie.vote_average)}">
          ${movie.vote_average}
        </span>
      </div>
    `;
    recommendationsList.appendChild(movieElement);
  });
  recommendationsSection.classList.remove('hidden');
}

// Theme Toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

