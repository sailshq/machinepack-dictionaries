module.exports = {


  friendlyName: 'Rename key',


  description: 'Rename a key in a dictionary and return the result (a new dictionary).',


  sync: true,


  cacheable: true,


  inputs: {

    dictionary: {
      friendlyName: 'Dictionary',
      description: 'The dictionary to rename the key in.',
      example: {},
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

        // If `dictionary` is not available yet, the best we can do is set the
        // exit example to `{}`, since we don't have enough information.
        if (_.isUndefined(inputs.dictionary)) {
          return {};
        }

        // If `originalKey` is not available yet, the best we can do is set exit example
        // to `{}` because, although we know the initial properties of the dictionary,
        // we don't know which key will be replaced in the results.
        if (_.isUndefined(inputs.originalKey)) {
          return {};
        }

        // If `newKey` is not available yet, the best we can do is set exit example
        // to `{}` because, although we know the initial properties of the dictionary,
        // and which key is being removed, we don't know the name of the key to add.
        if (_.isUndefined(inputs.newKey)) {
          return {};
        }

        // If `dictionary[originalKey]` is undefined, we aren't sure yet what type
        // it will be, so we don't know what value to make the new type, which means
        // the best we can do is send back a `{}`.  It's also possible `noSuchKey` will
        // trigger instead.
        if (_.isUndefined(inputs.dictionary[inputs.originalKey])) {
          return {};
        }

        // If `force` is true, we know for sure that the new key will exist, even
        // if there is an old key in the way.
        if (inputs.force) {
          inputs.dictionary[inputs.newKey] = inputs.dictionary[inputs.originalKey];
          delete inputs.dictionary[inputs.originalKey];
          return inputs.dictionary;
        }

        // If force is `false` and the key DOES NOT already exist, we may think the
        // resulting dictionary will have the new key value, but it is also possible
        // that the existing value at that key is just not available yet either.
        // So the best we can do is send back `{}`.
        if (!inputs.force && _.isUndefined(inputs.dictionary[inputs.newKey])) {
          return {};
        }

        // If force is `false` and the key already exists, this exit should
        // not be traversed, so we don't need to worry about it.
        return;
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
