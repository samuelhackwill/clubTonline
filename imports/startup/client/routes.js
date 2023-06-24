import { FlowRouter } from "meteor/ostrio:flow-router-extra";

import "../../ui/pages/waiting.js";
import "../../ui/pages/show.js";
import "../../ui/pages/songs/berceuse.js";
import "../../ui/pages/songs/karaoke.js";
import "../../ui/pages/songs/lettre.js";

import {Songs} from "../../API/songs/songs.js";

FlowRouter.route("/", {
  name: "waiting",
  action() {
    this.render("waiting");
  },
});

FlowRouter.route("/show", {
  name: "show",
  action() {
    this.render("show");
  },
});

FlowRouter.route('/song/:_uuid/', {
  name: 'song',
    action(params, queryParams, _song) {
      // console.log(queryParams.scenario, params.uuid, _song)
      this.render(queryParams.scenario, { uuid: params.uuid, data: _song });
      // this.render(queryParams.scenario, {uuid: params.uuid, song:_song});
    },
    waitOn(params) {
      console.log(params._uuid)
      return Meteor.subscribe('songs', {uuid : params._uuid});
    },
    data(params, queryParams, qs) {
      return _song = Songs.findOne()
    }
});
