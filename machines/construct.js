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
      getExample: function(inputs, env) {
        var _ = env._;

        // If no `dictionary` is available yet, the best we can do is set the exit example
        // to `{}`, since we don't have enough information.  At least we know it will be a
        // dictionary.
        if (_.isUndefined(inputs.dictionary)) {
          return {};
        }

        return inputs.dictionary;
      }
    }

  },


  fn: function(inputs, exits) {
    return exits.success(inputs.dictionary);
  }

};
