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
      .sort({ createdAt: -1 })
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

// exports.dashboardUpdateNote = async(req, res) => {

// }
