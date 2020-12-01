/*
Bài tập 1 : Sử dụng html/css và javascript xây dựng trang tasklist

Các chức năng cần có:
-> Thêm task mới (validate nếu task để trống)
-> Hiển thị danh sách task
-> Filter các task theo tên
-> Xóa các task (trước khi xóa hiển thị popup xác nhận)

Gợi ý các kỹ thuật sử dụng:
-> Object, Function
-> DOM
-> LocalStorage
-> document function (querySelector, addEventListener, createElement, appendChild, querySelectorAll)
*/

const add = document.querySelector("#add");
const inputTaskAdd = document.querySelector("#textareaAdd");
let contentTaskAdd;
add.addEventListener("click", () => {
  if (typeof Storage !== "undefined") {
    // Code for localStorage/sessionStorage.
    contentTaskAdd = inputTaskAdd.value;

    if (contentTaskAdd === "") alert("Vui long dien day du vao truong!");
    else {
      localStorage.setItem(uuid.v4(), contentTaskAdd);
      inputTaskAdd.value = "";
      renderDataList();
    }
  } else {
    console.log("Sorry! No Web Storage support..");
  }
});
const mainList = document.querySelector("#main-list");
let removeList;

var renderDataList = () => {
  let dataInner = "";
  Object.keys(localStorage).forEach((e) => {
    console.log(e.length);
    let getContent = localStorage.getItem(e);
    dataInner += `<li class="collection-item">
                      <div class="uuid" style="display: none">${e}</div>
                      <div>${getContent}
                            <div class="secondary-content remove-item">Remove</div>
                      </div>
                  </li>`;
  });
  mainList.innerHTML = dataInner;
  removeList = document.getElementsByClassName("remove-item");
  (() => {
    for (let i = 0; i < removeList.length; i++) {
      removeList[i].addEventListener("click", () => {
        if (confirm("Chac chan xoa?!")) {
          let strContent =
            removeList[i].parentElement.parentElement.textContent;
          strContent = strContent.trim();
          let idTask = strContent.slice(0, 36);
          localStorage.removeItem(idTask);
          renderDataList();
        }
      });
    }
  })();
};
renderDataList();
