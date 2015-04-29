module.exports = {


  friendlyName: 'Copy key',


  description: 'Copy a key in a dictionary and return the result (a new dictionary).',


  extendedDescription: '',


  sync: true,


  cacheable: true,


  inputs: {

    dictionary: {
      friendlyName: 'Dictionary',
      description: 'The dictionary where the key will be copied.',
      typeclass: 'dictionary',
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
    }

  },


  defaultExit: 'success',


  exits: {

    error: {
      description: 'Unexpected error occurred.'
    },

    success: {
      friendlyName: 'then',
      description: 'Done.',
      getExample: function (inputs){
        var value = inputs.dictionary[inputs.originalKey];
        inputs.dictionary[inputs.newKey] = value;
        return inputs.dictionary;
      }
    }

  },


  fn: function(inputs, exits) {
    var value = inputs.dictionary[inputs.originalKey];
    inputs.dictionary[inputs.newKey] = value;
    return exits.success(inputs.dictionary);
  }

};
