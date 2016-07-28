module.exports = {


  friendlyName: 'Construct dictionary',


  description: 'Construct a dictionary using the specified keys and values.',


  sync: true,


  sideEffects: 'cacheable',


  inputs: {

    dictionary: {
      description: 'The dictionary to construct.',
      example: {},
      required: true
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'New dictionary',
      outputDescription: 'The new dictionary.',
      getExample: function(inputs, env) {
        var _ = env._;

        // If no `dictionary` is available yet, the best we can do is set the exit example
        // to `{}`, since we don't have enough information.  At least we know it will be a
        // dictionary.
        if (_.isUndefined(inputs.dictionary)) {
          return {};
        }

        return env.rttc.coerceExemplar(inputs.dictionary, false, false, true);
      }
    }

  },


  fn: function(inputs, exits) {

    // Simply return the input dictionary through the `success` exit.
    return exits.success(inputs.dictionary);

  }

};
