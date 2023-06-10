import { Meteor } from "meteor/meteor";
import { Mailing } from "../mailing.js";

Meteor.publish("mailing", function () {
  return Mailing.find({});
});

Meteor.methods({
  // 'removeEverything'() {
  //     Stats.remove({})
  // },

  insertMail(obj) {
    console.log(obj);
    Mailing.insert({ mail: obj });
  },

  // 'updateStat'(obj){
  //   console.log("update ", obj)
  //   Stats.update({story: obj.story, date : obj.date}, {$set : {timeToFinish : obj.timeToFinish}})
  // }
});
