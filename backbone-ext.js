// Backbone Extensions
// ===================

// Version 0.1.0

// Allow an object to translate a concrete event, such as a click,
// into an abstract event that its listeners can act on.
// Example use in an events hash:
// 'click .draw-graph': Backbone.proxy('redraw')

Backbone.proxy = function(event_name) {
  return function() { this.trigger(event_name); };
};

//= Controller =

// An alias for View, for semantic clarity.
Backbone.Controller = Backbone.View.extend({});

//= getModelName =

// Extend Backbone models to enable getting the model name from the urlRoot.
Backbone.Model.prototype.getModelName = function() {
  return this.urlRoot.replace(/api\//g, '').replace(/[s]*\//g, '');
};

//= toDisplay =

// Extend Backbone models to add `toDisplay`, similar to `toJSON`,
// except it handles `moment` format objects nicely.
// Can be given a `date_format` in the `options` hash.
Backbone.Model.prototype.toDisplay = function(options) {
  options || (options = {});
  var cloned_attrs, date_format;
  cloned_attrs = _.clone(this.attributes);

  // If moment is available, check if any values are moment objects,
  // and format them appropriately.
  if (typeof moment !== 'undefined') {
    date_format = options.date_format || 'MM/DD/YYYY';
    _.each(cloned_attrs, function(value, key) {
      if (moment.isMoment(value)) {
        cloned_attrs[key] = value.format(date_format);
      }
    });
  }
  return cloned_attrs;
};

// Map `toDisplay` on each model in the collection.
Backbone.Collection.prototype.toDisplay = function(options) {
  return this.map(function(model){ return model.toDisplay(options); });
};

//= fetchAndAddOne =

// Fetch a model object by id and add to collection.
Backbone.Collection.prototype.fetchAndAddOne = function(id) {
  var model_obj = new this.model({id: id});
  this.add(model_obj);
  // Return the jQuery XMLHttpRequest object (returned by $.ajax())
  return model_obj.fetch();
};

//= addUnique =

// Add only models not already in this collection.
Backbone.Collection.prototype.addUnique = function(models, options) {
  options || (options = {});
  // Give collections the option to add silently by default.
  if (this.silent_add && options.silent !== false) {
    options = _.extend(options, {silent: true});
  }
  collection = this;
  models = _.isArray(models) ? models.slice() : [models];
  // Reject dupes.
  unique_models = _.reject(models, function(model_obj) {
    is_dupe = collection.any(function(_model_obj) {
      return _model_obj.get('id') === model_obj.id;
    });
    return is_dupe;
  });
  // Finally, call the default add with the unique models.
  Backbone.Collection.prototype.add.call(this, unique_models, options);
};
