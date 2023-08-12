const mongoose =require('mongoose');
// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/contact_list');
//   console.log('MongoDB connected successfully');

//   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }

const db = mongoose.connect('mongodb://127.0.0.1:27017/codeial', {
    useNewUrlParser: true,
    useUnifiedTopology: true,

  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
 



  
  
  
  
  