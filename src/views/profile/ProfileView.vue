<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { IconRefresh } from '@arco-design/web-vue/es/icon';

import { useLocale } from '@/composables/useLocale';
import EditProfileModal from './components/EditProfileModal.vue';
import ProfileHeroCard from './components/ProfileHeroCard.vue';
import WorksSection from './components/WorksSection.vue';
import { useProfilePage } from './composables/useProfilePage';
import type { WorkItem } from '@/types/profile';

const router = useRouter();
const { t } = useLocale();

const {
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
} = useProfilePage();

onMounted(() => {
  void initialize();
});

const goToUpload = () => {
  void router.push('/upload');
};

const openWorkDetail = (item: WorkItem) => {
  void router.push(`/series/${item.id}`);
};
</script>

<template>
  <div class="profile-view">
    <div v-if="profileLoading" class="loading-panel yc-panel">
      <a-spin :size="32" />
      <p class="description">{{ t('profile.loading') }}</p>
    </div>

    <div v-else-if="profileError" class="error-panel yc-panel">
      <h2 class="section-title">{{ t('profile.loadError') }}</h2>
      <p class="body-text">{{ profileError }}</p>
      <a-button class="yc-secondary-button" @click="loadProfile">
        <IconRefresh />
        {{ t('common.retry') }}
      </a-button>
    </div>

    <template v-else-if="profile">
      <ProfileHeroCard :profile="profile" @edit="editVisible = true" />

      <WorksSection
        :active-filter="activeFilter"
        :works="works"
        :loading="worksLoading"
        :error="worksError"
        :empty="emptyWorks"
        @update:filter="activeFilter = $event"
        @retry="loadWorks"
        @upload="goToUpload"
        @open-work="openWorkDetail"
      />

      <EditProfileModal
        v-model:visible="editVisible"
        :profile="profile"
        @save="saveProfile"
      />
    </template>
  </div>
</template>
