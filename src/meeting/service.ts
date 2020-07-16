import MeetingRepository from './repository';
import { Meeting } from './Meeting';

const getMeeting = (id: string): Promise<Meeting> => {
  return MeetingRepository.getMeeting(id);
};

const createMeeting = (meeting: Omit<Meeting, 'id'>): Promise<Pick<Meeting, 'id'>> => {
  return MeetingRepository.createMeeting(meeting);
};

export default {
  getMeeting,
  createMeeting,
};
