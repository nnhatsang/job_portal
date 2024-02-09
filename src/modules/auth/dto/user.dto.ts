import { candidate, user } from '@prisma/client';

// Import necessary dependencies and modules
export class UserDto {
  ID: number;
  username: string;
  candidateInfo?: CandidateDto;
  role: string;

  constructor(
    user: user,
    role: string,
    candidate?: candidate,
    candidateInfo?: CandidateDto,
  ) {
    this.ID = user.ID;
    this.username = user.Username;
    this.role = role;
    this.candidateInfo =
      candidateInfo || (candidate ? new CandidateDto(candidate) : undefined);
    // Add other non-sensitive fields as needed
  }
}

export class CandidateDto {
  constructor(candidate: candidate) {
    this.candidateID = candidate.ID;
    // Add other candidate fields as needed
  }

  candidateID: number;
  // Add other candidate fields as needed
}


export class Role {
  ID: number;
  roleName: string;
  // Add other role properties as needed
}
