Hello future us! things to bear in mind :

## SCENARIOS

at the moment, the show always start with a default intro, then displays one of three scenarios ("rap" / "berceuse" / "lettre"). It goes like this :

- the /show page loads the default intro stored in show.js
- included in this data are two QCMs (*humeur* & *tutoiement*)
- the answer to these QCMs is stored in a reactive dict (*savedAnswers*) defined in feed.js
- at the end of the default intro there is a data bubble which is responsible for getting the rest of the data for the show (the appropriate *scenario*, one of "rap", "berceuse", or "lettre").

BE ADVISED : changing the default intro data stored in show.js can have side effects because of how the data bubbles decide to load data.

## BUBBLES

Bubbles are the standard component displayed in the feed. Bubbles can be one of two categories : static bubbles and blocking bubbles. When the feed layout is rendered, it will look in its data, and add all the static bubbles it finds until it encounters a blocking bubble, which will cause it to pause.

## STATIC BUBBLES

static bubbles are chain-added to the feed without waiting for user action.

- text only

      { 
        type: "SB", 
        text: "ok super c'est fini!" 
      },

- sticker (WIP)

      { 
        type: "SB", 
        name: "sticker" 
      },

- subscribe (only used in waiting template)

      {
        type: "SB", 
        name: "mailForm" 
      },

- link (only used in waiting template)

      {
        type: "SB", 
        name: "linkNoFuturs" 
      },


## BLOCKING BUBBLES

blocking bubbles are only added to the feed one at a time. User action is required before adding the next element to the feed.


- getScenario bubble (loads the appropriate scenario after the intro. The label changes when the data is loaded)

      {
        type: "---BB---",
        name: "getScenario",
        label: "chargement..."
      }

- Card bubble (displays a "club travail" card, which in turn will add a "form" bubble to the feed when clicked)

      {
        type: "---BB---",
        name: "card.test",
        size: "m" / "s" / "l", 
        label:
          "Cliquez sur moi svp",
      },
      
- Play bubble (displays a button to get next feed elements)
 

      {
        type: "---BB---",
        name: "play",
        label: "continuer"
      }

- End bubble (displays a button to go to songs templates)
 

      {
        type: "---BB---",
        name: "end",
        label: "conclure"
      }

## COMPONENT-CREATED BUBBLES


these bubbles should not be added to the data array. They are automatically added by card components when they are clicked.

- Form bubble (created by the card bubble, passing its size attr and name)

      {
        type: "---BB---",
        name: "form.test",
        save : undefined / true
        size: "s",
      },

- QCM bubble (created by the card bubble, passing its name attr)

      {
        type: "---BB---",
        name: "qcm.test",
        save : undefined / true
        qcmOption : ["oui", "non"]
      },


## DATA BUBBLES

data bubbles are rendered inside bubbles which need to subscribe to data from the server (mongodb). They do not exist in the feed.

- getScenario bubble (which is rendered inside the getScenario blocking bubble)

- spy bubble (rendered inside the form component, it's used to display what the last person on the website answered to the same question)


## What needs refactoring

we went a bit crazy with data-something attributes to store data directly in the html for click events. Where to store state or data is a bit confusing, sometimes it's in the miniMongo client-side collection, sometimes it's directly in the html. I guess i did that to *not* use Meteor's reactivity when it wasn't necessary and to keep database reading to a minimum, but it might be good to define clearly what is stored in hmtl datasets and what is in the miniMongo collection.

Also the wild-ass string formating with regexes to go from a card name "card_test" to a form name "form_test" to the database is a bit messy. As of today the database answers are identified with "form_test" names for instance.