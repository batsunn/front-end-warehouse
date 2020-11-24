<template>
  <div>
    <Panel>
      <template #title>
        <span class="title">店铺管理</span>
        <el-button type="primary" size="small" @click="onSubmit"
          >保存</el-button
        >
        <el-button type="plain" size="small" @click="reset">重置</el-button>
      </template>
      <template #content>
        <!-- 表单 -->
        <el-form
          ref="shopform"
          :model="shopform"
          label-width="80px"
          size="small"
        >
          <el-form-item label="店铺名称">
            <el-input v-model="shopform.name"></el-input>
          </el-form-item>
          <el-form-item label="店铺公告">
            <el-input
              type="textarea"
              v-model="shopform.bulletin"
              :autosize="{ minRows: 6, maxRows: 10 }"
            ></el-input>
          </el-form-item>
          <el-form-item label="店铺头像">
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:5000/shop/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="店铺图片">
            <el-upload
              action="http://127.0.0.1:5000/shop/upload"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-success="handleshopSuccess"
              :on-remove="handleRemove"
              :file-list="fileList"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="配送费">
            <el-input v-model="shopform.deliveryPrice"></el-input>
          </el-form-item>
          <el-form-item label="配送时间">
            <el-input v-model="shopform.deliveryTime"></el-input>
          </el-form-item>
          <el-form-item label="配送描述">
            <el-input v-model="shopform.description"></el-input>
          </el-form-item>
          <el-form-item label="店铺评分">
            <el-input v-model="shopform.score"></el-input>
          </el-form-item>
          <el-form-item label="销量">
            <el-input v-model="shopform.sellCount"></el-input>
          </el-form-item>
          <el-form-item label="活动">
            <el-checkbox-group v-model="shopform.supports">
              <el-checkbox label="在线支付满28减5" name="type"></el-checkbox>
              <el-checkbox
                label="VC无线橙果汁全场8折"
                name="type"
              ></el-checkbox>
              <el-checkbox label="单人精彩套餐" name="type"></el-checkbox>
              <el-checkbox label="特价饮品8折购" name="type"></el-checkbox>
              <el-checkbox label="单人特色套餐" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="营业时间">
            <el-date-picker
              v-model="shopform.date"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
      </template>
    </Panel>
  </div>
</template>

<script>
import { getshopinfo, shopupload, editshop } from "../../api/shop";
export default {
  data() {
    return {
      //表单数据对象
      shopform: {
        date: [],
        pics: [],
        supports: [],
      },
      //多图上传
      fileList: [],
      //头像上传
      imageUrl: "",
      baseUrl: "http://127.0.0.1:5000/upload/shop/",
    };
  },
  created() {
    this.getshopinfo();
  },
  methods: {
    //更新店铺信息
    async onSubmit() {
      //转化数据格式
      this.shopform.pics = JSON.stringify(this.shopform.pics);
      this.shopform.date = JSON.stringify(this.shopform.date);
      this.shopform.supports = JSON.stringify(this.shopform.supports);
      const { code, msg } = await editshop(this.shopform);
      if (code === 0) {
        location.reload();
      }
    },
    //店铺图片删除
    handleRemove(file, fileList) {
      // 删除本地数组中的数据
      const i = this.shopform.pics.findIndex((item) => item === file.name);
      this.shopform.pics.splice(i, 1);
    },
    //店铺图片上传之前
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //店铺图片上传成功
    handleshopSuccess(res) {
      //将上传成功的电偶图片放到form中的数组中
      this.shopform.pics.push(res.imgUrl);
    },
    //上传头像成功
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      //将上传成功的头像放到form中
      this.shopform.avatar = res.imgUrl;
    },
    //上传头像之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //获取店铺详情
    async getshopinfo() {
      const { data } = await getshopinfo();
      this.shopform = data;
      //用户头像拼接回填
      this.imageUrl = this.baseUrl + data.avatar;
      //店铺图片拼接渲染
      // 通过遍历给 fileList 赋值
      data.pics.forEach((item) => {
        this.fileList.push({
          name: item,
          url: this.baseUrl + item,
        });
      });
    },
    //重置表单
    reset() {
      location.reload();
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.avatar-uploader .el-upload {
  border: 1px dashed #ccc;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.title {
  margin-right: 30px;
}
.el-form {
  width: 450px;
}
</style>
