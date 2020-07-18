import { NotFoundException } from '../error/not-found-exception';
import * as QuestionService from '../question/service';
import { GetQuestionsOfMeetingResponse } from '../question/Question';
import { Meeting, MeetingBody, MeetingStatus } from './Meeting';
import * as MeetingRepository from './repository';

export const getMeeting = async (id: Pick<Meeting, 'id'>): Promise<Meeting> => {
  const meeting = await MeetingRepository.getMeeting(id);

  if (!meeting || meeting.status === MeetingStatus.Deleted) {
    throw new NotFoundException();
  }

  return meeting;
};

export const createMeeting = (meeting: MeetingBody): Promise<Pick<Meeting, 'id'>> => {
  return MeetingRepository.createMeeting(meeting);
};

export const deleteMeeting = async (id: Pick<Meeting, 'id'>): Promise<void> => {
  return MeetingRepository.deleteMeeting(id);
};

export const updateMeeting = async (
  id: Pick<Meeting, 'id'>,
  meeting: Partial<MeetingBody>
): Promise<void> => {
  return MeetingRepository.updateMeeting(id, meeting);
};

export const getQuestionsOfMeeting = async (
  id: Pick<Meeting, 'id'>
): Promise<GetQuestionsOfMeetingResponse> => {
  return QuestionService.getQuestionsOfMeeting(id);
};
