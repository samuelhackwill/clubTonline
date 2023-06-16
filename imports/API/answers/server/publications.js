import { Meteor } from "meteor/meteor";
import { Answers } from "../answers.js";

Meteor.publish("answers", function (_params) {
  console.log(_params?.scenario)
    return Answers.find({scenario : _params.scenario});
});

Meteor.methods({
  insertAnswers(data, _targetScenario) {
    for (let index = 0; index < data.length; index++) {
      console.log("inserting : ", data[index].name, data[index].answer)
      Answers.insert({question : data[index].name, answer : data[index].answer, scenario:_targetScenario})
    }
  },
});
