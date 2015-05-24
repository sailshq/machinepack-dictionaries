module.exports = {


  friendlyName: 'Merge dictionaries',


  description: 'Merge two dictionaries together and return the result (a new dictionary)',


  sync: true,


  cacheable: true,


  extendedDescription: '',


  inputs: {

    primary: {
      description: 'The dictionary whose keys will take precedence.',
      example: {},
      required: true
    },

    secondary: {
      description: 'The dictionary whose keys may be overridden by `primary`.',
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
      getExample: function(inputs, env) {
        return env._.merge(env._.merge({}, inputs.secondary), inputs.primary);
      }
    }

  },


  fn: function(inputs, exits) {
    var _ = require('lodash');

    return exits.success(_.merge(_.merge({}, inputs.secondary), inputs.primary));
  }


};
