<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import { Message } from '@arco-design/web-vue';
import { IconCamera, IconImageClose, IconRedo } from '@arco-design/web-vue/es/icon';

import type { CreatorProfile, ProfileDraft } from '@/types/profile';

type DragMode = 'move' | 'nw' | 'ne' | 'sw' | 'se' | null;

const STAGE_WIDTH = 320;
const STAGE_HEIGHT = 420;
const MIN_CROP_SIZE = 72;

const props = defineProps<{
  visible: boolean;
  profile: CreatorProfile;
}>();

const emit = defineEmits<{
  'update:visible': [value: boolean];
  save: [payload: ProfileDraft];
}>();

const draft = reactive<ProfileDraft>({
  nickname: props.profile.nickname,
  signature: props.profile.signature,
  background: props.profile.background,
  avatar: props.profile.avatar,
  squareAvatar: props.profile.squareAvatar,
  circleAvatar: props.profile.circleAvatar
});

const saving = ref(false);
const progress = ref(0);
const sourceAvatar = ref(props.profile.avatar);
const stageImage = ref<HTMLImageElement | null>(null);
const imageMeta = reactive({
  naturalWidth: 0,
  naturalHeight: 0
});
const cropRect = reactive({
  x: 56,
  y: 86,
  size: 184
});
const previewSquare = ref(props.profile.squareAvatar);
const previewCircle = ref(props.profile.circleAvatar);
const dragging = reactive({
  mode: null as DragMode,
  startX: 0,
  startY: 0,
  initialX: 0,
  initialY: 0,
  initialSize: 0
});

watch(
  () => props.visible,
  (visible) => {
    if (!visible) {
      progress.value = 0;
      saving.value = false;
      dragging.mode = null;
    } else {
      void loadAvatarSource(sourceAvatar.value || props.profile.avatar);
    }
  }
);

watch(
  () => props.profile,
  (profile) => {
    draft.nickname = profile.nickname;
    draft.signature = profile.signature;
    draft.background = profile.background;
    draft.avatar = profile.avatar;
    draft.squareAvatar = profile.squareAvatar;
    draft.circleAvatar = profile.circleAvatar;
    sourceAvatar.value = profile.avatar;
    previewSquare.value = profile.squareAvatar;
    previewCircle.value = profile.circleAvatar;
  },
  { deep: true }
);

const signatureCount = computed(() => draft.signature.length);

const displayImageFrame = computed(() => {
  if (!imageMeta.naturalWidth || !imageMeta.naturalHeight) {
    return {
      x: 0,
      y: 0,
      width: STAGE_WIDTH,
      height: STAGE_HEIGHT
    };
  }

  const imageRatio = imageMeta.naturalWidth / imageMeta.naturalHeight;
  const stageRatio = STAGE_WIDTH / STAGE_HEIGHT;

  if (imageRatio > stageRatio) {
    const width = STAGE_WIDTH;
    const height = width / imageRatio;
    return {
      x: 0,
      y: (STAGE_HEIGHT - height) / 2,
      width,
      height
    };
  }

  const height = STAGE_HEIGHT;
  const width = height * imageRatio;
  return {
    x: (STAGE_WIDTH - width) / 2,
    y: 0,
    width,
    height
  };
});

const cropStyle = computed(() => ({
  left: `${cropRect.x}px`,
  top: `${cropRect.y}px`,
  width: `${cropRect.size}px`,
  height: `${cropRect.size}px`
}));

const readFileAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('读取文件失败'));
    reader.readAsDataURL(file);
  });

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const initializeCrop = () => {
  const frame = displayImageFrame.value;
  const size = Math.max(MIN_CROP_SIZE, Math.min(frame.width, frame.height) * 0.74);
  cropRect.size = size;
  cropRect.x = frame.x + (frame.width - size) / 2;
  cropRect.y = frame.y + (frame.height - size) / 2;
  renderCropPreviews();
};

const loadAvatarSource = async (url: string) => {
  if (!url) return;

  sourceAvatar.value = url;
  const image = new Image();
  image.crossOrigin = 'anonymous';

  await new Promise<void>((resolve, reject) => {
    image.onload = () => {
      stageImage.value = image;
      imageMeta.naturalWidth = image.naturalWidth;
      imageMeta.naturalHeight = image.naturalHeight;
      resolve();
    };
    image.onerror = () => reject(new Error('头像资源加载失败'));
    image.src = url;
  }).catch(() => {
    stageImage.value = null;
    imageMeta.naturalWidth = 0;
    imageMeta.naturalHeight = 0;
  });

  initializeCrop();
};

const renderCropPreviews = () => {
  if (!stageImage.value) {
    previewSquare.value = sourceAvatar.value;
    previewCircle.value = sourceAvatar.value;
    return;
  }

  try {
    const frame = displayImageFrame.value;
    const image = stageImage.value;
    const scaleX = image.naturalWidth / frame.width;
    const scaleY = image.naturalHeight / frame.height;
    const sourceX = (cropRect.x - frame.x) * scaleX;
    const sourceY = (cropRect.y - frame.y) * scaleY;
    const sourceWidth = cropRect.size * scaleX;
    const sourceHeight = cropRect.size * scaleY;
    const outputSize = 200;

    const createPreview = (circle: boolean) => {
      const canvas = document.createElement('canvas');
      canvas.width = outputSize;
      canvas.height = outputSize;
      const ctx = canvas.getContext('2d');

      if (!ctx) return sourceAvatar.value;

      if (circle) {
        ctx.beginPath();
        ctx.arc(outputSize / 2, outputSize / 2, outputSize / 2, 0, Math.PI * 2);
        ctx.clip();
      }

      ctx.drawImage(
        image,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        outputSize,
        outputSize
      );

      return canvas.toDataURL('image/png');
    };

    previewSquare.value = createPreview(false);
    previewCircle.value = createPreview(true);
  } catch {
    previewSquare.value = sourceAvatar.value;
    previewCircle.value = sourceAvatar.value;
  }
};

const resetCrop = () => {
  initializeCrop();
  Message.info('裁剪框已重置');
};

const confirmCrop = () => {
  draft.avatar = previewSquare.value;
  draft.squareAvatar = previewSquare.value;
  draft.circleAvatar = previewCircle.value;
  Message.success('头像已裁剪并暂存，保存修改后生效');
};

const startDrag = (mode: DragMode, event: MouseEvent) => {
  event.preventDefault();
  event.stopPropagation();
  dragging.mode = mode;
  dragging.startX = event.clientX;
  dragging.startY = event.clientY;
  dragging.initialX = cropRect.x;
  dragging.initialY = cropRect.y;
  dragging.initialSize = cropRect.size;
};

const updateCropRect = (clientX: number, clientY: number) => {
  if (!dragging.mode) return;

  const frame = displayImageFrame.value;
  const deltaX = clientX - dragging.startX;
  const deltaY = clientY - dragging.startY;
  const maxSize = Math.min(frame.width, frame.height);

  if (dragging.mode === 'move') {
    cropRect.x = clamp(dragging.initialX + deltaX, frame.x, frame.x + frame.width - cropRect.size);
    cropRect.y = clamp(dragging.initialY + deltaY, frame.y, frame.y + frame.height - cropRect.size);
    renderCropPreviews();
    return;
  }

  let nextSize = dragging.initialSize;
  let nextX = dragging.initialX;
  let nextY = dragging.initialY;

  if (dragging.mode === 'se') {
    nextSize = dragging.initialSize + Math.max(deltaX, deltaY);
  }

  if (dragging.mode === 'sw') {
    nextSize = dragging.initialSize + Math.max(-deltaX, deltaY);
    nextX = dragging.initialX + dragging.initialSize - nextSize;
  }

  if (dragging.mode === 'ne') {
    nextSize = dragging.initialSize + Math.max(deltaX, -deltaY);
    nextY = dragging.initialY + dragging.initialSize - nextSize;
  }

  if (dragging.mode === 'nw') {
    nextSize = dragging.initialSize + Math.max(-deltaX, -deltaY);
    nextX = dragging.initialX + dragging.initialSize - nextSize;
    nextY = dragging.initialY + dragging.initialSize - nextSize;
  }

  nextSize = clamp(nextSize, MIN_CROP_SIZE, maxSize);
  nextX = clamp(nextX, frame.x, frame.x + frame.width - nextSize);
  nextY = clamp(nextY, frame.y, frame.y + frame.height - nextSize);

  cropRect.x = nextX;
  cropRect.y = nextY;
  cropRect.size = nextSize;
  renderCropPreviews();
};

const stopDrag = () => {
  dragging.mode = null;
};

const handleWindowMouseMove = (event: MouseEvent) => {
  updateCropRect(event.clientX, event.clientY);
};

watch(
  () => [cropRect.x, cropRect.y, cropRect.size, imageMeta.naturalWidth, imageMeta.naturalHeight],
  () => {
    renderCropPreviews();
  }
);

watch(
  () => props.profile.avatar,
  (avatar) => {
    if (avatar) {
      void loadAvatarSource(avatar);
    }
  },
  { immediate: true }
);

onMounted(() => {
  window.addEventListener('mousemove', handleWindowMouseMove);
  window.addEventListener('mouseup', stopDrag);
});

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', handleWindowMouseMove);
  window.removeEventListener('mouseup', stopDrag);
});

const handleAvatarChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file) return;
  if (!file.type.startsWith('image/')) {
    Message.error('请选择图片文件');
    return;
  }

  sourceAvatar.value = await readFileAsDataUrl(file);
  await loadAvatarSource(sourceAvatar.value);
  Message.success('头像已载入裁剪器，请确认裁剪后再保存');
};

const handleBackgroundChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file) return;
  if (!file.type.startsWith('image/')) {
    Message.error('请选择图片文件');
    return;
  }
  if (file.size > 10 * 1024 * 1024) {
    Message.error('背景图大小不能超过 10MB');
    return;
  }

  draft.background = await readFileAsDataUrl(file);
  Message.success('背景图已更新预览');
};

const close = () => {
  emit('update:visible', false);
};

const submit = async () => {
  if (!draft.nickname.trim()) {
    Message.error('请输入用户昵称');
    return;
  }

  saving.value = true;
  progress.value = 8;

  const checkpoints = [26, 44, 67, 86, 100];
  for (const value of checkpoints) {
    await new Promise((resolve) => setTimeout(resolve, 140));
    progress.value = value;
  }

  emit('save', { ...draft, nickname: draft.nickname.trim(), signature: draft.signature.trim() });
  saving.value = false;
  close();
};
</script>

<template>
  <a-modal
    :visible="visible"
    width="960px"
    :footer="false"
    unmount-on-close
    modal-class="yc-modal"
    @cancel="close"
  >
    <template #title>
      <span class="section-title">编辑个人资料</span>
    </template>

    <div class="edit-layout">
      <section class="edit-column edit-column--visual">
        <div class="edit-hero-preview">
          <img :src="draft.background" alt="背景图预览" />
          <label class="edit-image-trigger">
            <IconCamera />
            <span>更换背景图</span>
            <input type="file" accept="image/*" hidden @change="handleBackgroundChange" />
          </label>
        </div>

        <div class="avatar-edit-card">
          <div class="avatar-edit-card__header">
            <h3 class="card-title">头像裁剪编辑器</h3>
            <p class="description">拖动或缩放裁剪框选择头像区域，同时生成方形和圆形头像。</p>
          </div>

          <div class="avatar-edit-card__toolbar">
            <label class="yc-secondary-button avatar-upload-trigger">
              <IconCamera />
              <span>上传头像</span>
              <input type="file" accept="image/*" hidden @change="handleAvatarChange" />
            </label>
            <a-button class="yc-secondary-button" @click="resetCrop">
              <IconRedo />
              重置裁剪
            </a-button>
          </div>

          <div class="crop-editor">
            <div class="crop-editor__canvas" :style="{ width: `${STAGE_WIDTH}px`, height: `${STAGE_HEIGHT}px` }">
              <img :src="sourceAvatar" alt="裁剪源图" class="crop-editor__image" />
              <div class="crop-editor__mask" />

              <div class="crop-editor__selection" :style="cropStyle" @mousedown="startDrag('move', $event)">
                <div class="crop-editor__grid" />
                <button class="crop-editor__handle crop-editor__handle--nw" type="button" @mousedown="startDrag('nw', $event)" />
                <button class="crop-editor__handle crop-editor__handle--ne" type="button" @mousedown="startDrag('ne', $event)" />
                <button class="crop-editor__handle crop-editor__handle--sw" type="button" @mousedown="startDrag('sw', $event)" />
                <button class="crop-editor__handle crop-editor__handle--se" type="button" @mousedown="startDrag('se', $event)" />
              </div>
            </div>
          </div>

          <div class="avatar-preview-grid">
            <div class="avatar-preview-box">
              <span class="description">方形头像</span>
              <div class="avatar-preview-box__frame avatar-preview-box__frame--square">
                <img :src="previewSquare" alt="方形头像" />
              </div>
            </div>
            <div class="avatar-preview-box">
              <span class="description">圆形头像</span>
              <div class="avatar-preview-box__frame avatar-preview-box__frame--circle">
                <img :src="previewCircle" alt="圆形头像" />
              </div>
            </div>
          </div>

          <a-button type="primary" class="yc-large-button avatar-confirm-button" @click="confirmCrop">
            确认裁剪并保存头像
          </a-button>
        </div>
      </section>

      <section class="edit-column">
        <div class="yc-panel">
          <h3 class="card-title">账号信息</h3>
          <div class="account-grid">
            <div class="account-item">
              <span class="description">邮箱</span>
              <strong>{{ profile.email }}</strong>
            </div>
            <div class="account-item">
              <span class="description">手机</span>
              <strong>{{ profile.phone }}</strong>
            </div>
            <div class="account-item">
              <span class="description">邀请码</span>
              <strong>{{ profile.inviteCode }}</strong>
            </div>
            <div class="account-item">
              <span class="description">用户 ID</span>
              <strong>{{ profile.id }}</strong>
            </div>
          </div>
        </div>

        <div class="yc-panel">
          <div class="field-group">
            <label class="description field-label">用户昵称</label>
            <a-input v-model="draft.nickname" size="large" placeholder="请输入用户昵称" />
          </div>

          <div class="field-group">
            <div class="field-label-row">
              <label class="description field-label">个性签名</label>
              <span class="description" :class="{ 'text-danger': signatureCount > 100 }">
                {{ signatureCount }}/100
              </span>
            </div>
            <a-textarea
              v-model="draft.signature"
              :max-length="100"
              :auto-size="{ minRows: 4, maxRows: 6 }"
              show-word-limit
              placeholder="这个人很懒，还没有个性签名"
            />
          </div>

          <div v-if="saving" class="save-progress">
            <div class="save-progress__row">
              <span class="description">保存中...</span>
              <span>{{ progress }}%</span>
            </div>
            <a-progress :percent="progress" :show-text="false" :stroke-width="8" />
          </div>

          <div class="edit-actions">
            <a-button class="yc-secondary-button" @click="close">
              <IconImageClose />
              取消
            </a-button>
            <a-button type="primary" class="yc-large-button" :loading="saving" @click="submit">
              保存修改
            </a-button>
          </div>
        </div>
      </section>
    </div>
  </a-modal>
</template>
