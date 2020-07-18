import * as Joi from '@hapi/joi';
import { validator } from '../middleware/validator';

const createQuestionSchema = Joi.object()
  .keys({
    body: Joi.object().keys({
      userId: Joi.string().required(),
      meetingId: Joi.string().guid({ version: 'uuidv4' }).required(),
      content: Joi.string().required(),
    }),
  })
  .unknown();

export const createQuestionValidator = validator(createQuestionSchema);
