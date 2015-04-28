Coll = new Mongo.Collection('coll');

if (Meteor.isClient) {

  Template.hello.helpers({
    items: function () {
      return Coll.find();
    }
  });

  Coll.find().observe({
    added: function (doc) {console.log('added', doc)},
    removed: function (doc)  { console.log('removed', doc) }
  });
}

if (Meteor.isServer) {
  Future = Npm.require('fibers/future');
  Coll.allow({
    insert: function () { var f =new Future; setTimeout(function () {f.return()}, 5000); f.wait(); return false; }});
}
