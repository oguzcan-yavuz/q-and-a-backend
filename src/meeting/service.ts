import * as MeetingRepository from './repository';
import { Meeting, MeetingBody, MeetingStatus } from './Meeting';
import { NotFoundException } from '../error/not-found-exception';

export const getMeeting = async (id: string): Promise<Meeting> => {
  const meeting = await MeetingRepository.getMeeting(id);

  if (!meeting || meeting.status === MeetingStatus.Deleted) {
    throw new NotFoundException();
  }

  return meeting;
};

export const createMeeting = (meeting: MeetingBody): Promise<Pick<Meeting, 'id'>> => {
  return MeetingRepository.createMeeting(meeting);
};

export const deleteMeeting = async (id: string): Promise<void> => {
  return MeetingRepository.deleteMeeting(id);
};

export const updateMeeting = async (id: string, meeting: Partial<MeetingBody>): Promise<void> => {
  return MeetingRepository.updateMeeting(id, meeting);
};
