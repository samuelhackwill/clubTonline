import { Meteor } from "meteor/meteor";
import { Answers } from "../answers.js";

Meteor.publish("answers", function () {
  return Answers.find({});
});

Meteor.methods({
  // 'removeEverything'() {
  //     Stats.remove({})
  // },

  insertAnswers(data, _targetScenario) {
    for (let index = 0; index < data.length; index++) {
      console.log("inserting : ", data[index].name, data[index].answer)
      Answers.insert({question : data[index].name, answer : data[index].answer, scenario:_targetScenario})
    }
  },

  // 'updateStat'(obj){
  //   console.log("update ", obj)
  //   Stats.update({story: obj.story, date : obj.date}, {$set : {timeToFinish : obj.timeToFinish}})
  // }
});
