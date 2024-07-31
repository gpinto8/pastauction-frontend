export interface TeamMember {
  name: string;
  description: string | null;
  role: string;
  country: string;
  position: number;
  media_aws_path: string | null;
  media_path: string | null;
  active: boolean;
}
