import { Meteor } from 'meteor/meteor';

import { Template } from 'meteor/templating';

import { Results } from '../api/Results.js';
 
import './bmicalc.html';
 

if (Meteor.isClient){

Meteor.subscribe('results');


 Template.body.helpers({
  Results() {
    return Results.find({owner: Meteor.userId()}, { sort: { createdAt: -1 } });
  },
 });

 Template.Result_Template.helpers({
  check_if_underweight: function (result) { 
    return result < 18.5 
  },
    check_if_normal: function (result) { 
    return result >= 18.5 && result <= 24.9
  },
  check_if_overweight: function (result) { 
    return result >= 25 && result <= 29.9
  },
  check_if_obese: function (result) { 
    return result >= 30
  },
   formatDate: function (createdAt) {
    return moment(createdAt).format('MM-DD-YYYY');
  },
   result_double: function (result) { return this.result.toFixed(2); },
 });


 Template.body.events({
   'submit #new-ibm': function(e) {
      e.preventDefault();
    	var weight = e.target.weight.value;
    	var inch = e.target.inch.value;
   		var result =  (weight * 703) / (inch * inch);

      Meteor.call('results.compute', result);

      e.target.name.value= '';
			e.target.weight.value= '';
			e.target.inch.value= '';
			document.querySelector('#weight').focus();

    },
   'click #delete-meal': function(e) {
      e.preventDefault();
      Meteor.call('results.delete', this._id);
    },
 });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        if (Meteor.isServer) {
            Meteor.publish('results', function() {
                return Results.find({});
            })
        }
    });
}

