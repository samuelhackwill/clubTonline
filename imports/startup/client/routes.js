import { FlowRouter } from "meteor/ostrio:flow-router-extra";

import "../../ui/pages/home.js";
import "../../ui/pages/show.js";
import "../../ui/pages/songs/berceuse.js";
import "../../ui/pages/songs/karaoke.js";
import "../../ui/pages/songs/lettre.js";

FlowRouter.route("/show", {
  name: "show",
  action() {
    this.render("show");
  },
});

FlowRouter.route("/", {
  name: "home",
  action() {
    this.render("home");
  },
});

FlowRouter.route("/berceuse", {
  name: "berceuse",
  action() {
    this.render("berceuse");
  },
});

FlowRouter.route("/karaoke", {
  name: "karaoke",
  action() {
    this.render("karaoke");
  },
});

FlowRouter.route("/lettre", {
  name: "lettre",
  action() {
    this.render("lettre");
  },
});
