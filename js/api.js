const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
    // load data
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data))
}
searchBook();

const displaySearchResult = data => {
    // console.log(data);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    const docList = data.docs;
    console.log(docList);
    docList.forEach(doc => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div  class="card h-100 text-center">               
                <div class="card-body">
                    <h5 class="card-title">Title: ${doc.title}</h5>
                    <p class="card-text">Author Name:${doc.author_name[0]}</p>
                    <p class="card-text">Publisher: ${doc.publisher[0]}</p>  
                    <p class="card-text">Published Date: ${doc.publish_date[0]}</p>                                      
                </div>
                <div class = "card-footer">
                    <button class="btn btn-outline-primary" onclick="loadBookDetail('${doc.cover_i}')">Load More</button> 
                </div>
            </div>
            `;
            searchResult.appendChild(div);
    })
}
// Fetch team detail
const loadBookDetail = bookImg => {
    fetch(` https://covers.openlibrary.org/b/id/${bookImg}-M.jpg`)
    .then(res => res.json())
    .then(data => displayBookDetail(data))
}

// Display Book detail at the top
const displayBookDetail = (bookDetail) => {
    const book = bookDetail.docs[0];
    console.log(book);
    /* window.scrollTo(0, 40);
    const bookShow = document.getElementById('book-details');
    bookShow.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card','bg-dark','text-warning', 'text-center');
    div.innerHTML = `
    <div class="card-body">
        
    </div>
    `;
    bookShow.appendChild(div); */
}