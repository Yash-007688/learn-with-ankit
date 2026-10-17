export type SiteUpdate = {
  github_change_no: string;
  github_change_date: string;
  github_change_time: string;
  updated_by: string;
  commit_message: string;
};

export const DEFAULT_SITE_UPDATE: SiteUpdate = {
  github_change_no: "960a7a9",
  github_change_date: "2026-10-17",
  github_change_time: "22:14:57",
  updated_by: "amitshrivastva@buildingvoid.com",
  commit_message:
    "Add Google Drive upload integration, and organize Courses and Free Resources pages",
};
