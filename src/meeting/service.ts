import { NotFoundException } from "../error/not-found-exception";
import { ConflictException } from "../error/conflict-exception";
import * as QuestionService from "../question/service";
import { GetQuestionsOfMeetingResponse } from "../question/Question";
import { Meeting, MeetingBody, MeetingStatus } from "./Meeting";
import * as MeetingRepository from "./repository";

export const getMeeting = async (id: Meeting["id"]): Promise<Meeting> => {
  const meeting = await MeetingRepository.getMeeting(id);

  if (!meeting || meeting.status === MeetingStatus.Deleted) {
    throw new NotFoundException();
  }

  return meeting;
};

export const createMeeting = (
  meeting: MeetingBody
): Promise<Pick<Meeting, "id">> => {
  return MeetingRepository.createMeeting(meeting);
};

export const deleteMeeting = async (id: Meeting["id"]): Promise<void> => {
  return MeetingRepository.deleteMeeting(id);
};

export const updateMeeting = async (
  id: Meeting["id"],
  meeting: Partial<MeetingBody>
): Promise<void> => {
  return MeetingRepository.updateMeeting(id, meeting);
};

export const getQuestionsOfMeeting = async (
  id: Meeting["id"]
): Promise<GetQuestionsOfMeetingResponse> => {
  return QuestionService.getQuestionsOfMeeting(id);
};

export const getOpenMeeting = async (id: Meeting["id"]): Promise<Meeting> => {
  const meeting = await MeetingRepository.getMeeting(id);

  if (!meeting || meeting.status === MeetingStatus.Deleted) {
    throw new NotFoundException();
  }

  if (meeting.status !== MeetingStatus.Open) {
    throw new ConflictException();
  }

  return meeting;
};
