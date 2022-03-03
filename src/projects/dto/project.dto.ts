export class CreateProjectDTO {
  bussinessName: string;
  address: {
    address: string;
    country: string;
    state: string;
    city: string;
    cp: string;
  };
  aboutUs: {
    contactNumber: number;
    contactEmail: string;
    comments: string;
  };
  currentDiscount: number;
  versionApp: string;
  scheduleAtention: string;
  createdAt: Date;
  tagActive: number;
  tagDelete: number;
}
