import "./dataBubble.html";

Template.dataBubble.onCreated(function(){  
    if (this.data?.name == "fillTheFridge") {
        console.log("get scenario!")
        // Meteor.call("getScenario", "sc.berceuse.tu", (error, result) =>{
        //     console.log(error, result)
        //   })       

    }
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
    },
    isFillTheFridge(){
        if (this.name == "fillTheFridge") {
            return true
        }else{
            return false
        }
    }
  })