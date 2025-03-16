//Pagination Function for the posts
let currentPage = 1;
let lastPage;
window.addEventListener("scroll", () => {
  const endOfPage =
    window.innerHeight + window.pageYOffset >= document.body.scrollHeight;
  if (endOfPage && currentPage < lastPage) {
    currentPage = currentPage + 1;
    showPosts(false, currentPage);
  }
});
///////////////////////////////////////////////////////////////////////////

//Restoring the user name and user image after refreshing the page
window.onload = function () {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    document.querySelector(
      ".userNameAfterSigningInOrLoggingIn"
    ).innerHTML = `${user.name}`;
    document.querySelector(
      ".userImageAfterSigningInOrLoggingIn"
    ).src = `${user.profile_image}`;
  } else {
    document.querySelector(".userNameAfterSigningInOrLoggingIn").innerHTML = ``;
    document.querySelector(".userImageAfterSigningInOrLoggingIn").src = ``;
  }
};
document.addEventListener("DOMContentLoaded", () => {
  showingButtons();
});

/////////////////////////////////////////////////////////////////////////////
//login function
const loginClicked = () => {
  //Getting the values of the fields
  const userName = document.getElementById("user-name").value;
  const password = document.getElementById("user-password").value;
  //API URL
  const url = "https://tarmeezacademy.com/api/v1/login";
  //Creating the parameters
  const params = {
    username: userName,
    password: password,
  };
  //Checking if the fields are empty
  if (userName == "" || password == "") {
    Swal.fire({
      title: "Please Fill All Fields",
      icon: "error",
    });
    return;
  }
  //Sending the data to the API
  manageLoader();
  axios
    .post(url, params)
    .then((res) => {
      //Saving the token and user data in the local storage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      //Hiding the modal and showing the alert
      const modal = document.getElementById("loginModal");
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();
      showAlert("LoggedIn Successfully!", "Welcome to Piso Platform");
      showingButtons();
      //Showing the user name after logging in
      let userNameAfterSigningInOrLoggingIn = document.querySelector(
        ".userNameAfterSigningInOrLoggingIn"
      );
      userNameAfterSigningInOrLoggingIn.innerHTML = JSON.parse(
        localStorage.getItem("user")
      ).name;
      document.querySelector(
        ".userImageAfterSigningInOrLoggingIn"
      ).src = `${user.profile_image}`;
    })
    .catch((err) => {
      Swal.fire({
        title: err.response.data.message,
        icon: "error",
      });
    })
    .finally(() => {
      manageLoader(false);
    });
};
/////////////////////////////////////////////////////////////////////////////

//register function
const registerClicked = () => {
  //Getting the values of the fields
  const name = document.getElementById("register-name").value;
  const userName = document.getElementById("register-userName").value;
  const password = document.getElementById("register-password").value;
  const image = document.getElementById("register-image").files[0];
  //API URL
  const url = "https://tarmeezacademy.com/api/v1/register";
  const formData = new FormData();
  formData.append("name", name);
  formData.append("username", userName);
  formData.append("password", password);
  formData.append("image", image);
  //Checking if the fields are empty
  if (name == "" || userName == "" || password == "") {
    Swal.fire({
      title: "Please Fill All Fields",
      icon: "error",
    });
    return;
  }
  manageLoader();
  //Sending the data to the API
  axios
    .post(url, formData)
    .then((res) => {
      //Saving the token and user data in the local storage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      //Hiding the modal and showing the alert
      const modal = document.getElementById("registerModal");
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();
      showAlert("Signing_Up Successfully!", "Welcome to Piso Platform");
      showingButtons();
    })
    .catch((err) => {
      Swal.fire({
        title: err.response.data.message,
        icon: "error",
      });
    })
    .finally(() => {
      manageLoader(false);
    });
};

//logout function
const logOutClicked = () => {
  let userName = document.querySelector(".userNameAfterSigningInOrLoggingIn");
  let userImage = document.querySelector(".userImageAfterSigningInOrLoggingIn");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  showingButtons();
  showAlert("LoggedOut Successfully!", "See You Later");
  userName.innerHTML = "";
  userImage.style.visibility = "hidden";
};
/////////////////////////////////////////////////////////////////////////////
//showing alert for login & logout
function showAlert(title, text) {
  Swal.fire({
    title: title,
    text: text,
    icon: "success",
  });
}
/////////////////////////////////////////////////////////////////////////////

//Showing And Hiding login & register & logout & Adding New Post buttons
const showingButtons = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (localStorage.getItem("token") != null && user) {
    //Logout&&Login&&Register&&Adding Post
    document.querySelector(".logOutBtn").style.display = "block";
    document.querySelector(".signInAndlogIn").style.display = "none";
    document.querySelector(".addingPost").style.display = "block";
    //User Name && user IMage
    document.querySelector(
      ".userImageAfterSigningInOrLoggingIn"
    ).style.display = "block";
    document.querySelector(".userNameAfterSigningInOrLoggingIn").style.display =
      "block";
    document.querySelector(".userImageAfterSigningInOrLoggingIn").src =
      JSON.parse(localStorage.getItem("user")).profile_image;
    document.querySelector(".userNameAfterSigningInOrLoggingIn").innerHTML =
      JSON.parse(localStorage.getItem("user")).name;
  } else {
    //Logout&&Login&&Register&&Adding Post
    document.querySelector(".logOutBtn").style.display = "none";
    document.querySelector(".signInAndlogIn").style.display = "block";
    document.querySelector(".addingPost").style.display = "none";
    //User Name && user IMage
    document.querySelector(
      ".userImageAfterSigningInOrLoggingIn"
    ).style.display = "none";
    document.querySelector(".userNameAfterSigningInOrLoggingIn").style.display =
      "none";
    document.querySelector(".userImageAfterSigningInOrLoggingIn").src = "";
    document.querySelector(".userNameAfterSigningInOrLoggingIn").innerHTML = "";
  }
};
/////////////////////////////////////////////////////////////////////////////
const getCurrentUser = () => {
  let user = null;
  const storageUser = localStorage.getItem("user");
  if (storageUser != null) {
    user = JSON.parse(storageUser);
  }
  return user;
};
/////////////////////////////////////////////////////////////////////////////

//Adding New Post
const addingPostClicked = () => {
  let postId = document.getElementById("post-modal-id").value;
  let postIsCreated = postId == null || postId == "";
  const postTitle = document.getElementById("postTitle").value;
  const postBody = document.getElementById("postBody").value;
  const postImage = document.getElementById("postImage").files[0];
  const token = localStorage.getItem("token");
  const headers = {
    authorization: `Bearer ${token}`,
  };
  let url = ``;
  const formData = new FormData();
  formData.append("title", postTitle);
  formData.append("body", postBody);
  formData.append("image", postImage);
  console.log(formData);
  if (postIsCreated) {
    url = "https://tarmeezacademy.com/api/v1/posts";
  } else {
    formData.append("_method", "put");
    url = `https://tarmeezacademy.com/api/v1/posts/${postId}`;
  }
  manageLoader();
  //Sending the data to the API
  axios
    .post(url, formData, { headers: headers })
    .then((res) => {
      if (postTitle == "" || postBody == "") {
        Swal.fire({
          title: "Please Fill All Fields",
          icon: "error",
        });
        return;
      }
      //Hiding the modal and showing the alert
      const modal = document.getElementById("AddingPostModal");
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();
      //Saving the token and user data in the local storage
      showAlert("Post Added Successfully!", "Your Post Has Been Added");
      //Show Post After Creation
      showPosts();
    })
    .catch((err) => {
      Swal.fire({
        title: err.response.data.message,
        icon: "error",
      });
    })
    .finally(() => {
      manageLoader(false);
    });
};
/////////////////////////////////////////////////////////////////////////////
//Editing Post

const editingPost = (post) => {
  let postObject = JSON.parse(decodeURIComponent(post));
  let postModel = new bootstrap.Modal(
    document.getElementById("AddingPostModal"),
    {}
  );
  postModel.toggle();
  document.getElementById("post-modal-id").value = postObject.id;
  document.getElementById("post-modal-name").innerHTML = "Update Your Post";
  document.getElementById("postTitle").value = `${postObject.title}`;
  document.getElementById("postBody").value = `${postObject.body}`;
  document.getElementById("post-btn-modal").innerHTML = "Update";
};
/////////////////////////////////////////////////////////////////////////////

// Add Post

const addBtnClicked = () => {
  document.getElementById("post-modal-id").value = "";
  document.getElementById("post-modal-name").innerHTML = "Create New Post";
  document.getElementById("postTitle").value = ``;
  document.getElementById("postBody").value = ``;
  document.getElementById("post-btn-modal").innerHTML = "Create";
  let postModel = new bootstrap.Modal(
    document.getElementById("AddingPostModal"),
    {}
  );
  postModel.toggle();
};

/////////////////////////////////////////////////////////////////////////////

//Delete Post Modal

const deletePost = (post) => {
  let postObject = JSON.parse(decodeURIComponent(post));
  document.getElementById("post-delete-modal-id").value = postObject.id;
  let postModel = new bootstrap.Modal(
    document.getElementById("deleteModal"),
    {}
  );
  postModel.toggle();
};
/////////////////////////////////////////////////////////////////////////////

// Confirm Deleting

const confirmDelete = () => {
  let postID = document.getElementById("post-delete-modal-id").value;

  if (!postID) {
    Swal.fire({
      title: "Error",
      text: "Post ID is missing!",
      icon: "error",
    });
    return;
  }

  let url = `https://tarmeezacademy.com/api/v1/posts/${postID}`;
  const token = localStorage.getItem("token");
  const headers = {
    authorization: `Bearer ${token}`,
  };
  const postElement = document.getElementById(`post-${postID}`);
  axios
    .delete(url, { headers: headers })
    .then(() => {
      if (postElement) {
        postElement.remove();
      }
      //Hiding the modal and showing the alert
      const modal = document.getElementById("deleteModal");
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();
      Swal.fire({
        title: "Deleted!",
        text: "Post has been deleted successfully.",
        icon: "success",
      });
      showPosts();
    })
    .catch((err) => {
      console.error("Error Response:", err);

      let errorMessage = "An unknown error occurred";
      if (err.response) {
        errorMessage =
          err.response.data.message ||
          `Error ${err.response.status}: ${err.response.statusText}`;
      } else if (err.request) {
        errorMessage =
          "No response received from server. Check your internet connection.";
      } else {
        errorMessage = err.message;
      }

      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
      });
    });
};
/////////////////////////////////////////////////////////////////////////////

//product details
const showPostDetails = (id) => {
  window.location.href = "postDetails.html";
  localStorage.setItem("postId", id);
};

/////////////////////////////////////////////////////////////////////////////

//Showing Or Hidding Loader

const manageLoader = (show = true) => {
  const loader = document.querySelector(".loader");
  if (show) {
    loader.style.visibility = "visible";
  } else {
    loader.style.visibility = "hidden";
  }
};
