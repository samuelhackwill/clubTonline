import { Meteor } from 'meteor/meteor';
import { Answers } from '../../API/answers/answers.js';


Meteor.startup(() => {
    if (Answers.find().count() === 0) {
        console.log("hey, there are no answers!")
    }
})