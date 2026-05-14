function show(id, btn) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('visible'));
  document.querySelectorAll('.nav-tab').forEach(b => b.classList.remove('active'));

  document.getElementById(id).classList.add('visible');
  btn.classList.add('active');
}

/* 🔥 YOUR GITHUB USERNAME */
const githubUser = "Shadow1529";

async function loadPosts() {
  const res = await fetch("posts.json");
  const posts = await res.json();

  const container = document.getElementById("postsContainer");
  container.innerHTML = "";

  posts.forEach(post => {
    const el = document.createElement("div");
    el.className = "post";

    el.innerHTML = `
      <div class="post-header">
        <img src="https://github.com/${githubUser}.png"/>
        <div class="post-meta">
          <div class="post-creator">${post.role} • ${post.creator}</div>
          <div class="post-headline">${post.headline}</div>
          <div class="post-title">${post.title}</div>
        </div>
      </div>

      <div class="post-content">
        ${post.content}
      </div>
    `;

    container.appendChild(el);
  });
}

loadPosts();
