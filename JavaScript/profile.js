const profileContainer = document.querySelector(".profile-container");
const postContainer = document.querySelector(".posts");
//showing profile Content
const showProfileContent = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  //if user is not logged in
  if (!user) {
    Swal.fire({
      title: "You are not logged in",
      icon: "error",
    });
    setTimeout(() => {
      window.location.href = "home.html";
    }, 2000);
  }
  const url = `https://tarmeezacademy.com/api/v1/users/${user.id}`;
  manageLoader();
  axios
    .get(url)
    .then((res) => {
      const myUser = res.data.data;
      const profileDetails = ` 
    <div class="row">
  <div class="card border-0 shadow">
    <div class="card-body">
      <div class="row text-center">
        <div class="userImage col-md-4 h-50">
          <img
            src="${myUser.profile_image}"
            alt="userImage"
            class="rounded-circle userImageInProfile"
            id="userImage"
          />
        </div>
        <div class="userDetails col-md-4">
          <h1 class="fs-1 fw-bolder" id="userName">${myUser.username}</h1>
          <h2 class="fs-2 fw-bolder" id="name">${myUser.name}</h2>
          <h3 class="fs-3 fw-bolder" id="email">${myUser.email}</h3>
        </div>
        <div class="numberOfPostsAndComments col-md-4">
          <div class="noOfPosts fs-2 fw-bolder">
            <span>${myUser.posts_count}</span>
            <sub>Posts</sub>
          </div>
          <div class="noOfComments fs-2 fw-bolder">
            <span>${myUser.comments_count}</span>
            <sub>Comments</sub>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;
      profileContainer.innerHTML = profileDetails;
    })
    .catch((error) => {
      const err = error.response.data.message;
      Swal.fire({
        title: err,
        icon: "error",
      });
    })
    .finally(() => {
      manageLoader(false);
    });
};
showProfileContent();
////////////////////////////////////////////////////////////////////////
//showing profile posts
const showingProfilePosts = (reload = true, page = 1) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //if user is not logged in
  if (!user) {
    Swal.fire({
      title: "You are not logged in",
      icon: "error",
    });
    setTimeout(() => {
      window.location.href = "home.html";
    }, 2000);
    return;
  }
  manageLoader();
  axios
    .get(`https://tarmeezacademy.com/api/v1/posts?limit=200&page=${page}`)
    .then((res) => {
      const posts = res.data.data;
      lastPage = res.data.meta.last_page;
      //checking for the content of post container{if it is empty or not}
      if (reload == true) {
        postContainer.innerHTML = ``;
      }
      for (post of posts) {
        console.log(post);
        let isMyPost = user != null && post.author.id == user.id;
        let editBtn = "";
        let deleteBtn = ``;
        if (isMyPost) {
          editBtn = `
            <button
              class="editPost btn btn-outline-dark float-end"
              onclick="event.stopPropagation();editingPost('${encodeURIComponent(
                JSON.stringify(post)
              )}')"
            >
              Edit
            </button>
          `;
          deleteBtn = `
            <button
              class="deletePost btn btn-outline-danger float-end"
              onclick="event.stopPropagation();deletePost('${encodeURIComponent(
                JSON.stringify(post)
              )}')"
            >
              Delete
            </button>
          `;
        }
        if (user.id == post.author.id) {
          const postContent = `

            <div class="myPost card border-0 shadow my-5"  id="post-${post.id}" onclick="showPostDetails(${post.id})">
              <div class="card-header">
                <div class="userDetails">
                  <img
                    class="userImage rounded-circle shadow"
                    src="${post.author.profile_image}"
                    alt="user_logo"
                  />
                  <span class="userName ms-2 fs-6 fw-bold">${post.author.name}</span>
                    ${editBtn}
                    ${deleteBtn}
                  </div>
              </div>
              <div class="card-body">
                <img
                  class="postImage w-100 rounded-2"
                  src="${post.image}"
                  alt="post-image"
                />
                <h5 class="card-title text-secondary fs-6 mt-2">${post.created_at}</h5>
                <h4>${post.title}</h4>
                <p>
                  ${post.body}
                </p>
                <hr />
                <div class="comments&tags">
                  <i class="fa-solid fa-comment"></i>
                  <span class="commentDetails">(${post.comments_count}) Comments</span>
                  <button type="button" class="btn btn-outline-secondary mx-2 rounded-5">Tag 1</button>
                  <button type="button" class="btn btn-outline-secondary mx-2 rounded-5">Tag 2</button>
                  <button type="button" class="btn btn-outline-secondary mx-2 rounded-5">Tag 3</button>
                  </div>
              </div>
            </div>`;
          postContainer.innerHTML += postContent;
          //Showing the post container after adding the posts
          postContainer.classList.add("show");
        }
      }
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
      Swal.fire({
        title: "Failed to load posts",
        text: "Something went wrong while fetching posts.",
        icon: "error",
      });
    })
    .finally(() => {
      manageLoader(false);
    });
};
showingProfilePosts();
