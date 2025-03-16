// Showing Post Details
const postContainer = document.querySelector(".post");
const postID = localStorage.getItem("postId");

const showingPostDetails = () => {
  manageLoader();
  axios
    .get(`https://tarmeezacademy.com/api/v1/posts/${postID}`)
    .then((res) => {
      const post = res.data.data;
      const postDetails = `
        <h2 class="p-3 rounded-3 shadow">Post Created By ${post.author.name}</h2>
        <div class="card my-5 border-0 shadow">
          <div class="card-header">
            <div class="userDetails">
              <img class="userImage rounded-circle shadow" src="${post.author.profile_image}" alt="user_logo"/>
              <span class="userName ms-2 fs-6 fw-bold">${post.author.username}</span>
            </div>
          </div>
          <div class="card-body">
            <img class="postImage w-100 rounded-2" src="${post.image}" alt="post-image"/>
            <h5 class="card-title text-secondary fs-6 mt-2">${post.created_at}</h5>
            <h4>${post.title}</h4>
            <p>${post.body}</p>
            <hr />
            <div class="comments fs-4 fw-bolder">
              <i class="fa-solid fa-comment"></i>
              <span class="commentDetails">
                <span class="commentCount">${post.comments_count}</span> Comments :-
              </span>
            </div>
            <div class="theCommentsInDetails"></div>
            <div class="createComment">
              <div class="addingComment mb-3 input-group">
                <input type="text" class="form-control" id="addComment">
                <button id="addCommentBtn" class="btn btn-dark" onclick="addCommentClicked()">Add</button>
              </div>
            </div>
          </div>
        </div>
      `;
      postContainer.innerHTML = postDetails;
      document.querySelector(".addingComment").style.display =
        localStorage.getItem("token") ? "flex" : "none";

      // Showing Comments
      const commentBody = post.comments;
      const theCommentsInDetails = document.querySelector(
        ".theCommentsInDetails"
      );
      commentBody.forEach((comment) => {
        const theComment = `
          <div class="userDetails mt-2">
            <img class="userImage rounded-circle shadow" src="${comment.author.profile_image}" alt="user_logo"/>
            <span class="userName ms-2 fs-4 fw-bold">${comment.author.name}</span>
          </div>
          <div class="p-4 bg-secondary-subtle rounded-4">
            <p class="fs-4">${comment.body}</p>
          </div>
          <hr class="mb-5"/>
        `;
        theCommentsInDetails.insertAdjacentHTML("beforeend", theComment);
      });
    })
    .catch((err) => {
      Swal.fire({ title: err.response.data.message, icon: "error" });
    })
    .finally(() => {
      manageLoader(false);
    });
};
showingPostDetails();

// Go To Home Page
const GoToHomePage = () => {
  window.location.href = "home.html";
};

// Add Comment Clicked
const addCommentClicked = () => {
  const commentInput = document.querySelector("#addComment").value;
  const theCommentsInDetails = document.querySelector(".theCommentsInDetails");
  const commentCount = document.querySelector(".commentCount");
  const token = localStorage.getItem("token");

  if (!token) {
    Swal.fire({ title: "You must be logged in to comment", icon: "error" });
    return;
  }

  if (commentInput.trim() === "") {
    Swal.fire({ title: "Please Add Comment", icon: "error" });
    return;
  }

  manageLoader();
  axios
    .post(
      `https://tarmeezacademy.com/api/v1/posts/${postID}/comments`,
      { body: commentInput },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((res) => {
      const comment = res.data.data;
      const theComment = `
        <div class="userDetails mt-2">
          <img class="userImage rounded-circle shadow" src="${comment.author.profile_image}" alt="user_logo"/>
          <span class="userName ms-2 fs-4 fw-bold">${comment.author.name}</span>
        </div>
        <div class="p-4 bg-secondary-subtle rounded-4">
          <p class="fs-4">${comment.body}</p>
        </div>
        <hr class="mb-5"/>
      `;
      Swal.fire({ title: "Comment Added Successfully", icon: "success" });
      theCommentsInDetails.insertAdjacentHTML("beforeend", theComment);
      commentCount.innerHTML = parseInt(commentCount.innerHTML) + 1;
      document.querySelector("#addComment").value = "";
    })
    .catch((error) => {
      Swal.fire({ title: error.response.data.message, icon: "error" });
    })
    .finally(() => {
      manageLoader(false);
    });
};
