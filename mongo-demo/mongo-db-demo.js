const mongoose = require('mongoose');

//ingeneral the connection url should be feeded from configuration for security concern
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB..'))
    .catch(err => console.error('Could not connect to MongoDB..', err));

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        //match: /pattern/
    },
    category: {
        type: String,
        enum: ['web', 'mobile', 'network'],
        lowercase: true,
        trim: true
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function (v, callback) {
                //Do some async work
                setTimeout(() => {
                    const result = v && v.length > 0;
                    callback(result);
                }, 4000);
            },
            message: 'A course should have at least one tag'
        }
    },
    date: { type: Date, default: Date.now },
    isPublish: Boolean,
    price: {
        type: Number,
        required: function () { return this.isPublish },
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        category: 'Web',
        author: 'Mosh',
        tags: ['frontend'],
        isPublish: true,
        price: 15.8
    });

    try {
        const result = await course.save();
        console.log(result);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message);
    }
}

createCourse();

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

//query first approach.
async function updateCourseApproach1(id) {
    const course = await Course.findById(id);

    if (!course) return;

    course.isPublish = true;
    course.author = 'Another Author'

    //alternate option
    //course.set({isPublish: true, author: 'Another Author'})

    const result = await course.save();
    console.log(result);
}

//updateCourseApproach1('6012b1f3c82d1f3dfb22eff5');

//update first approach.
async function updateCourseApproach2(id) {
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Pulak',
            isPublish: false
        }
    }, { new: true });

    console.log(course);
}

//updateCourseApproach2('6012b1f3c82d1f3dfb22eff5');

async function removeCourse(id) {
    //if we want to delete multiple records with the given id
    //const result = await Course.deleteMany({_id: id});

    const course = await Course.findByIdAndRemove(id);
    console.log(course);
}

//removeCourse('6012b1f3c82d1f3dfb22eff5');