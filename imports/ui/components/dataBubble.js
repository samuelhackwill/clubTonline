import { savedAnswers } from "../layouts/feed";
import "./dataBubble.html";

Template.dataBubble.onCreated(function(){  
    this.loaded = new ReactiveVar(null);

    _targetScenario = ""

    if (this.data.name == "fillTheFridge") {

        switch (savedAnswers.get("qcmForm.tutoie")) {
            case "le vouvoiement c'est bien":
                _targetScenario = "sc1_vous"
                break;

            case "call me tu":
                _targetScenario = "sc1_tu"
                break;
        
            default:
                break;
        }


        Meteor.call("getScenario", _targetScenario, (error, result) =>{
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