const mongoose = require('mongoose');

//ingeneral the connection url should be feeded from configuration for security concern
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB..'))
    .catch(err => console.error('Could not connect to MongoDB..', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublish: Boolean
});    

const Course = mongoose.model('Course', courseSchema);
const course = new Course({
    name: 'Node.js Course',
    author: 'Mosh',
    tags: ['node', 'backend'],
    isPublish: true
});
