import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// import '../../ui/pages/song.js';
// import '../../ui/pages/office.js';
// import '../../ui/pages/home.js';
import '../../ui/pages/show.js';

FlowRouter.route('/show', {
    name: 'show',
    action() {
      BlazeLayout.render("show")
    }
  });
  