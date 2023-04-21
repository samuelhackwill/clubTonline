import { FlowRouter } from "meteor/ostrio:flow-router-extra";

// import '../../ui/pages/song.js';
// import '../../ui/pages/office.js';
import '../../ui/pages/home.js';
import "../../ui/pages/show.js";

FlowRouter.route("/show", {
  name: "show",
  action() {
      this.render('show');
    },
});

FlowRouter.route("/", {
  name: "home",
  action() {
      this.render('home');
    },
});
