Template.Mongol_docViewer.helpers({
  activeDocument: function () {
    var collectionName = String(this);
    var currentCollection = Mongol.Collection(collectionName);
    var documents = currentCollection.find({}, {transform: null}).fetch();
    var sessionKey = "Mongol_" + String(this);
    var docNumber = MeteorToysDict.get(sessionKey);
    var docCurrent = documents[docNumber];
    return docCurrent;
  },
  documentJSON: function () {
    var docCurrent = this;
    var json_output = JSON.stringify(docCurrent, null, 2), colorize;

    if (!(json_output === undefined)) {
      colorize = Mongol.colorize(json_output);
    } else {
      colorize = json_output;
    }

    return colorize;

  },
  editContent: function () {

    var editMode = MeteorToysDict.get("Mongol_editMode");

    if (editMode) {
      return "true";
    }

  },
  editStyle: function () {

    var editMode = MeteorToysDict.get("Mongol_editMode");

    if (editMode) {
      return "Mongol_editable";
    }

  },
  notEmpty: function () {
    var documentCount = Mongol.Collection(String(this)) && Mongol.Collection(String(this)).find().count() || 0;
    if (documentCount >= 1) {
      return true;
    }
  },
  noInlineEditing: function () {
    return MeteorToysDict.get('Mongol_noInlineEditing');  
  }
});

// Will possibly be used in augmented document udpate UI
/*Template.Mongol_docViewer.events({

  'click .Mongol_string' : function (evt,tmpl) {
    var field = $(evt.target).prevAll(".Mongol_key:first").text().slice(1,-2);
    MeteorToysDict.set('Mongol_inlineEdit',true);
    Tracker.flush();
    // Do something to trigger the editable text element
  }

});*/
