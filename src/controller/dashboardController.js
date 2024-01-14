const Note = require('../models/notes');
const mongoose = require('mongoose');
const _ = require('lodash');

exports.dashboard = async (req, res) => {
  const locals = {
    title: 'Dashboard',
    description: 'Free NodeJS Notes App',
  };

  try {
    // Validate user ID
    const userId = req.user.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.error('Invalid user ID:', userId);
      return res.status(400).send('Invalid user ID');
    }

    // Fetch all notes
    const notes = await Note.find({})
      .sort({ updatedAt: -1 })
      .exec();

    // Truncate notes using lodash
    const truncatedNotes = notes.map(note => ({
      ...note.toObject(),
      body: _.truncate(note.body, { length: 100, separator: ' ' }),
    }));

      //console.log(truncatedNotes)
    // Count documents
    const count = await Note.countDocuments({ user: new mongoose.Types.ObjectId(userId) });

    // Render the template
    res.render('dashboard/index', {
      userName: req.user.firstName,
      locals,
      notes: truncatedNotes || [],
      layout: '../views/layouts/dashboard',
      current: 1, 
      pages: 1, 
    });
  } catch (error) {
    console.error('Error in dashboard controller:', error);
    res.status(500).send('Internal Server Error');
  }
}

//view notes

exports.dashboardViewNote = async (req, res) => {
  const note = await Note.findById(req.params.id)
    .where(req.user.id)
    .lean();

    console.log(note);
  if (note) {
    res.render("dashboard/view-notes", {
      noteID: req.params.id,
      note,
      layout: "../views/layouts/dashboard",
    });
  } else {
    res.send("Something went wrong.");
  }
};




//update notes

exports.dashboardUpdateNote = async (req, res) => {
  try {
    const UpdateNote = await Note.findOneAndUpdate(
      { _id: req.params.id },
      {title: req.body.title, body: req.body.body, updatedAt: Date.now()},
      {new:true}
    ).where({ user: req.user.id });
    console.log('Request Body:', req.body);


    if (UpdateNote){
      console.log("note updated", UpdateNote)
    } else{
      console.log("note didn't updated")
    }

    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};


// delete note

exports.dashboardDeleteNote = async (req, res) => {
  try {
    await Note.deleteOne({ _id: req.params.id })
    .where({ user: req.user.id });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};


//add note
exports.dashboardAddNote = async (req, res) => {
  res.render("dashboard/add", {
    layout: "../views/layouts/dashboard",
  });
};

//add note functioning
exports.dashboardAddNoteSubmit = async (req, res) => {
  try {
    
    req.body.user = req.user.id;
    await Note.create(req.body);
    res.redirect("/dashboard");

  } catch (error) {
    console.log(error);
  }
};

// search notes function
exports.dashboardSearch = async (req, res) => {
  try {
    res.render("dashboard/search", {
      searchResults: "",
      layout: "../views/layouts/dashboard",
    });
  } catch (error) {}
};

//search submission
exports.dashboardSearchSubmit = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
    const searchResults = await Note.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChars, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChars, "i") } },
      ],
    }).where({ user: req.user.id });

    res.render("dashboard/search", {
      searchResults,
      layout: "../views/layouts/dashboard",
    });
  } catch (error) {
    console.log(error);
  }
};