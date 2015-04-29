module.exports = {


  friendlyName: 'Rename key',


  description: 'Rename a key in a dictionary and return the result (a new dictionary).',


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
        delete inputs.dictionary[inputs.originalKey];
        inputs.dictionary[inputs.newKey] = value;
        return inputs.dictionary;
      }
    }

  },


  fn: function(inputs, exits) {
    var value = inputs.dictionary[inputs.originalKey];
    delete inputs.dictionary[inputs.originalKey];
    inputs.dictionary[inputs.newKey] = value;
    return exits.success(inputs.dictionary);
  }

};
