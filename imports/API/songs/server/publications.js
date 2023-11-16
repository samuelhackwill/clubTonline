import { Meteor } from "meteor/meteor";
import { Songs } from "../songs.js";

Meteor.publish("songs", function (_params) {
  // console.log("publishing song ", _params.uuid);
  return Songs.find({ uuid: _params.uuid });
});

Meteor.methods({
  async makeSong(_uuid, _data, _scenario) {
    // Meteor.setTimeout(function(){return "zobbbb"},1000)
    _title = null;

    switch (_scenario) {
      case "lettre":
        _title = _data.answers?.lettre_tarot3;
        break;

      case "rap":
        _title = _data.answers?.rap_titre;
        break;

      case "berceuse":
        _title = _data.answers?.berceuse_sac;
        break;

      default:
        _title = "Chanson sans titre";
        break;
    }

    // console.log(_uuid, _data);
    Songs.insert({
      uuid: _uuid,
      title: _title,
      timestamp: new Date(),
      private: false,
      scenario: _scenario,
      answers: _data.answers,
    });
  },

  getSong(_uuid) {
    // console.log("get song ", _uuid);
    return Songs.find({ uuid: _uuid }).fetch();
  },

  getAllSongs() {
    // console.log("get all songs");
    return Songs.find({}, { sort: { timestamp: -1 } }).fetch();
  },
});
