import "./dataBubble.html";

Template.dataBubble.onCreated(function(){  
    this.autorun(() => {
        // maybe ONLY subscribe to answers in the proper scenario to avoid also subscribing to all th edocuments qui concernent d'autres questions?

        //   this.subscribe('todos.inList');
    });
  })