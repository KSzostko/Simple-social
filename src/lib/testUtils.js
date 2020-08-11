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

const fakeUser = () => ({
    id: 1,
    name: 'John Doe',
    email: 'jdoe@gmail.com',
    phone: '123-456-789',
    website: 'hildegard.org',
    company: {
        name: 'Company Name',
        catchPhrase: 'phrase',
        bs: 'bs text',
    }
});

export { fakePost, fakeComment, fakeUser };