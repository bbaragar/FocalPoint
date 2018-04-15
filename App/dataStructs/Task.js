import React, { Component } from 'react';

export class Task{

  constructor(priority, category, dueDate, preferredFinish, name, notes, description, recurring, percentComplete) {
    this.priority = priority;
    this.category = category;
    this.dueDate = dueDate;
    this.preferredFinish = preferredFinish;
    this.name = name;
    this.notes = notes;
    this.description = description;
    this.recurring = recurring;
    this.percentComplete = percentComplete;
  }
  /*
      priority; //int 0 to 3 how important. 0: low, 1: standard, 2: priority, 3: urgent
      category; //String for now specifying category
      dueDate;  //unix timestamnp of due date
      preferredFinish; //unix timestamnp of preferred finish time, -1 for dont care. TO BE IMPLEMENTED LATER
      name;  //task name
      notes;  // string for notes about task
      description; // short description. like notes but viewed with name
      recurring;  // should this task repeat. TO BE IMPLEMENTED LATER
      percentComplete; // 0 - 100 where you at?

      */
}