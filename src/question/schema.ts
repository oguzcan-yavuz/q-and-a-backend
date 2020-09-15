import * as Joi from '@hapi/joi';

export const createQuestionSchema = Joi.object()
  .keys({
    body: Joi.object().keys({
      meetingId: Joi.string().guid({ version: 'uuidv4' }).required(),
      content: Joi.string().required(),
    }),
  })
  .unknown();
