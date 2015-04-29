module.exports = {


  friendlyName: 'List keys',


  description: 'List all the keys in the provided dictionary.',


  sync: true,


  cacheable: true,


  inputs: {

    dictionary: {
      friendlyName: 'Dictionary',
      description: 'The dictionary whose keys will be listed.',
      typeclass: 'dictionary',
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
      example: ['email']
    }

  },


  fn: function(inputs, exits) {
    return exits.success(Object.keys(inputs.dictionary));
  }

};
