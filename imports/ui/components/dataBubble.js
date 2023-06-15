import "./dataBubble.html";

Template.dataBubble.onCreated(function(){  
    this.autorun(() => {
        // maybe ONLY subscribe to answers in the proper scenario to avoid also subscribing to all the documents qui concernent d'autres questions?

        //   this.subscribe('todos.inList');
    });
  })

Template.dataBubble.helpers({
    isSpy(){
        if (this.answered == true) {
            return true
        }else{
            return false
        }
    }

  })