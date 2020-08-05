const fakePost = () => ({
    userId: 1,
    postId: 2,
    title: 'Post title',
    body: 'Post body',
});

const fakeComment = () => ({
    postId: 1,
    id: 1,
    name: 'Comment name',
    email: 'user@gmail.com',
    body: 'Comment body',
});

export { fakePost, fakeComment };