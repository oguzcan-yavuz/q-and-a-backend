import * as Joi from '@hapi/joi';
import { validator } from '../middleware/validator';

const getMeetingSchema = Joi.object()
  .keys({
    pathParameters: Joi.object().keys({
      meetingId: Joi.string().guid({ version: 'uuidv4' }).required(),
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
        electionEndDate: Joi.date().iso().greater('now'),
        plannedAnswerDate: Joi.date().iso().greater('now'),
      }),
    }),
  })
  .unknown();

const deleteMeetingSchema = Joi.object()
  .keys({
    pathParameters: Joi.object().keys({
      meetingId: Joi.string().guid({ version: 'uuidv4' }).required(),
    }),
  })
  .unknown();

const updateMeetingSchema = Joi.object()
  .keys({
    pathParameters: Joi.object().keys({
      meetingId: Joi.string().guid({ version: 'uuidv4' }).required(),
    }),
    body: Joi.object().keys({
      title: Joi.string(),
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

const getQuestionsOfMeetingSchema = Joi.object()
  .keys({
    pathParameters: Joi.object().keys({
      meetingId: Joi.string().guid({ version: 'uuidv4' }).required(),
    }),
  })
  .unknown();

export const createMeetingValidator = validator(createMeetingSchema);
export const getMeetingValidator = validator(getMeetingSchema);
export const deleteMeetingValidator = validator(deleteMeetingSchema);
export const updateMeetingValidator = validator(updateMeetingSchema);
export const getQuestionsOfMeetingValidator = validator(getQuestionsOfMeetingSchema);
