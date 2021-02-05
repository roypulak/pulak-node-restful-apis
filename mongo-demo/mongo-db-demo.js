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

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        tags: ['angular', 'frontend'],
        isPublish: true
    });

    const result = await course.save();
    console.log(result);
}

//createCourse();

async function getCourses() {
    //in reality pageNumber and pageSize are expected come from api parameter
    const pageNumber = 2;
    const pageSize = 10;

    const courses = await Course
        .find({ author: 'Mosh', isPublish: true })
        .limit(10)
        .sort({ name: 1 }) //-1 means decending
        .select({ name: 1, tags: 1 }); //we want only name and tags

    console.log(courses);
}

//getCourses();

async function updateCourse(id) {
    const course = await Course.findById(id);

    if (!course) return;

    course.isPublish = true;
    course.author = 'Another Author'

    //alternate option
    //course.set({isPublish: true, author: 'Another Author'})

    const result = await course.save();
    console.log(result);
}

updateCourse('6012b1f3c82d1f3dfb22eff5');