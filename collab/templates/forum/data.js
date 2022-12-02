var defaultThreads = [
    {
        id: 1,
        title: "Add a button somewhere",
        author: "Aaron",
        date: Date.now(),
        content: "Thread content",
        comments: [
            {
                author: "Jack",
                date: Date.now(),
                content: "Awesome job mate."
            },
            {
                author: "Arthur",
                date: Date.now(),
                content: "I like this idea. Very smart!"
            }
        ]
    },
    {
        id: 2,
        title: "Put water in the break room.",
        author: "Aaron",
        date: Date.now(),
        content: "Thread content 2",
        comments: [
            {
                author: "Jack",
                date: Date.now(),
                content: "I'll get on it right away!"
            },
            {
                author: "Box",
                date: Date.now(),
                content: "That's awesome!!"
            }
        ]
    }
]

var threads = defaultThreads
if (localStorage && localStorage.getItem('threads')) {
    threads = JSON.parse(localStorage.getItem('threads'));
} else {
    threads = defaultThreads;
    localStorage.setItem('threads', JSON.stringify(defaultThreads));
}