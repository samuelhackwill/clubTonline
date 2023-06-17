import { Meteor } from "meteor/meteor";
import { Scenarios } from "../scenarios.js";

// fixtures
import {berceuse_tu} from "../../../startup/server/fixtures/berceuse_tu.js"
import {berceuse_vous} from "../../../startup/server/fixtures/berceuse_vous.js"
import {lettre_tu} from "../../../startup/server/fixtures/lettre_tu.js"
import {lettre_vous} from "../../../startup/server/fixtures/lettre_vous.js"
import {rap_tu} from "../../../startup/server/fixtures/rap_tu.js"
import {rap_vous} from "../../../startup/server/fixtures/rap_vous.js"

const data = {}
data.berceuse_tu = berceuse_tu
data.berceuse_vous = berceuse_vous
data.lettre_tu = lettre_tu
data.lettre_vous = lettre_vous
data.rap_tu = rap_tu
data.rap_vous = rap_vous

Meteor.publish("scenarios", function () {
  return Scenarios.find({});
});

Meteor.methods({
    async getScenario(_targetScenario){
      scenario = data[_targetScenario]
    return scenario
    }
});
  