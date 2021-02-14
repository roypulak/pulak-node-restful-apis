const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/learn-modeling-relationship')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: {
    type: authorSchema,
    required: true
  }
}));

async function createCourse(name, author) {
  const course = new Course({
    name,
    author
  });

  const result = await course.save();
  console.log(JSON.stringify(course));
}

async function listCourses() {
  const courses = await Course.find();
  console.log(JSON.stringify(courses));
}

async function updateAuthor(courseId) {
  /*const course = await Course.findById(courseId);
  course.author.name = 'Pulak Roy';
  course.save();*/

  const course = await Course.update({ _id: courseId }, {
    $set: {
      'author.name': 'John Smith'
    }
  });
}
//Execution Order 1
//createCourse('Node Course', new Author({ name: 'Pulak' }));

//Execution Order 2
updateAuthor('60291bdaec07982021063dcd');