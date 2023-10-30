import { FlowRouter } from "meteor/ostrio:flow-router-extra";

import "../../ui/pages/completed.js";
import "../../ui/pages/waiting.js";
import "../../ui/pages/show.js";
import "../../ui/pages/songs/berceuse.js";
import "../../ui/pages/songs/karaoke.js";
import "../../ui/pages/songs/lettre.js";

import { Songs } from "../../API/songs/songs.js";

let fireReload = false;

FlowRouter.route("/waiting", {
  name: "waiting",
  action() {
    this.render("waiting");
  },
});

FlowRouter.route("/", {
  name: "show",
  triggersEnter: [reloadCheck],
  action() {
    this.render("show");
  },
  triggersExit: [routeCleanup],
});

FlowRouter.route("/bibliotheque", {
  name: "completed",
  action() {
    this.render("completed");
  },
});

FlowRouter.route("/song/:_uuid/", {
  name: "song",
  action(params, queryParams, _song) {
    // console.log(queryParams.scenario, params.uuid, _song)
    this.render(queryParams.scenario, { uuid: params.uuid, data: _song });
    // this.render(queryParams.scenario, {uuid: params.uuid, song:_song});
  },
  waitOn(params) {
    // console.log(params._uuid);
    return Meteor.subscribe("songs", { uuid: params._uuid });
  },
  data(params, queryParams, qs) {
    return (_song = Songs.findOne());
  },
  triggersExit: [
    (trackRouteClose = function () {
      document.getElementsByTagName("head")[0].lastElementChild.remove();
    }),
  ],
});

function reloadCheck(context, redirect, stop) {
  if (fireReload) {
    // console.log(dataFridge);
    dataFridge = [];
    // console.log("Reloading ...");
    // console.log(dataFridge);
    // FlowRouter.reload();
    // stop();
  }
}

function routeCleanup() {
  fireReload = !fireReload;
}
