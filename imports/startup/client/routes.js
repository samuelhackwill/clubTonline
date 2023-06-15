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

FlowRouter.route('/song/:_uuid/', {
  name: 'song',
  action(params) {
    // All passed parameters is available as Object:
    console.log(params);
    // { _id: 'article_id', slug: 'article-slug' }

    // Pass params to Template's context
    // this.render('article', params);
  },
  waitOn(params) {
    // return Meteor.subscribe('article', params._id);
  }
});
