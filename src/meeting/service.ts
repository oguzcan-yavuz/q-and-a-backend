import MeetingRepository from './repository';
import { Meeting } from './Meeting';

const getMeeting = (id: string): Promise<Meeting> => {
  return MeetingRepository.getMeeting(id);
};

export default {
  getMeeting,
};
