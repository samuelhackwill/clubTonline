import { Mongo } from "meteor/mongo";
import SimpleSchema from 'simpl-schema';

export const Songs = new Mongo.Collection("songs");


const schemas = {};

schemas.Songs = new SimpleSchema({
  uuid: {
    type: String,
    label: 'unique URL to get the song',
    max: 200,
  },
  title:{
    type: String,
  },
  timestamp: {
    type: Date,
    label: 'When was the song created',
  },
  private: {
    type: Boolean,
    label: 'if private, do not show at the end',
  },
  scenario: {
    type: String,
    label: 'type of scenario : berceuse, rap ou lettre. used to know which song template to show',
  },
  answers: {
    type: Object,
    label: 'the answers object contains all the data to display text or customize the songs',
    blackbox: true
    // for the time being we don't know what the fields will be called, but next it will be interesting to validate this
  }
});

Songs.attachSchema(schemas.Songs);
