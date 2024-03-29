<template>
  <el-dialog
    v-model="visible"
    :title="type == 'add' ? '添加轮播图' : '修改轮播图'"
    width="400px"
  >
    <el-form
      ref="formRef"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="good-form"
    >
      <el-form-item label="图片" prop="url">
        <el-upload
          class="avatar-uploader"
          :action="uploadImgServer"
          accept="jpg,jpeg,png"
          :headers="{
            token: token,
          }"
          :show-file-list="false"
          :before-upload="handleBeforeUpload"
          :on-success="handleUrlSuccess"
        >
          <img
            v-if="ruleForm.url"
            style="width: 200px; height: 100px; border: 1px solid #e9e9e9"
            :src="ruleForm.url"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="跳转链接" prop="link">
        <el-input v-model="ruleForm.link" type="text"></el-input>
      </el-form-item>
      <el-form-item label="排序值" prop="sort">
        <el-input v-model="ruleForm.sort" type="number"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { ElMessage, ElUpload } from 'element-plus';
import { reactive, ref, toRefs } from 'vue';
import {
  addCarousels,
  updateCarousels,
  fetchCarouselDetail,
} from '@/api/service/carousels';
import { localGet, uploadImgServer } from '@/utils';

interface IDialoaAddSwiperPropsType {
  type: string; // add 为新增；edit 为编辑
  reload: () => void; // table 刷新的方法
}

export default {
  name: 'DialogAddSwiper',
  props: {
    type: String,
    reload: Function,
  },
  setup(props: IDialoaAddSwiperPropsType) {
    console.log(props);
    // formRef 用于表单验证控制
    const formRef = ref(null);
    const state = reactive({
      uploadImgServer,
      token: localGet('token') || '', // 用于调用上传图片接口是，放在请求头上的 token
      visible: false, // 控制弹窗的显示隐藏
      ruleForm: {
        url: '',
        link: '',
        sort: '',
      },
      rules: {
        url: [
          { required: 'true', message: '图片不能为空', trigger: ['change'] },
        ],
        sort: [
          { required: 'true', message: '排序不能为空', trigger: ['change'] },
        ],
      },
      id: '',
    });
    // 获取详情
    const getDetail = async (id: string) => {
      const res = await fetchCarouselDetail(id);
      state.ruleForm = {
        url: res.carouselUrl,
        link: res.redirectUrl,
        sort: res.carouselRank,
      };
    };
    // 上传之前，控制上传的文件。
    const handleBeforeUpload = (file: any) => {
      const sufix = file.name.split('.')[1] || '';
      if (!['jpg', 'jpeg', 'png'].includes(sufix)) {
        ElMessage.error('请上传 jpg、jpeg、png 格式的图片');
        return false;
      }
    };
    // 上传图片
    const handleUrlSuccess = (val: any) => {
      state.ruleForm.url = val.data || '';
    };
    // 开启弹窗，此方法将在父组件，通过 ref 直接调用。
    const open = (id?: string) => {
      state.visible = true;
      // 如果带着 id，则是编辑，否则为新增
      if (id) {
        state.id = id;
        getDetail(id);
      } else {
        state.ruleForm = {
          url: '',
          link: '',
          sort: '',
        };
      }
    };
    // 关闭弹窗
    const close = () => {
      state.visible = false;
    };
    // 提交表单方法
    const submitForm = () => {
      formRef.value?.validate(async (valid) => {
        // valid 为是否通过表单验证的变量
        if (valid) {
          if (props.type == 'add') {
            // 增加用 axios.post
            await addCarousels(
              state.ruleForm.url,
              state.ruleForm.link,
              state.ruleForm.sort
            );
            ElMessage.success('添加成功');
            state.visible = false;
            if (props.reload) props.reload();
          } else {
            await updateCarousels(
              state.id,
              state.ruleForm.url,
              state.ruleForm.link,
              state.ruleForm.sort
            );
            ElMessage.success('修改成功');
            state.visible = false;
            if (props.reload) props.reload();
          }
        }
      });
    };
    return {
      ...toRefs(state),
      open,
      close,
      formRef,
      handleBeforeUpload,
      handleUrlSuccess,
      submitForm,
    };
  },
};
</script>

<style scoped>
.avatar-uploader {
  width: 100px;
  height: 100px;
  color: #ddd;
  font-size: 30px;
}
.avatar-uploader-icon {
  display: block;
  width: 100%;
  height: 100%;
  border: 1px solid #e9e9e9;
  padding: 32px 17px;
}
</style>
