<template>
  <div>
    <Panel>
      <!-- v-slot:的简写 -->
      <template #title>
        个人中心
      </template>
      <template #content>
        <ul>
          <li>
            <strong>管理员ID：</strong><span>{{ userInfo.id }}</span>
          </li>
          <li>
            <strong>账号：</strong><span>{{ userInfo.account }}</span>
          </li>
          <li>
            <strong>用户组：</strong><span>{{ userInfo.userGroup }}</span>
          </li>
          <li>
            <strong>创建时间：</strong><span>{{ userInfo.ctime }}</span>
          </li>
          <li>
            <strong>管理员头像：</strong
            ><span>
              <!-- 上传图片到服务器 -->
              <el-upload
                class="avatar-uploader"
                action="http://127.0.0.1:5000/users/avatar_upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <!-- 图片上传显示 -->
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <el-button type="primary" size="small" @click="editavatar"
                >保存</el-button
              >
            </span>
          </li>
        </ul>
      </template>
    </Panel>
  </div>
</template>

<script>
import moment from "moment";
import $local from "../../utils/local";
import { editavatar } from "../../api/users";

export default {
  created() {
    //渲染头部信息
    this.userInfo = JSON.parse($local.get("user"));
    //处理时间格式
    this.userInfo.ctime = moment(this.userInfo.ctime).format(
      "YYYY-MM-DD HH:mm:ss"
    );
  },
  data() {
    return {
      //用户信息
      userInfo: [],
      //图片上传
      imageUrl: "",
      //修改头像的图片地址
      img: "",
    };
  },
  methods: {
    //上传图片成功
    handleAvatarSuccess(res, file) {
      //上传图片的地址处理
      this.img = res.imgUrl;
      //图片上传到服务器
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    //上传图片之前
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
    // 上传图片到数据库
    async editavatar() {
      const { code, msg } = await editavatar({
        imgUrl: this.img,
      });
      if (code === 0) {
        location.reload();
      }
    },
  },
};
</script>

<style lang="less" scoped>
li {
  strong {
    font-size: 15px;
  }
  line-height: 50px;
  border-bottom: 1px solid #ccc;
  span {
    font-size: 15px;
  }
}
/deep/.avatar-uploader .el-upload {
  border: 1px dashed #ccc;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin-left: 40px;
  margin-bottom: -10px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 158px;
  height: 158px;
  line-height: 158px;
  text-align: center;
}
.avatar {
  width: 158px;
  height: 158px;
  display: block;
}
.el-button {
  margin-left: 90px;
}
</style>
