module.exports = {


  friendlyName: 'Construct dictionary',


  description: 'Construct a dictionary using the specified keys and values.',


  sync: true,


  cacheable: true,


  inputs: {

    dictionary: {
      description: 'The dictionary to construct.',
      example: {},
      required: true
    }

  },


  exits: {

    error: {
      description: 'Unexpected error occurred.'
    },

    success: {
      friendlyName: 'then',
      description: 'Done.',
      getExample: function(inputs, exits) {
        return inputs.dictionary;
      }
    }

  },


  fn: function(inputs, exits) {
    return exits.success(inputs.dictionary);
  }

};
