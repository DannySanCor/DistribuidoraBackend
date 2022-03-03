export class CreatePartnerDTO {
  readonly partnerName: string;
  readonly birthday: Date;
  readonly address: {
    address: string;
    country: string;
    state: string;
    city: string;
    cp: string;
  };
  readonly phoneNumber: number;
  readonly description: string;
  readonly imageUrl: string;
  public idPartner: number;
  readonly totalVolume: string;
  readonly levelVol: string;
  readonly levelStatus: string;
  readonly countRecruited: string;
  readonly levelRecruited: string;
  readonly levelRecruitedStatus: string;
  readonly createdAt: Date;
  public tagActive: number;
  public tagDelete: number;
}
