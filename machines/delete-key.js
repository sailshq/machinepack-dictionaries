module.exports = {


  friendlyName: 'Delete key',


  description: 'Delete a key from a dictionary and return the result (a new dictionary).',


  extendedDescription: '',


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
      getExample: function (inputs, env){
        if (env._.isUndefined(inputs.dictionary[inputs.key])){
          return;
        }
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
