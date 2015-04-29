module.exports = {


  friendlyName: 'Add new key',


  description: 'Add a new key to a dictionary.',


  extendedDescription: '',


  sync: true,


  cacheable: true,


  inputs: {

    dictionary: {
      friendlyName: 'Dictionary',
      description: 'The dictionary where the new key will be added.',
      typeclass: 'dictionary',
      required: true
    },

    newKey: {
      friendlyName: 'New key',
      description: 'A name for the new key.',
      example: 'twitterUsername',
      required: true
    },

    value: {
      friendlyName: 'Value',
      description: 'The value to associate with the new key.',
      typeclass: '*',
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

        var force = _.isUndefined(inputs.force) ? true : inputs.force;
        if (!force && !_.isUndefined(inputs.dictionary[inputs.newKey])) {
          return;
        }
        inputs.dictionary[inputs.newKey] = inputs.value;
        return inputs.dictionary;
      }
    }

  },


  fn: function(inputs, exits) {
    var _ = require('lodash');

    var force = _.isUndefined(inputs.force) ? true : inputs.force;
    if (!force && !_.isUndefined(inputs.dictionary[inputs.newKey])) {
      return exits.keyAlreadyExists();
    }
    inputs.dictionary[inputs.newKey] = inputs.value;
    return exits.success(inputs.dictionary);
  }

};
