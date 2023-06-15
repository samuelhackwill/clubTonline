import "./dataBubble.html";

Template.dataBubble.onCreated(function(){  
    this.loaded = new ReactiveVar(null);

    if (this.data.name == "fillTheFridge") {
        Meteor.call("getScenario", "sc1.tu", (error, result) =>{
            if (!error) {            
                for (let index = 0; index < result.length; index++) {
                    dataFridge.push(result[index]);
                }
                this.loaded.set(true)
                addNextItem()

            }else{
                
                this.loaded.set(false)
            }

        })
    }
    
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
    },
    isLoading(){
        if (Template.instance().loaded.get() == false) {
            return "il y a eu une erreur pendant le chargement :("
        }else{
            if (Template.instance().loaded.get() == true) {
                return "ok, c'est noté!"
            }else{
                return "chargement ..."
            }
        }
    }
  })