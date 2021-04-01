//Treehouse Techdegree: FSJS Project 2 - Data Pagination and Filtering
//by Cody Reynolds

let maxItemsPerPage = 9;

/**
 * Splits an array of student data into pages of up to 9 students per page.
 *
 * @param {array} list The set of student data
 * @param {number} page The page number, one for every 9 students
 */

function showPage(list, page) {
   //startIndex value of -1 on page 1, so list[0] included in the for loop
   let startIndex = (page * maxItemsPerPage) - (maxItemsPerPage + 1); 
   let endIndex = (page * maxItemsPerPage);

   let studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';

   for (let i = 0; i < list.length; i++) {
      if( i > startIndex && i < endIndex) {
         let studentItem = `
            <li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
                  <h3>${list[i].name.first} ${list[i].name.last}</h3>
                  <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${list[i].registered.date}</span>
               </div>
            </li>`;
         studentList.insertAdjacentHTML('beforeend', studentItem);
      }
   }
}

/**
 * Creates buttons for every page of student data. 
 * Clicking the buttons moves to the next or previous 9 students.
 * 
 * @param {array} list The set of student data
 */

function addPagination(list) {
   let numOfPages = Math.ceil(list.length / maxItemsPerPage); //Rounds up in case a page of fewer than 9 is needed
   let linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';

   for (i = 1; i <= numOfPages; i++){
      let button = `
         <li>
            <button type="button" class="page-button">${i}</button>
         </li>`;
      linkList.insertAdjacentHTML('beforeend', button);
   }

   let activeButton = document.querySelector('.page-button'); //Only one button can be 'active'
   activeButton.className = 'active';

   //changes the active page and button styling upon click
   linkList.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON' && e.target.className === 'page-button') {
         document.querySelector('.active').className = 'page-button';
         e.target.className = 'active';
         showPage(list, e.target.textContent);
      }
   });
}

addPagination(data);
showPage(data, 1);


//Extra Credit: Search functionality


//Adds search box to header
let header = document.querySelector('.header');
let searchBox = `
   <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button" id="submit"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>`;
header.insertAdjacentHTML('beforeend', searchBox);


/**
 * Checks the search box's input text against a list of students' full names 
 *
 * @param {string} searchCriteria The user's input text
 * @param {array} list The data set of names
 * @returns {array} matches an array of student objects that contain the input text.
 * 
 */

function getMatches(searchCriteria, list) {

   let matchList = [];

   for (i = 0; i < list.length; i++) {
      let fullName = `${list[i].name.first} ${list[i].name.last}`.toLowerCase();

      if (fullName.includes(searchCriteria.toLowerCase())) {
             matchList.push(list[i]);
          }
   } 
   return matchList;
}


/**
 * Filters the page to contain names that match the user's search text.
 *
 * @param {string} searchCriteria The user's input text
 */

function searchFunction(searchCriteria) {
   let matches = getMatches(searchCriteria, data);
   let studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';
   let linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';
   
   if(matches.length === 0) {
      studentList.innerHTML = `<div><h1>No results found</h1></div>`;
   } else {
      showPage(matches, 1);
      addPagination(matches);
   }
}


//listeners for keyup within the input box and clicks on the search magnifying glass button 
let search = document.querySelector('#search');
let submit = document.querySelector('#submit');

search.addEventListener('keyup', () => {
   searchFunction(search.value);
   });

submit.addEventListener('click', (e) => {
   e.preventDefault();
   searchFunction(search.value); 
    });