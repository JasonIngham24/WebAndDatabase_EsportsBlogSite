import { fetchData } from './main.js';
import { getCurrentUser } from './user.js';

const postForm = document.getElementById('postForm');
const postsContainer = document.getElementById('posts-container');

const editPostForm = document.getElementById('editPostForm');

if (postForm) {
    postForm.addEventListener('submit', createPost);
}

if (editPostForm) {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');
    if (postId) {
        loadPostForEdit(postId);
    }
    editPostForm.addEventListener('submit', (e) => updatePostHandler(e, postId));
}


if (postsContainer) {
    loadPosts();
}

async function loadPosts() {
    try {
        const posts = await fetchData('/posts/getAllPosts', {}, 'GET');
        const currentUser = getCurrentUser();
        postsContainer.innerHTML = '';
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');

            let postHTML = `
                <h3>${post.post_title}</h3>
                <p>${post.post_content}</p>
                <small>Posted by: ${post.username}</small>
            `;

            if (currentUser && currentUser.user_id === post.user_id) {
                postHTML += `
                    <div class="post-actions">
                        <button onclick="editPost(${post.post_id})">Edit</button>
                        <button onclick="deletePost(${post.post_id})">Delete</button>
                    </div>
                `;
            }

            postElement.innerHTML = postHTML;
            postsContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error('Error loading posts:', error);
    }
}

window.editPost = function(postId) {
    window.location.href = `edit-post.html?postId=${postId}`;
}

window.deletePost = async function(postId) {
    if (confirm('Are you sure you want to delete this post?')) {
        try {
            await fetchData(`/posts/deletePost/${postId}`, {}, 'DELETE');
            loadPosts();
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    }
}

async function loadPostForEdit(postId) {
    try {
        const post = await fetchData(`/posts/getPost/${postId}`, {}, 'GET');
        if (post && post.length > 0) {
            document.getElementById('editPostId').value = post[0].post_id;
            document.getElementById('editPostTitle').value = post[0].post_title;
            document.getElementById('editPostContent').value = post[0].post_content;
        }
    } catch (error) {
        console.error('Error loading post for edit:', error);
    }
}

async function updatePostHandler(event, postId) {
    event.preventDefault();

    const postTitle = document.getElementById('editPostTitle').value;
    const postContent = document.getElementById('editPostContent').value;
    const user = getCurrentUser();

    if (!user) {
        alert('You must be logged in to edit a post.');
        window.location.href = 'login.html';
        return;
    }

    const post = {
        title: postTitle,
        content: postContent,
        date: new Date().toISOString().slice(0, 19).replace('T', ' '),
        user_id: user.user_id
    };

    try {
        await fetchData(`/posts/updatePost/${postId}`, post, 'PUT');
        window.location.href = 'post.html';
    } catch (error) {
        console.error('Error updating post:', error);
    }
}

function createPost(event) {
    event.preventDefault();

    const postTitle = document.getElementById('postTitle').value;
    const postContent = document.getElementById('postContent').value;
    const user = getCurrentUser();

    if (!user) {
        alert('You must be logged in to create a post.');
        window.location.href = 'login.html';
        return;
    }

    const post = {
        title: postTitle,
        content: postContent,
        date: new Date().toISOString().slice(0, 19).replace('T', ' '),
        user_id: user.user_id
    };

    fetchData('/posts/createPost', post, 'POST')
    .then(data => {
        console.log('Success:', data);
        window.location.href = 'post.html';
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
