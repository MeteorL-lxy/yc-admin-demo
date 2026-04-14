import { computed, ref, watch } from 'vue';
import { Message } from '@arco-design/web-vue';

import { useLocale } from '@/composables/useLocale';
import { fetchProfile, updateProfile } from '@/services/profile.service';
import { fetchWorks } from '@/services/work.service';
import type { CreatorProfile, ProfileDraft, WorkFilter, WorkItem } from '@/types/profile';

export function useProfilePage() {
  const { t } = useLocale();
  const profile = ref<CreatorProfile | null>(null);
  const works = ref<WorkItem[]>([]);
  const profileLoading = ref(false);
  const worksLoading = ref(false);
  const profileError = ref('');
  const worksError = ref('');
  const editVisible = ref(false);
  const activeFilter = ref<WorkFilter>('all');

  const emptyWorks = computed(() => !worksLoading.value && !worksError.value && works.value.length === 0);

  const loadProfile = async () => {
    profileLoading.value = true;
    profileError.value = '';

    try {
      profile.value = await fetchProfile();
    } catch (error) {
      profileError.value = error instanceof Error ? error.message : t('profile.errors.fetchProfile');
    } finally {
      profileLoading.value = false;
    }
  };

  const loadWorks = async () => {
    worksLoading.value = true;
    worksError.value = '';

    try {
      works.value = await fetchWorks(activeFilter.value);
    } catch (error) {
      worksError.value = error instanceof Error ? error.message : t('profile.errors.fetchWorks');
    } finally {
      worksLoading.value = false;
    }
  };

  const initialize = async () => {
    await Promise.all([loadProfile(), loadWorks()]);
  };

  const saveProfile = async (draft: ProfileDraft) => {
    try {
      profile.value = await updateProfile(draft);
      Message.success(t('profile.messages.profileUpdated'));
    } catch (error) {
      Message.error(error instanceof Error ? error.message : t('profile.errors.saveProfile'));
    }
  };

  watch(activeFilter, () => {
    void loadWorks();
  });

  return {
    profile,
    works,
    profileLoading,
    worksLoading,
    profileError,
    worksError,
    editVisible,
    activeFilter,
    emptyWorks,
    initialize,
    loadProfile,
    loadWorks,
    saveProfile
  };
}
