module.exports = {


  friendlyName: 'Delete key',


  description: 'Delete a key from a dictionary and return the result (a new dictionary).',


  sync: true,


  cacheable: true,


  inputs: {

    dictionary: {
      friendlyName: 'Dictionary',
      description: 'The dictionary to delete the key from.',
      example: {},
      required: true
    },

    key: {
      friendlyName: 'Key',
      description: 'The key to delete.',
      example: 'password',
      required: true
    }

  },


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
      getExample: function (inputs, env){
        var _ = env._;

        // If `dictionary` is not available yet, the best we can do is set the
        // exit example to `{}`, since we don't have enough information.
        if (_.isUndefined(inputs.dictionary)) {
          return {};
        }

        // If `key` is not available yet, the best we can do is set exit example
        // to `{}` because, although we know the initial properties of the dictionary,
        // we don't know which key will be removed in the results.
        if (_.isUndefined(inputs.key)) {
          return {};
        }

        // Otherwise we have enough information to send back a guaranteed example.
        // (we don't know for sure that the key will exist, but we know what type schema
        //  to expect _if it does_)
        delete inputs.dictionary[inputs.key];
        return inputs.dictionary;
      }
    }

  },


  fn: function(inputs, exits) {
    var _ = require('lodash');
    if (_.isUndefined(inputs.dictionary[inputs.key])){
      return exits.noSuchKey();
    }
    delete inputs.dictionary[inputs.key];
    return exits.success(inputs.dictionary);
  }

};
