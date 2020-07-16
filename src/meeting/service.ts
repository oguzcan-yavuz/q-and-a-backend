import * as MeetingRepository from './repository';
import { Meeting } from './Meeting';

export const getMeeting = (id: string): Promise<Meeting> => {
  return MeetingRepository.getMeeting(id);
};

export const createMeeting = (meeting: Omit<Meeting, 'id'>): Promise<Pick<Meeting, 'id'>> => {
  return MeetingRepository.createMeeting(meeting);
};
