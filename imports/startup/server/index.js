import { Meteor } from "meteor/meteor";
import "../../API/mailing/server/publications.js";

import "/imports/API/answers/server/publications.js";
import "/imports/API/songs/server/publications.js";
import "/imports/API/scenarios/server/publications.js";

import "./fixtures.js";

Meteor.startup(() => {
  // console.log("alors, pas encore fini ce site?");
});
