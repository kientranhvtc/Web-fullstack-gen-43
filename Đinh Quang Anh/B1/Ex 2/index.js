/*
Bài tập 2 : Xây dựng trang booklist

Các chức năng cần có:
-> Thêm sách mới (Title, Author, Isbn - Mã sách)
-> Hiển thị danh sách các sách đã thêm

Gợi ý các kỹ thuật sử dụng
-> ES6 (Class, Arrow, Template string, Object)
-> localStorage
-> DOM
-> document function (querySelector, addEventListener, createElement, appendChild, querySelectorAll)
*/

// localStorage.setItem("aaa", `{"1":1,"2":2,"3":"3"}`);
// let check = localStorage.getItem("aaa");
// check = JSON.parse(check);
// console.log(check);

// setup materialize components
document.addEventListener("DOMContentLoaded", () => {
  let modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);
});

class Book {
  title;
  author;
  id;
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = uuid.v4();
  }
}
class BookCase {
  data = {};
  constructor(data) {
    this.data = data;
  }
  add() {
    let dataMain = this.data;
    let title = document.querySelector(`[data-type="title"]`).value;
    let author = document.querySelector(`[data-type="author"]`).value;
    console.log(title, author);
    let newBook = new Book(title, author);
    let lengthData = Object.keys(dataMain).length;
    console.log(lengthData);
    dataMain[`${lengthData}`] = newBook;
    this.setLocal();
    this.render();
  }

  render() {
    console.log(this.data);
    let dataMain = localStorage.getItem("BookCase");
    dataMain = JSON.parse(dataMain);
    console.log(dataMain);
    let strInner = "";
    for (let i = 0; i < Object.keys(dataMain).length; i++) {
      strInner += `<li class="collection-item">
                    <div>${dataMain[`${i}`].title}</div>
                    <br>
                    <div>${dataMain[`${i}`].author}</div>
                  </li>`;
    }
    mainList.innerHTML = strInner;
  }

  setLocal() {
    localStorage.setItem("BookCase", JSON.stringify(this.data));
  }
}

var mainList = document.querySelector("#main-list");
let dataBookCaseLocal = localStorage.getItem("BookCase");
let dataBookCase = {};
let bookCase = new BookCase(dataBookCase);
if (dataBookCaseLocal !== null) {
  dataBookCase = JSON.parse(dataBookCaseLocal);
  bookCase = new BookCase(dataBookCase);
  bookCase.render();
}

const addModal = document.querySelector("#add-modal")
const addKey = document.querySelector("#add-book");

addKey.addEventListener("click", () => {
  bookCase.add();
});
