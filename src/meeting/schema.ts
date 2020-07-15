import * as Joi from '@hapi/joi';

const getMeeting = Joi.object()
  .keys({
    pathParameters: Joi.object().keys({
      id: Joi.string(),
    }),
  })
  .unknown();

export default {
  getMeeting,
};
