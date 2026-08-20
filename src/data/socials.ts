export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  primary: boolean;
}

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/nishildave1358-art",
    icon: "github",
    primary: true,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/posts/nirmaltodwal_dsa-codingjourney-problemsolving-share-7492160538416893952-9j2b/?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAGJ3GHcBWAS9DJVnISG7YftEvQXZ-HowCBM&utm_campaign=copy_link",
    icon: "linkedin",
    primary: true,
  },
  {
    name: "Email",
    url: "mailto:nishildave1358@gmail.com",
    icon: "email",
    primary: true,
  },
  {
    name: "HackerRank",
    url: "https://hackerrank.com/nishildave1358",
    icon: "hackerrank",
    primary: false,
  },
  {
    name: "LeetCode",
    url: "https://leetcode.com/nishildave1358",
    icon: "leetcode",
    primary: false,
  },
  {
    name: "X",
    url: "https://x.com/nishildave1358",
    icon: "x",
    primary: false,
  },
];
