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
        inputs.dictionary[inputs.newKey] = inputs.value;
        return inputs.dictionary;
      }
    }

  },


  fn: function(inputs, exits) {
    inputs.dictionary[inputs.newKey] = inputs.value;
    return exits.success(inputs.dictionary);
  }

};
