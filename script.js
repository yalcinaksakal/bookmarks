const modal = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameEl = document.getElementById("website-name");
const websiteURLEl = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmarks-container");

// console.log(
//  modal ,
//  modalShow ,
//  modalClose ,
//  bookmarkForm ,
//  websiteNameEl ,
//  websiteURLEl ,
//  bookmarksContainer);

//Show modal, Focus on Input

function showModal() {
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
