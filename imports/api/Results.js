import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Results = new Mongo.Collection('results');

 
Meteor.methods({
  'results.compute'(result) {
    Results.insert({
            result: result,
            owner: Meteor.userId(),
            username: Meteor.user().username,
            createdAt: new Date()
    });
  },
   'results.delete'(Id) {
        var result = Results.findOne(Id);
        Results.remove(Id);
    }

});


