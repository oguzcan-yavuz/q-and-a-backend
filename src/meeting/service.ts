import * as MeetingRepository from './repository';
import { Meeting } from './Meeting';
import { NotFoundException } from '../error/not-found-exception';

export const getMeeting = async (id: string): Promise<Meeting> => {
  const meeting = await MeetingRepository.getMeeting(id);

  if (!meeting) {
    throw new NotFoundException();
  }

  return meeting;
};

export const createMeeting = (meeting: Omit<Meeting, 'id'>): Promise<Pick<Meeting, 'id'>> => {
  return MeetingRepository.createMeeting(meeting);
};
