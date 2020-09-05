import { NotFoundException } from '../error/not-found-exception';
import { ConflictException } from '../error/conflict-exception';
import { QuestionService } from '../question/service';
import { GetQuestionsOfMeetingResponse } from '../question/Question';
import { Meeting, MeetingBody, MeetingStatus } from './Meeting';
import * as MeetingRepository from './repository';
import { Service } from 'typedi';

@Service()
export class MeetingService {
  constructor(private readonly questionService: QuestionService) {}
  async getMeeting(meetingId: Meeting['id']): Promise<Meeting> {
    const meeting = await MeetingRepository.getMeeting(meetingId);

    if (!meeting || meeting.status === MeetingStatus.Deleted) {
      throw new NotFoundException();
    }

    return meeting;
  }

  createMeeting(meeting: MeetingBody): Promise<Pick<Meeting, 'id'>> {
    return MeetingRepository.createMeeting(meeting);
  }

  async deleteMeeting(meetingId: Meeting['id']): Promise<void> {
    return MeetingRepository.deleteMeeting(meetingId);
  }

  async updateMeeting(meetingId: Meeting['id'], meeting: Partial<MeetingBody>): Promise<void> {
    return MeetingRepository.updateMeeting(meetingId, meeting);
  }

  async getQuestionsOfMeeting(meetingId: Meeting['id']): Promise<GetQuestionsOfMeetingResponse> {
    return this.questionService.getQuestionsOfMeeting(meetingId);
  }

  async getOpenMeeting(meetingId: Meeting['id']): Promise<Meeting> {
    const meeting = await MeetingRepository.getMeeting(meetingId);

    if (!meeting || meeting.status === MeetingStatus.Deleted) {
      throw new NotFoundException();
    }

    if (meeting.status !== MeetingStatus.Open) {
      throw new ConflictException();
    }

    return meeting;
  }
}
