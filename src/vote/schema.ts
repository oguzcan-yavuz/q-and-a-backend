import * as Joi from '@hapi/joi';
import { validator } from '../middleware/validator';
import { VoteType } from './Vote';

export const voteQuestionSchema = Joi.object()
  .keys({
    pathParameters: Joi.object().keys({
      questionId: Joi.string().guid({ version: 'uuidv4' }).required(),
    }),
    body: Joi.object().keys({
      type: Joi.number()
        .valid(...Object.values(VoteType).filter((voteType) => typeof voteType === 'number'))
        .strict()
        .required(),
    }),
  })
  .unknown();

export const getVotesOfCurrentUserSchema = Joi.object()
  .keys({
    pathParameters: Joi.object().keys({
      meetingId: Joi.string().guid({ version: 'uuidv4' }).required(),
    }),
  })
  .unknown();

export const voteQuestionValidator = validator(voteQuestionSchema);
export const getVotesOfCurrentUserValidator = validator(getVotesOfCurrentUserSchema);
