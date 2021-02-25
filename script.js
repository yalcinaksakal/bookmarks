const modal = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const bookmarkForm = document.getElementById("bookmark-form");

const websiteNameEl = document.getElementById("website-name");
const websiteURLEl = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmarks-container");

const formInputFields = document.getElementsByTagName("input");

//Show modal, Focus on Input

let bookmarks = {};

function showModal() {
  websiteNameEl.placeholder = websiteURLEl.placeholder = "";
  bookmarkForm.reset();
  modal.classList.add("show-modal");
  websiteNameEl.focus();
}

window.addEventListener("click", function (e) {
  const clickedClose = e.target.closest(".close-icon");
  const clickedAddBookmark = e.target.closest("#show-modal");
  // clicked close or clicked element equals to #modal(clicked outside) then close
  if (clickedClose || e.target === modal) {
    modal.classList.remove("show-modal");
    return;
  }
  //else open modal
  if (clickedAddBookmark) showModal();
});

// if form is not valid put necessary correction msgs to input fields
function inputText(inputEl, msg = "") {
  inputEl.value = "";
  inputEl.placeholder = msg;
  inputEl.focus();
}
//url check
function validate(urlValue) {
  const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(expression);
  if (!urlValue.match(regex)) {
    inputText(
      formInputFields[1],
      urlValue + " is not valid. Please provide a valid web adress"
    );
    return false;
  }
  return true;
}

function isFormValid(nameValue, urlValue) {
  if (!urlValue) {
    inputText(formInputFields[1], "Please provide a valid web adress");
    return false;
  }

  if (!urlValue.includes("http://") && !urlValue.includes("https://"))
    urlValue = `https://${urlValue}`;

  if (!validate(urlValue)) return false;

  websiteURLEl.value = urlValue;

  if (!nameValue) {
    inputText(formInputFields[0], "Please name your bookmark");
    return false;
  }
  return true;
}

function buildBookmarks() {
  //reset container
  bookmarksContainer.textContent = "";
  //create items
  Object.keys(bookmarks).forEach(id => {
    const { name, url } = bookmarks[id];
    //ITEM
    const item = document.createElement("div");
    item.classList.add("item");
    //Close icon
    const closeIcon = document.createElement("i");
    closeIcon.classList.add("fas", "fa-times");
    closeIcon.setAttribute("title", "Delete Bookmark");
    closeIcon.setAttribute("onclick", `deleteBookmark('${url}')`);
    //Favicon Link container
    const linkInfo = document.createElement("div");
    linkInfo.classList.add("name");
    //Favicon
    const favicon = document.createElement("img");
    favicon.setAttribute(
      "src",
      `https://s2.googleusercontent.com/s2/favicons?domain=${url}`
    );
    favicon.setAttribute("alt", "Favicon");

    //Link
    const link = document.createElement("a");
    link.setAttribute("href", `${url}`);
    link.setAttribute("target", "_blank");
    link.textContent = name;

    //append to bookmarks container
    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);
    bookmarksContainer.appendChild(item);
  });
}

function fetchBookmarks() {
  const storage = JSON.parse(localStorage.getItem("bookmarks"));
  //if null make it empty
  if (!storage) storage = {};

  if (Object.keys(storage).length > 0) bookmarks = storage;
  else
    bookmarks["https://youtube.com"] = {
      name: "Youtube",
      url: "https://youtube.com",
    };

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  buildBookmarks();
}

//on load
fetchBookmarks();

function deleteBookmark(id) {
  if (bookmarks[id]) delete bookmarks[id];

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  buildBookmarks();
}

function storeBookmark(e) {
  e.preventDefault();
  if (!isFormValid(websiteNameEl.value, websiteURLEl.value)) return;

  if (bookmarks[websiteURLEl.value]) {
    inputText(websiteURLEl, websiteURLEl.value + " is already bookmarked");
    return;
  }

  bookmarks[websiteURLEl.value] = {
    name: websiteNameEl.value,
    url: websiteURLEl.value,
  };
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  modal.classList.remove("show-modal");
  buildBookmarks();
}

bookmarkForm.addEventListener("submit", storeBookmark);
