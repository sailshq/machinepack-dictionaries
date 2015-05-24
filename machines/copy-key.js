module.exports = {


  friendlyName: 'Copy key',


  description: 'Copy a key in a dictionary and return the result (a new dictionary).',


  sync: true,


  cacheable: true,


  inputs: {

    dictionary: {
      friendlyName: 'Dictionary',
      description: 'The dictionary where the key will be copied.',
      example: {},
      required: true
    },

    originalKey: {
      friendlyName: 'Existing key',
      description: 'The name of the existing key whose value will be copied.',
      example: 'githubUsername',
      required: true
    },

    newKey: {
      friendlyName: 'New key',
      description: 'A name for the new key.',
      example: 'twitterUsername',
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


  exits: {

    error: {
      description: 'Unexpected error occurred.'
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
          return exits.noSuchKey();
        }

        if (!inputs.force && !_.isUndefined(inputs.dictionary[inputs.newKey])) {
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

    var force = _.isUndefined(inputs.force) ? true : inputs.force;
    if (!force && !_.isUndefined(inputs.dictionary[inputs.newKey])) {
      return exits.keyAlreadyExists();
    }

    inputs.dictionary[inputs.newKey] = value;
    return exits.success(inputs.dictionary);
  }

};
