<template>
  <Panel>
    <template #title>
      商品添加
    </template>
    <template #content>
      <!-- 商品添加表单 -->
      <el-form
        ref="proform"
        :model="proform"
        label-width="80px"
        size="mini"
        :rules="rules"
      >
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="proform.name" placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品分类" prop="category">
          <el-select placeholder="请选择商品分类" v-model="proform.category">
            <el-option
              v-for="(v, i) in catelist"
              :key="i"
              :value="v.cateName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格 ">
          <el-input-number
            v-model="proform.price"
            :min="0"
            :max="1000"
            label="描述文字"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="商品图片">
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:5000/goods/goods_img_upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品描述" class="textarea" prop="goodsDesc">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="proform.goodsDesc"
            maxlength="30"
            show-word-limit
            width="50%"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="addpro('proform')"
            >添加商品</el-button
          >
        </el-form-item>
      </el-form>
    </template>
  </Panel>
</template>

<script>
import { getcatename, addpro } from "../../api/pro";
export default {
  data() {
    //自定义验证分类必填
    var validatecate = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("此选项必填"));
      } else {
        callback();
      }
    };
    return {
      //图片上传
      imageUrl: "",
      //表单数据对象
      proform: {
        name: "",
        category: "",
        price: 1,
        goodsDesc: "",
        imgUrl: "",
      },
      //所有分类名称列表
      catelist: [],
      //表单规则对象
      rules: {
        name: [{ validator: validatecate, trigger: "blur" }], //失焦事件触发
        category: [{ validator: validatecate, trigger: "change" }],
        goodsDesc: [{ validator: validatecate, trigger: "blur" }],
      },
    };
  },
  created() {
    //查询所有分类名称
    this.getcatename();
  },
  methods: {
    //图片上传成功以后
    handleAvatarSuccess(res, file) {
      this.proform.imgUrl = res.imgUrl;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    //图片上传之前
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
    //获取所有分类名称
    async getcatename() {
      const { categories } = await getcatename({});
      this.catelist = categories;
    },
    //添加商品
    addpro(formName) {
      this.$refs[formName].validate(async (vaild) => {
        if (vaild) {
          const { code, msg } = await addpro(this.proform);
          if (code === 0) {
            this.$router.push("/product/list");
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.el-input {
  width: 300px;
}
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
.textarea {
  width: 600px;
}
</style>
