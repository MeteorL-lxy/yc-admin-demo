<script setup lang="ts">
import { ref, watch } from 'vue';
import { Message } from '@arco-design/web-vue';
import { IconUpload } from '@arco-design/web-vue/es/icon';
import { createWork, uploadCover } from '@/services/work.service';
import type { WorkCategory } from '@/types/profile';

const props = defineProps<{
  visible: boolean;
}>();

const emit = defineEmits<{
  'update:visible': [value: boolean];
  created: [];
}>();

const form = ref({
  title: '',
  description: '',
  category: 'novel' as WorkCategory,
  cover: '',
  status: 'draft' as const
});

const submitting = ref(false);
const coverFile = ref<File | null>(null);
const coverPreview = ref('');

const categoryOptions: { value: WorkCategory; label: string; desc: string }[] = [
  { value: 'novel', label: '小说', desc: '文字连载作品' },
  { value: 'drama', label: '短剧', desc: '视频剧集作品' }
];

watch(() => props.visible, (val) => {
  if (val) {
    form.value = { title: '', description: '', category: 'novel', cover: '', status: 'draft' };
    coverFile.value = null;
    coverPreview.value = '';
  }
});

function handleCoverChange(file: File) {
  coverFile.value = file;
  coverPreview.value = URL.createObjectURL(file);
  return false;
}

function removeCover() {
  coverFile.value = null;
  coverPreview.value = '';
  form.value.cover = '';
}

function close() {
  emit('update:visible', false);
}

async function handleSubmit() {
  if (!form.value.title.trim()) {
    Message.warning('请输入作品名称');
    return;
  }
  if (!form.value.description.trim()) {
    Message.warning('请输入作品简介');
    return;
  }

  submitting.value = true;
  try {
    let coverUrl = '';
    if (coverFile.value) {
      coverUrl = await uploadCover(coverFile.value);
    }

    await createWork({
      title: form.value.title,
      description: form.value.description,
      category: form.value.category,
      status: form.value.status,
      cover: coverUrl,
      episodes: 0,
      views: '0',
      collects: '0',
      badge: form.value.category === 'novel' ? '小说' : '短剧'
    });
    Message.success('作品创建成功');
    emit('created');
    close();
  } catch (err) {
    Message.error(err instanceof Error ? err.message : '创建失败');
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <a-modal
    :visible="visible"
    width="640px"
    :footer="false"
    unmount-on-close
    modal-class="yc-modal"
    @cancel="close"
  >
    <template #title>
      <span class="section-title">创建作品</span>
    </template>

    <div class="upload-modal-body">
      <p class="description">填写作品信息并上传封面，创建后即可在作品列表中查看</p>

      <a-form :model="form" layout="vertical" class="upload-form">
        <div class="upload-field">
          <label class="upload-label">作品类型</label>
          <div class="upload-category-group">
            <div
              v-for="opt in categoryOptions"
              :key="opt.value"
              class="upload-category-item"
              :class="{ 'upload-category-item--active': form.category === opt.value }"
              @click="form.category = opt.value"
            >
              <span class="upload-category-item__label">{{ opt.label }}</span>
              <span class="upload-category-item__desc">{{ opt.desc }}</span>
            </div>
          </div>
        </div>

        <div class="upload-field">
          <label class="upload-label">作品名称 <span class="text-danger">*</span></label>
          <a-input
            v-model="form.title"
            placeholder="请输入作品名称"
            :max-length="50"
          />
        </div>

        <div class="upload-field">
          <label class="upload-label">作品简介 <span class="text-danger">*</span></label>
          <a-textarea
            v-model="form.description"
            placeholder="请输入作品简介，包括剧情介绍、主要角色等"
            :auto-size="{ minRows: 4, maxRows: 8 }"
            :max-length="500"
            show-word-limit
          />
        </div>

        <div class="upload-field">
          <label class="upload-label">封面图片 <span class="text-danger">*</span></label>
          <div v-if="coverPreview" class="upload-cover-preview">
            <img :src="coverPreview" alt="cover preview" />
            <div class="upload-cover-preview__actions">
              <a-button size="small" @click="removeCover">移除</a-button>
            </div>
          </div>
          <a-upload
            v-else
            :auto-upload="false"
            :show-file-list="false"
            accept="image/png,image/jpeg,image/gif"
            @change="(fileList: any) => fileList[0]?.file && handleCoverChange(fileList[0].file)"
          >
            <template #upload-button>
              <div class="upload-cover-trigger">
                <IconUpload class="upload-cover-trigger__icon" />
                <span>点击上传封面</span>
                <span class="description">支持 JPG、PNG、GIF 格式，最大 10MB</span>
              </div>
            </template>
          </a-upload>
        </div>

        <div class="upload-modal-actions">
          <a-button class="yc-secondary-button--large" @click="close">取消</a-button>
          <a-button
            type="primary"
            class="yc-large-button"
            :loading="submitting"
            @click="handleSubmit"
          >
            创建作品
          </a-button>
        </div>
      </a-form>
    </div>
  </a-modal>
</template>
