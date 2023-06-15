import { Meteor } from "meteor/meteor";
import { Scenarios } from "../scenarios.js";

Meteor.publish("scenarios", function () {
  return Scenarios.find({});
});

Meteor.methods({
    async getScenario(_targetScenario){


      data = {
        sc1_tu : [  { type: "SB", text: "coucouuuu tu." },
        { type: "SB", text: "c'est le tu serveur." },
      ],

        sc1_vous : [  { type: "SB", text: "coucouuuu vous." },
        { type: "SB", text: "c'est le vous serveur." },
      ] 
      }

      fakeData = data[_targetScenario]
    //   console.log(name)
    //   Songs.findOne({name:name})
    return fakeData
    }
});
  