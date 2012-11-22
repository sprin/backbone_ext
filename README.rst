===================
Backbone Extensions
===================
:Info: See `github <http://github.com/sprin/backbone_ext>`_ for the latest
	   source.
:Version: 0.1.0
:License: MIT, see LICENSE file.

About
=====
Just some extensions we have found useful for a Supervisory MVC structure:

Utility
-------
 - ``Backbone.proxy``

   Translate a concrete event into an abstract event, or simply pass the
   message up the MVC chain.

Controller
----------
 - ``Backbone.Controller``

   An alias for View, for semantic clarity.

Model
-----
 - ``getModelName``

   Get the model name from the urlRoot, assuming a URL naming convention of 
   ``/api/<model_name>``.

 - ``toDisplay``

   Similar to ``toJSON``, but formats `moment.js <http://momentjs.com/>`_ objects with supplied date
   format.

Collection
----------

 - ``toDisplay``

   Map ``toDisplay`` on each model in the collection.

 - ``fetchAndAddOne``

   Fetch a model object by id and add it to the collection.

 - ``addUnique``

   Add only models not already in collection, rejecting models with duplicate
   ids.
