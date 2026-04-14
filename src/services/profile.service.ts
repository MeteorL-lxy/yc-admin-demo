import type { CreatorProfile, ProfileDraft } from '@/types/profile';
import { creatorProfileMock } from '@/mocks/profile';
import { translate } from '@/composables/useLocale';

const delay = (ms = 280) => new Promise((resolve) => setTimeout(resolve, ms));

let profileSnapshot: CreatorProfile = { ...creatorProfileMock };

function mapLocalizedProfile(source: CreatorProfile): CreatorProfile {
  return {
    ...source,
    stats: source.stats.map((item, index) => {
      const labelKeyMap = ['profile.stats.novels', 'profile.stats.followers', 'profile.stats.collects'];
      const nextKey = labelKeyMap[index];
      return {
        ...item,
        label: nextKey ? translate(nextKey) : item.label
      };
    })
  };
}

export async function fetchProfile(): Promise<CreatorProfile> {
  await delay();
  return mapLocalizedProfile({ ...profileSnapshot });
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

  return mapLocalizedProfile({ ...profileSnapshot });
}
