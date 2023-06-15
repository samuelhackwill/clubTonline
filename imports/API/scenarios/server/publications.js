import { Meteor } from "meteor/meteor";
import { Scenarios } from "../scenarios.js";

Meteor.publish("scenarios", function () {
  return Scenarios.find({});
});

Meteor.methods({
    async getScenario(name){
        fakeData = [  { type: "SB", text: "coucouuuu." },
        { type: "SB", text: "c'est le serveur." },
      ] 
    //   console.log(name)
    //   Songs.findOne({name:name})
    return fakeData
    }
});
  