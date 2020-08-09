import { NotFoundException } from '../error/not-found-exception';
import { ConflictException } from '../error/conflict-exception';
import * as QuestionService from '../question/service';
import { GetQuestionsOfMeetingResponse } from '../question/Question';
import { Meeting, MeetingBody, MeetingStatus } from './Meeting';
import * as MeetingRepository from './repository';

export const getMeeting = async (meetingId: Meeting['id']): Promise<Meeting> => {
  const meeting = await MeetingRepository.getMeeting(meetingId);

  if (!meeting || meeting.status === MeetingStatus.Deleted) {
    throw new NotFoundException();
  }

  return meeting;
};

export const createMeeting = (meeting: MeetingBody): Promise<Pick<Meeting, 'id'>> => {
  return MeetingRepository.createMeeting(meeting);
};

export const deleteMeeting = async (meetingId: Meeting['id']): Promise<void> => {
  return MeetingRepository.deleteMeeting(meetingId);
};

export const updateMeeting = async (
  meetingId: Meeting['id'],
  meeting: Partial<MeetingBody>
): Promise<void> => {
  return MeetingRepository.updateMeeting(meetingId, meeting);
};

export const getQuestionsOfMeeting = async (
  meetingId: Meeting['id']
): Promise<GetQuestionsOfMeetingResponse> => {
  return QuestionService.getQuestionsOfMeeting(meetingId);
};

export const getOpenMeeting = async (meetingId: Meeting['id']): Promise<Meeting> => {
  const meeting = await MeetingRepository.getMeeting(meetingId);

  if (!meeting || meeting.status === MeetingStatus.Deleted) {
    throw new NotFoundException();
  }

  if (meeting.status !== MeetingStatus.Open) {
    throw new ConflictException();
  }

  return meeting;
};
