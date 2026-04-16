const postForm = document.getElementById('postForm');

if (postForm) {
    postForm.addEventListener('submit', createPost);
}

function createPost(event) {
    event.preventDefault();

    const postContent = document.getElementById('postContent').value;

    const post = {
        content: postContent
    };

    console.log(post);
}
