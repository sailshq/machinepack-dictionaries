module.exports = {


  friendlyName: 'Add new key',


  description: 'Add a new key to a dictionary.',


  sync: true,


  cacheable: true,


  inputs: {

    dictionary: {
      friendlyName: 'Dictionary',
      description: 'The dictionary where the new key will be added.',
      example: {},
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
      example: '*',
      required: true
    },

    force: {
      friendlyName: 'Overwrite?',
      description: 'Whether to overwrite an existing key with the same name if there is a conflict.',
      example: true,
      defaultsTo: true
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

        // If no `dictionary` or `newKey` is available yet, the best we can do
        // is set the exit example to `{}`, since we don't have enough information.
        if (_.isUndefined(inputs.dictionary) || _.isUndefined(inputs.newKey)) {
          return {};
        }

        // If `force` is undefined, we aren't sure yet whether or not the new key
        // will replace the old.  So whether or not an old key exists, we must fall
        // back to sending down a `{}` (because the old key/value could have fallen
        // back to `undefined` because it was indeterminate, which means it MIGHT be
        // there)
        if (_.isUndefined(inputs.force)) {
          return {};
        }

        // If `value` is undefined, we aren't sure yet what type it will be, so
        // the best we can do is send back a `{}`.
        if (_.isUndefined(inputs.value)) {
          return {};
        }

        // If `force` is true, we know for sure that the new key will exist, even
        // if there is an old key in the way.
        if (inputs.force) {
          inputs.dictionary[inputs.newKey] = inputs.value;
          return inputs.dictionary[inputs.newKey];
        }

        // If force is `false` and the key DOES NOT already exist, we know the
        // resulting dictionary will have the new key value,
        if (!inputs.force && !_.isUndefined(inputs.dictionary[inputs.newKey])) {
          inputs.dictionary[inputs.newKey] = inputs.value;
          return inputs.dictionary[inputs.newKey];
        }

        // If force is `false` and the key already exists, we know this exit should
        // not be traversed, so we will return `undefined`.
        if (!inputs.force && !_.isUndefined(inputs.dictionary[inputs.newKey])) {
          return undefined;
        }
      }
    }

  },


  fn: function(inputs, exits) {
    var _ = require('lodash');

    if (!inputs.force && !_.isUndefined(inputs.dictionary[inputs.newKey])) {
      return exits.keyAlreadyExists();
    }
    inputs.dictionary[inputs.newKey] = inputs.value;
    return exits.success(inputs.dictionary);
  }

};
