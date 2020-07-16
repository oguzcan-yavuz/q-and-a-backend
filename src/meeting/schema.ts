import * as Joi from '@hapi/joi';
import { validator } from '../middleware/validator';

const getMeetingSchema = Joi.object()
  .keys({
    pathParameters: Joi.object().keys({
      id: Joi.string().guid({ version: 'uuidv4' }).required(),
    }),
  })
  .unknown();

const createMeetingSchema = Joi.object()
  .keys({
    body: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string(),
      image: Joi.string(),
      options: Joi.object().keys({
        winnerCount: Joi.number().positive(),
        maxVoteCountPerUser: Joi.number().positive(),
        maxQuestionCountPerUser: Joi.number().positive(),
        electionEndDate: Joi.date().greater('now'),
        plannedAnswerDate: Joi.date().greater('now'),
      }),
    }),
  })
  .unknown();

export const createMeetingValidator = validator(createMeetingSchema);
export const getMeetingValidator = validator(getMeetingSchema);
