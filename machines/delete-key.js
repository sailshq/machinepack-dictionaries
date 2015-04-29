module.exports = {


  friendlyName: 'Delete key',


  description: 'Delete a key from a dictionary and return the result (a new dictionary).',


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

    success: {
      friendlyName: 'then',
      description: 'Done.',
      getExample: function (inputs){
        delete inputs.dictionary[inputs.key];
        return inputs.dictionary;
      }
    }

  },


  fn: function(inputs, exits) {
    delete inputs.dictionary[inputs.key];
    return exits.success(inputs.dictionary);
  }

};
