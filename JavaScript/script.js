// Displaying posts from the API
async function showPosts(reload = true, page = 1) {
  manageLoader();
  const postContainer = document.querySelector(".posts");
  try {
    const response = await fetch(
      `https://tarmeezacademy.com/api/v1/posts?limit=5&page=${page}`
    );
    const data = await response.json();
    manageLoader(false);

    const posts = data.data;
    lastPage = data.meta.last_page;

    // Clear post container if reload is true
    if (reload) {
      postContainer.innerHTML = "";
    }

    for (let post of posts) {
      let postTitle = post.title ? post.title : "";
      let user = getCurrentUser();
      let isMyPost = user && post.author.id === user.id;
      let editBtn = "";
      let deleteBtn = "";

      // Show or hide edit and delete buttons
      if (isMyPost) {
        editBtn = `
            <button class="editPost btn btn-outline-dark float-end" onclick="event.stopPropagation();editingPost('${encodeURIComponent(
              JSON.stringify(post)
            )}')">
              Edit
            </button>
          `;
        deleteBtn = `
            <button class="deletePost btn btn-outline-danger float-end" onclick="event.stopPropagation();deletePost('${encodeURIComponent(
              JSON.stringify(post)
            )}')">
              Delete
            </button>
          `;
      }

      const postContent = `
          <div class="myPost card border-0 shadow my-5" id="post-${post.id}" onclick="showPostDetails(${post.id})">
            <div class="card-header">
              <div class="userDetails">
                <img class="userImage rounded-circle shadow" src="${post.author.profile_image}" alt="user_logo"/>
                <span class="userName ms-2 fs-6 fw-bold">${post.author.name}</span>
                ${editBtn} ${deleteBtn}
              </div>
            </div>
            <div class="card-body">
              <img class="postImage w-100 rounded-2" src="${post.image}" alt="post-image"/>
              <h5 class="card-title text-secondary fs-6 mt-2">${post.created_at}</h5>
              <h4>${postTitle}</h4>
              <p>${post.body}</p>
              <hr />
              <div class="comments&tags">
                <i class="fa-solid fa-comment"></i>
                <span class="commentDetails">(${post.comments_count}) Comments</span>
                <button type="button" class="btn btn-outline-secondary mx-2 rounded-5">Tag 1</button>
                <button type="button" class="btn btn-outline-secondary mx-2 rounded-5">Tag 2</button>
                <button type="button" class="btn btn-outline-secondary mx-2 rounded-5">Tag 3</button>
              </div>
            </div>
          </div>
        `;

      // Add the post content to the post container
      postContainer.insertAdjacentHTML("beforeend", postContent);
    }

    // Show the post container after adding the posts
    setTimeout(() => {
      postContainer.classList.add("show");
    }, 100);
  } catch (error) {
    manageLoader(false);
    console.error("Error fetching posts:", error);
    Swal.fire({ title: "Failed to load posts", icon: "error" });
  }
}

showPosts();
