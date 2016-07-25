module.exports = {


  friendlyName: 'Dot (.)',


  description: 'Get the value associated with a particular key in a dictionary.',


  sync: true,


  sideEffects: 'cacheable',


  inputs: {

    dictionary: {
      description: 'The dictionary to dereference.',
      example: {},
      required: true
    },

    keypath: {
      friendlyName: 'Key',
      description: 'The key to look up (can be nested, e.g. "avatar" or "avatar.sizeInBytes").',
      extendedDescription: 'Note that this means that you cannot use this machine to grab the value of keys that **actually** have a dot (.) in them.',
      example: 'mom.email',
      constant: true,
      required: true
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Key value',
      outputDescription: 'The value at the specified key path of the input dictionary.',
      getExample: function (inputs,env){
        var _ = env._;

        // If no `dictionary` is available yet, the best we can do is set the exit example
        // to `*`, since we don't have enough information.
        if (_.isUndefined(inputs.dictionary)) {
          return '*';
        }

        // If no `keypath` is available yet, the best we can do is set the exit example
        // to `*`, since we don't have enough information.
        if (_.isUndefined(inputs.keypath)) {
          return '*';
        }

        // Take a look at the value that's currently at the requested keypath
        var valueAtKeypath = _.get(inputs.dictionary, inputs.keypath);
        // If it is defined, then we can use it.  Otherwise, we can't.
        if (_.isUndefined(valueAtKeypath)) {
          return;
        }
        return valueAtKeypath;
      }
    },

    noSuchKey: {
      description: 'The specified key does not exist.'
    },

  },


  fn: function(inputs, exits) {
    var _ = require('lodash');

    var value = _.get(inputs.dictionary, inputs.keypath);
    if (_.isUndefined(value)) {
      return exits.noSuchKey();
    }
    return exits.success(value);
  }

};
