import type { CreatorProfile, ProfileDraft } from '@/types/profile';
import { creatorProfileMock } from '@/mocks/profile';

const delay = (ms = 280) => new Promise((resolve) => setTimeout(resolve, ms));

let profileSnapshot: CreatorProfile = { ...creatorProfileMock };

export async function fetchProfile(): Promise<CreatorProfile> {
  await delay();
  return { ...profileSnapshot };
}

export async function updateProfile(draft: ProfileDraft): Promise<CreatorProfile> {
  await delay(420);

  profileSnapshot = {
    ...profileSnapshot,
    nickname: draft.nickname,
    signature: draft.signature,
    background: draft.background,
    avatar: draft.avatar,
    squareAvatar: draft.squareAvatar,
    circleAvatar: draft.circleAvatar
  };

  return { ...profileSnapshot };
}
