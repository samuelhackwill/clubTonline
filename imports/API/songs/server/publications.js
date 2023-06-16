import { Meteor } from "meteor/meteor";
import { Songs } from "../songs.js";

Meteor.publish("songs", function () {
  return Songs.find({});
});

Meteor.methods({
  async makeSong(_uuid, _data){
    // Meteor.setTimeout(function(){return "zobbbb"},1000)
    console.log(_uuid, _data)
    Songs.insert({uuid:_uuid, timestamp:new Date(), private:false, scenario:_data.scenario, answers:_data.answers})
  }
});
