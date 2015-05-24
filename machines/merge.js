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
        var _ = env._;

        // If `primary` is not available yet, there won't be any keys removed
        // from what's provided by `secondary`, but there could be plenty of
        // new keys added or existing keys overridden.
        // So the best we can do is return `{}`.
        if (_.isUndefined(inputs.primary)) {
          return {};
        }

        // If `secondary` is not available yet, there won't be any keys removed
        // or overridden from `primary`, but there could still be keys added.
        // So the best we can do is return `{}`.
        if (_.isUndefined(inputs.secondary)) {
          return {};
        }

        // If both are defined, we can calculate the example.
        return _.merge(_.merge({}, inputs.secondary), inputs.primary);
      }
    }

  },


  fn: function(inputs, exits) {
    var _ = require('lodash');

    return exits.success(_.merge(_.merge({}, inputs.secondary), inputs.primary));
  }


};
