module.exports = {


  friendlyName: 'Dot (.)',


  description: 'Get the value associated with a particular key in a dictionary.',


  extendedDescription: '',


  sync: true,


  cacheable: true,


  inputs: {

    dictionary: {
      friendlyName: 'Dictionary',
      description: 'The dictionary to dereference',
      typeclass: 'dictionary',
      required: true
    },

    keypath: {
      friendlyName: 'Key',
      description: 'The key to look up (can be nested, e.g. "avatar" or "avatar.sizeInBytes")',
      extendedDescription: 'Note that this means that you cannot use this machine to grab the value of keys that **actually** have a dot (.) in them.',
      example: 'mom.email',
      required: true
    }

  },


  defaultExit: 'success',


  exits: {

    error: {
      description: 'Unexpected error occurred.'
    },

    noSuchKey: {
      friendlyName: 'no such key',
      description: 'The specified key does not exist.'
    },

    success: {
      friendlyName: 'then',
      description: 'Done.',
      getExample: function (inputs,env){
        var subtree = inputs.dictionary;
        try {
          env._.each(inputs.keypath.split('.'), function (subkey){
            subtree = subtree[subkey];
          });
        }
        catch (e) {
          return;
        }
        return subtree;
      }
    }

  },


  fn: function(inputs, exits) {
    var _ = require('lodash');

    var subtree = inputs.dictionary;
    try {
      _.each(inputs.keypath.split('.'), function (subkey){
        // Short-circuit when an undefined subtree is discovered
        // to avoid dealing w/ `.code` negotiation w/i the try/catch.
        if (_.isUndefined(subtree)) {
          return subtree;
        }
        subtree = subtree[subkey];
      });
    }
    catch (e) {
      return exits.error(e);
    }

    // key does not exist
    if (_.isUndefined(subtree)) {
      return exits.noSuchKey();
    }

    return exits.success(subtree);
  }

};
