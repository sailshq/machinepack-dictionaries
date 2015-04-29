module.exports = {


  friendlyName: 'Rename key',


  description: 'Rename a key in a dictionary and return the result (a new dictionary).',


  extendedDescription: '',


  sync: true,


  cacheable: true,


  inputs: {

    dictionary: {
      friendlyName: 'Dictionary',
      description: 'The dictionary to rename the key in.',
      typeclass: 'dictionary',
      required: true
    },

    originalKey: {
      friendlyName: 'Original key',
      description: 'The key to rename.',
      example: 'studentName',
      required: true
    },

    newKey: {
      friendlyName: 'New key',
      description: 'A new name for the key.',
      example: 'studentFullName',
      required: true
    },

    force: {
      friendlyName: 'Overwrite?',
      description: 'Whether to overwrite an existing key with the same name if there is a conflict.',
      example: true,
      defaultsTo: true,
      advanced: true
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

    keyAlreadyExists: {
      friendlyName: 'key already exists',
      description: 'An existing key is already using the specified name for the new key.',
      extendedDescription: 'You can force this machine to overwrite the existing key by enabling the `force` input.'
    },

    success: {
      friendlyName: 'then',
      description: 'Done.',
      getExample: function (inputs, env){
        var _ = env._;
        var value = inputs.dictionary[inputs.originalKey];
        if (_.isUndefined(value)) {
          return;
        }
        delete inputs.dictionary[inputs.originalKey];
        if (!inputs.force && !env._.isUndefined(inputs.dictionary[inputs.newKey])) {
          return;
        }
        inputs.dictionary[inputs.newKey] = value;
        return inputs.dictionary;
      }
    }

  },


  fn: function(inputs, exits) {
    var _ = require('lodash');
    var value = inputs.dictionary[inputs.originalKey];
    if (_.isUndefined(value)) {
      return exits.noSuchKey();
    }
    delete inputs.dictionary[inputs.originalKey];
    if (!inputs.force && !_.isUndefined(inputs.dictionary[inputs.newKey])) {
      return exits.keyAlreadyExists();
    }
    inputs.dictionary[inputs.newKey] = value;
    return exits.success(inputs.dictionary);
  }

};
