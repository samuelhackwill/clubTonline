import { savedAnswers } from "../layouts/feed";
import "./dataBubble.html";

Template.dataBubble.onCreated(function(){  
    this.loaded = new ReactiveVar(null);

    if (this.data.name == "getScenario") {

        switch (savedAnswers.get("humeur")) {
            case "d’humeur à mordre mon ordinateur":
                _targetScenario = _targetScenario + "rap"
                break;

            case "plutôt d’humeur à faire une sieste en forêt":
                _targetScenario = _targetScenario + "berceuse"
                break;

            case "d’humeur à écrire une lettre au ministre de l’emploi":
            _targetScenario = _targetScenario + "lettre"
            break;
        }

        Meteor.subscribe('answers', {scenario : _targetScenario});
        Answers = new Mongo.Collection('answers');

        switch (savedAnswers.get("tutoie")) {
            case "le vouvoiement c'est bien":
                _targetScenario = _targetScenario + "_vous"
                break;

            case "je préfère tu":
                _targetScenario = _targetScenario + "_tu"
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

    if (this.data.name == "getTarot") {
        this.src = new ReactiveVar(null);

        Meteor.call("getTarot", (error, result) =>{
            console.log("THIS" , this)     
            if (!error) {    
                console.log(result)   
                this.src.set(result)
                // this.loaded.set(true)
            }else{
                // this.loaded.set(false)
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
    isGetScenario(){
        if (this.name == "getScenario") {
            return true
        }else{
            return false
        }
    },
    isGetTarot(){
        if (this.name == "getTarot") {
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
    },
    getRandomAnswer(){
        return {
            status : Answers.findOne({question:this.name})?.answer != undefined,
            content : Answers.findOne({question:this.name})?.answer
        }
    },
    getTarotSRC(){
        console.log("get tarot src ", Template.instance().src.get())
        return Template.instance().src.get()
    }
  })

Template.dataBubble.events({

    "click .tarotButton"(event) {
    event.target.parentElement.classList.add(
        "rotate-y-180",
        "pointer-events-none"
    );
    event.target.classList.add("opacity-0");
    // state.set("gettingMoreElements");

    setTimeout(function(){
        addNextItem();
    },2000)

}


})    