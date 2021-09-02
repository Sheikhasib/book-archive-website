document.getElementById('error-message').style.display = 'none';
document.getElementById('spinner').style.display = 'none';
document.getElementById('book-details').textContent = '';
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
    // Handle empty search request
    if (searchText === '') {
        displayError();
    }
    else{
        // Display Spinner
        document.getElementById('spinner').style.display = 
        'block';
        // Hide Search Result
        document.getElementById('books').style.display = 'none';
        // Hide error
        document.getElementById('error-message').style.display = 'none';
        // Clear Books Details
        document.getElementById('book-details').textContent = '';
        // Clear Search Result
        document.getElementById('search-result').textContent ='';
        // load data
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        console.log(url);
        fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data));
        
    }
    
};
const displaySearchResult = books => {
    console.log(books);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    const bookList = books.docs;
    console.log(bookList);
    if(bookList === null){
        displayError();
    }
    else{
        document.getElementById('error-message').style.display = 'none';
        document.getElementById('spinner').style.display = 'none';
        document.getElementById('books').style.display = 'block';
        document.getElementById('book-numbers').innerText = `Books Found ${bookList.length}`;
        bookList.forEach(book => {
            // console.log(book);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div  class="card h-100 text-center">  
                    <img src="https://covers.openlibrary.org/b/id/${book?.cover_i}-M.jpg" class="w-50 h-50 mx-auto" alt="...">            
                    <div class="card-body">
                        <h5 class="card-title">Title: ${book.title}</h5>
                        <p class="card-text">Author Name:${book.author_name[0]}</p>
                        <p class="card-text">Publisher: ${book.publisher[0]}</p>  
                        <p class="card-text">Published Date: ${book.publish_date[0]}</p>                                      
                    </div>
                    <div class = "card-footer">
                        <button class="btn btn-outline-primary" onclick="loadBookDetail(${book.cover_i})">Load More</button> 
                    </div>
                </div>
                `;
                searchResult.appendChild(div);
        });
    }   
};
// Fetch team detail
const loadBookDetail = bookImg => {
    const url = `https://covers.openlibrary.org/b/id/${bookImg}-M.jpg`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayBookDetail(data.docs[0]));
};
const displayBookDetail = book => {
    console.log(book);
    const bookShow = document.getElementById('book-details');
    bookShow.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card','bg-dark','text-warning', 'text-center');
    div.innerHTML = `
    <img src="https://covers.openlibrary.org/b/id/${book?.cover_i}-M.jpg" class="card-img-top" alt="..."> 
    <div class="card-body">
        <h5 class="card-title">Title: ${book.title}</h5>
        <p class="card-text">Author Name:${book.author_name[0]}</p>
        
    </div>
    `;
    bookShow.appendChild(div);
};
