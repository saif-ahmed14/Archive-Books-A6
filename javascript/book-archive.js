// Global button and variable
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('search-btn');
const error = document.getElementById('error');
const bookContainer = document.getElementById('book-container');
const spinner = document.getElementById('spinner');
const outputCount = document.getElementById('output-count');

//Add event listener
searchBtn.addEventListener('click', function () {
    const search = searchInput.value;

    //Clear field
    searchInput.value = '';
    bookContainer.textContent = '';
    outputCount.textContent = '';
    error.textContent = '';

    if (search.length <= 0) {
        error.innerHTML = "Sorry! Please search with a valid book name!";
    }

    else {
        spinner.classList.remove('d-none');
        const url = `https://openlibrary.org/search.json?q=${search}`;
        loadData(url, search);
    }
});

//Load data
const loadData = async (url, search) => {
    const res = await fetch(url);
    const data = await res.json();

    //Remove loader
    spinner.classList.add('d-none');
    if (data.numFound === 0) {
        error.innerHTML = `Invalid search! No data found related to - <b class='fs-2 text-light'>"${search}"</b>`
    }

    else {
        showBooks(data);
    }
}

const showBooks = books => {
    const { numFound } = books;
    outputCount.innerHTML = `<p>Total Books Found - ${numFound} | Showing Result - ${books.docs.length}<p>`;
    books.docs.forEach(element => {
        const div = document.createElement('div');
        div.classList.add('col');

        //cover image url generate
        const img = element.cover_i ? `<img src="https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg" class="card-img-top" alt=""/>` : '<img src="images/unavailable2.png" class="card-img-top" alt=""/>';
        
        //Append books
        div.innerHTML = `
            <div class='card p-2 h-100'>
                <div class="image-thumbnail overflow-hidden">
                    ${img}
                </div>                          
                <div class="p-2 d-flex justify-content-between d-md-block">
                    <h4>${element.title}</h4>
                    <small>Author: <span class='text-info'>${element?.author_name}</span></small>
                    <p>Language: ${element.language ? element?.language : 'NA'}<p>
                    <p>First Publish: ${element.first_publish_year ? element.first_publish_year : 'N/A'}<p>
                    <p>Publisher: ${element ? element.publisher : 'N/A'}<p>
                    <button class="btn btn-secondary">Learn More</button>
                </div>
            </div>
        `;
        bookContainer.appendChild(div);
    });
}