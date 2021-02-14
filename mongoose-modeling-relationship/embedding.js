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
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors: authors
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

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);

  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

//Execution Order 1 commit - 33.04
//createCourse('Node Course', new Author({ name: 'Pulak' }));

//Execution Order 2 commit - 33.04
//updateAuthor('60291bdaec07982021063dcd');

//Execution Order 1 commit 33.05
/*createCourse('Node Course', [
  new Author({ name: 'Pulak' }),
  new Author({ name: 'Roy' })
]);*/

//Execution Order 2 commit 33.05
//addAuthor('60292a9f9a73d5273103b14c', new Author({name: 'Amy'}));

//Execution Order 3 commit 33.05
removeAuthor('60292a9f9a73d5273103b14c', '60292c3afafa4c2813463643');


