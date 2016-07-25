module.exports = {


  friendlyName: 'List keys',


  description: 'List all the keys in the provided dictionary.',


  sync: true,


  sideEffects: 'cacheable',


  inputs: {

    dictionary: {
      description: 'The dictionary whose keys will be listed.',
      example: {},
      required: true
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Keys',
      outputDescription: 'The array of keys from the specified dictionary.',
      outputExample: ['email']
    }

  },


  fn: function(inputs, exits) {
    return exits.success(Object.keys(inputs.dictionary));
  }

};
