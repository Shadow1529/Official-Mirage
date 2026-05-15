function show(id, btn) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('visible'));
  document.querySelectorAll('.nav-tab').forEach(b => b.classList.remove('active'));
  document.getElementById(id).classList.add('visible');
  btn.classList.add('active');
}

const githubUser = "Shadow1529";

async function loadPosts() {
  try {
    console.log("🔄 Loading posts...");
    
    const res = await fetch("posts.json");
    
    if (!res.ok) {
      throw new Error(`Failed to load posts.json: ${res.status} ${res.statusText}`);
    }
    
    const posts = await res.json();
    console.log("✅ Posts loaded:", posts);
    
    const container = document.getElementById("postsContainer");
    if (!container) {
      console.error("❌ postsContainer not found in HTML!");
      return;
    }
    
    if (posts.length === 0) {
      container.innerHTML = "<p>No posts yet.</p>";
      return;
    }
    
    container.innerHTML = "";
    posts.forEach((post, index) => {
      console.log(`Creating post ${index + 1}:`, post);
      
      const el = document.createElement("div");
      el.className = "post";
      el.innerHTML = `
        <div class="post-header">
          <img src="https://github.com/${githubUser}.png" alt="${post.creator}"/>
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
    
    console.log("✅ All posts rendered successfully!");
    
  } catch (error) {
    console.error("❌ Error loading posts:", error);
    document.getElementById("postsContainer").innerHTML = 
      `<p style="color: #ff6b6b; padding: 20px; text-align: center;">
        <strong>Error:</strong> ${error.message}
      </p>`;
  }
}

// Load posts when page is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadPosts);
} else {
  loadPosts();
}
