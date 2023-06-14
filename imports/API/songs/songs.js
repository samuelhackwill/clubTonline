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
    type: Array,
    label: 'Array of objects containing all the data to display text or customize the songs',
  },
  'answers.$':{
    type: Object,
    label: 'the objects are used to customize the songs.'
  }
});

Songs.attachSchema(schemas.Songs);
