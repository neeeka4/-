let API = " http://localhost:8000/posts";

let twitterSignIn = document.querySelector(".twitter__main_signin");
let email = document.querySelector(".inp__email");
let password = document.querySelector(".inp__password");
let btnSignUp1 = document.querySelector(".btn__signup");

let googleSignUp = document.querySelector(".continue__goole_btn");
let facebookSignUp = document.querySelector(".continue__fb_btn");

let searchInp = document.querySelector(".inp__search");
let searchVal = "";
let currentPage = 1;

// btnSignUp1.addEventListener("click", async () => {
//   let obj = {
//     email: email.value,
//     password: password.value,
//   };

//   if (!obj.email.trim() || !obj.password.trim()) {
//     alert("Incorrect! Please fill the forms.");
//     return;
//   }
//   console.log(obj);
//   await fetch(API_USERS, {
//     method: "POST",
//     body: JSON.stringify(obj),
//     headers: { "Content-type": "application/json" },
//   });
//   email.value = "";
//   password.value = "";
// });

// googleSignUp.addEventListener("click", () => {
//   alert(
//     "Эта кнопка пока не работает, толук кандуу ишке киргенде иштеп баштайт."
//   );
// });

// facebookSignUp.addEventListener("click", () => {
//   alert(
//     "Эта кнопка тоже пока не работает, толук кандуу ишке киргенде иштеп баштайт."
//   );
// });

// twitterSignIn.addEventListener("click", () => {
//   alert(
//     "Эта кнопка пока не работает, толук кандуу ишке киргенде иштеп баштайт."
//   );
// });

// // TODO SEARCH

// searchInp.addEventListener("input", () => {
//   searchVal = searchInp.value;
//   currentPage = 1;
//   render();
// });

//home page
// post
let post = document.querySelector(".inp_post");
let tweet = document.querySelector(".btn_twt");

// content
let list = document.querySelector("#products-list");

// modal

tweet.addEventListener("click", async () => {
  let obj = {
    post: post.value,
  };
  if (!obj.post.trim()) {
    alert("сдж");
  }
  await fetch(API, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-type": "application/json",
    },
  });
  post.value = "";
  render();
});

async function render() {
  let posts = await fetch(API)
    .then((res) => res.json())
    .catch((data) => console.log(data));
  list.innerHTML = "";
  posts.forEach((elem) => {
    console.log(elem);
    let newElem = document.createElement("div");
    newElem.id = elem.id;
    newElem.innerHTML = `  <div class="cont-page">
    <div class="content">
      <img
        src="https://i.pinimg.com/564x/ab/74/64/ab7464797ecc32b628b3bea1e48bfbba.jpg"
        alt=""
        class="avat_cont"
      />
      <p class="uname">dog from ohio</p>
      <p class="nname">@gavgav</p>
      <input
        type="image"
        src="https://cdn3.iconfinder.com/data/icons/navigation-and-settings/24/Material_icons-01-13-512.png"
        class="menu"
        alt=""
        
      />
    </div>
    <p class="cont-p">${elem.post}</p>

    <div class="btm_blck">
      <input
      type="image"
        src="https://cdn-icons-png.flaticon.com/512/5338/5338282.png"
        id="cnt1"
        alt=""
      />
      <input
      type="image"
        src="https://cdn-icons-png.flaticon.com/512/1388/1388997.png"
        id="cnt2"
        alt=""
      />
      <input
      type="image"
        src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png"
        id="cnt3"
        alt=""
      />
      <input
       type="image"
       src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png"
       alt=""
       class="btn-edit"
       id = ${elem.id}
       class="btn btn-outline-success"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
            />
            <input
            type="image"
              src="https://cdn-icons-png.flaticon.com/128/2089/2089736.png"
              id="cnt4"
              alt=""
            />  
            <input
            type="image"
            src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
            alt=""
            class="btn-delete"
            id = ${elem.id} 
            />   
    </div>
  </div>`;
    list.prepend(newElem);
  });
}
render();

// delete

// let del = document.querySelector(".btn-delete");

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-delete")) {
    let id = e.target.id;
    console.log(e.target.id);
    fetch(`${API}/${id}`, {
      method: "DELETE",
    }).then(() => render());
  }
});

// edit
let editpost = document.querySelector("#edit-post");
let exampleModal = document.querySelector("#exampleModal");
let editSaveBtn = document.querySelector("#btn-save-edit");

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-edit")) {
    console.log("ass");
    let id = e.target.id;
    fetch(`${API}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        editpost.value = post.title;
        editSaveBtn.setAttribute("id", data.id);
      });
  }
});

editSaveBtn.addEventListener("click", function () {
  let id = this.id;
  let post = editpost.value;

  if (!post) {
    return;
  }
  let editProduct = {
    post: post,
  };
  saveEdit(editProduct, id);
});

function saveEdit(editedProduct, id) {
  fetch(`${API}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(editedProduct),
  }).then(() => {
    render();
  });

  let modal = bootstrap.Modal.getInstance(exampleModal);
  modal.hide();
}
