import * as Joi from '@hapi/joi';

const getMeeting = Joi.object()
  .keys({
    pathParameters: Joi.object().keys({
      id: Joi.string(),
    }),
  })
  .unknown();

const createMeeting = Joi.object()
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

export default {
  getMeeting,
  createMeeting,
};
