/* eslint-disable no-undef */
const mongoose = require("mongoose");

const password = "Rufaidat";

const url = `mongodb+srv://fullstackNotes:${password}@cluster0.xsbzetz.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Contact = mongoose.model("Contact", noteSchema);

const contact = new Contact({
  name: process.argv[3],
  number: process.argv[4],
});

mongoose
  .connect(url)
  // eslint-disable-next-line no-unused-vars
  .then((_result) => {
    console.log("connected");

    if (process.argv.length === 3)
      Contact.find({}).then((result) => {
        result.forEach((note) => {
          console.log(note);
        });
        mongoose.connection.close();
      });
    if (process.argv.length === 5) {
      return contact.save();
    }
  })
  .then(() => {
    console.log(`added ${contact.name} number ${contact.number} to phonebook`);
    return mongoose.connection.close();
  })
  .catch((err) => console.log(err));
