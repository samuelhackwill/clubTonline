import { Meteor } from "meteor/meteor";
import { Answers } from "../answers.js";

Meteor.publish("answers", function () {
  return Answers.find({});
});

Meteor.methods({
  // 'removeEverything'() {
  //     Stats.remove({})
  // },

//   insertMail(obj) {
//     console.log(obj);
//     Mailing.insert({ mail: obj });
//   },

  // 'updateStat'(obj){
  //   console.log("update ", obj)
  //   Stats.update({story: obj.story, date : obj.date}, {$set : {timeToFinish : obj.timeToFinish}})
  // }
});
