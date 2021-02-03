const mongoose = require('mongoose');

//ingeneral the connection url should be feeded from configuration for security concern
mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Connected to MongoDB..'))
    .catch(err => console.error('Could not connect to MongoDB..', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date },
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
    return await Course
        .find({isPublished: true})
        .or([{ price: { $gte: 15 } }, { name: /.*by.*/ }])
        .sort({ price: -1 })
        .select({ name: 1, author: 1, price: 1 });
}

async function searchCourses() {
    const courses = await getCourses();
    console.log(courses);
}

searchCourses();