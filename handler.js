"use strict";

import dbConnection from "./dbConfig.js";
import Notes from "./models/notes.model.js";

export const create = async (event) => {
  try {
    const requestBody = JSON.parse(event.body);
    console.log("requestBody:::", requestBody);
    const { title, description, status } = requestBody;

    const noteObj = new Notes({
      title,
      description,
      status,
    });

    await dbConnection();
    const saveInDb = await noteObj.save();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Notes created successfully!",
        data: saveInDb,
      }),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};

export const getOne = async (event) => {
  try {
    const id = event.pathParameters.id;

    await dbConnection();
    const noteData = await Notes.findById(id);
    if (!noteData) throw new Error("No Notes Found with this id!");

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Notes fetched successfully!",
        data: noteData,
      }),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};

export const getAll = async (event) => {
  try {
    await dbConnection();
    const allNotesData = await Notes.find({});

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Notes Data fetched successfully!",
        data: allNotesData,
      }),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};

export const update = async (event) => {
  try {
    const id = event.pathParameters.id;
    const requestBody = JSON.parse(event.body);

    const { title, description, status } = requestBody;

    await dbConnection();
    const notesData = await Notes.findById(id);

    if (!notesData) throw new Error("No notes Found with this id to update!");

    notesData.title = title || notesData.title;
    notesData.description = description || notesData.description;
    notesData.status = status || notesData.status;

    const updatedNote = await notesData.save();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Notes Data updated successfully!",
        data: updatedNote,
      }),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};

export const deleteOne = async (event) => {
  try {
    const id = event.pathParameters.id;

    await dbConnection();
    const notes = await Notes.findById(id);

    if (!notes) throw new Error("No notes available with this id to remove!");

    const deletedNote = await Notes.findByIdAndDelete(id);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Notes Deleted with ${id} successfully!`,
        data: deletedNote,
      }),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
