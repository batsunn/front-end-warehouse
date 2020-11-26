<template>
  <div class="all">
    <div class="container">
      <div class="left">
        <h1>点击播放歌曲</h1>
        <audio
          :src="musicdetail.url"
          controls="controls"
          @play="start"
          @pause="over"
        />

        <div class="box">
          <img
            src="../assets/image/zhou.jpg"
            class="startrotate"
            :class="flag ? 'pause' : ''"
          />
        </div>
      </div>
      <div class="right">
        <h1>热门留言</h1>
        <!-- 留言列表 -->
        <el-table :data="tableData" style="width: 100%">
          <el-table-column width="150">
            <template v-slot="{ row }">
              <img :src="row.user.avatarUrl" />
              <span>{{ row.user.nickname }}</span
              >:
            </template>
          </el-table-column>
          <el-table-column>
            <template v-slot="{ row }">
              <p>{{ row.content }}</p>
            </template>
          </el-table-column>
          <el-table-column width="150">
            <template v-slot="{ row }">
              <p>{{ row.time | formatDate }}</p>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "../utils/filters";
import { searchcomment, playmusic } from "../api/music";
export default {
  data() {
    return {
      tableData: [],
      musicdetail: {},
      url: "",
      flag: true,
    };
  },
  methods: {
    //获取音乐评论
    async searchcomment() {
      const data = await searchcomment({
        type: 0,
        id: this.$route.query.id,
      });
      if (data.code === 200) {
        this.tableData = data.hotComments;
      }
    },
    //播放歌曲
    async playmusic() {
      const { data, code } = await playmusic({
        id: this.$route.query.id,
      });
      if (code === 200) {
        this.musicdetail = data[0];
      }
    },
    //开始播放
    start() {
      this.flag = false;
    },
    //结束播放
    over() {
      this.flag = true;
    },
  },
  created() {
    this.searchcomment();
    this.playmusic();
  },
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  justify-content: space-between;
  .left {
    width: 30%;
    audio {
      margin-top: 25px;
      outline: 0;
    }
    .box {
      margin-top: 10px;
      background-color: skyblue;
      img {
        width: 290px;
        height: 290px;
        border-radius: 50%;
      }
      .startrotate {
        animation: changDeg 6s linear 0.2s infinite;
      }
      .pause {
        animation-play-state: paused;
      }
    }
    h1 {
      font-size: 20px;
      margin: 20px 0;
    }
    video {
      width: 270px;
    }
  }
  .right {
    width: 65%;
    h1 {
      margin-top: 20px;
      margin-left: 5px;
      font-size: 20px;
    }
    img {
      width: 40px;
    }
    span {
      margin-left: 5px;
      font-size: 12px;
      color: blue;
    }
  }
}

@keyframes changDeg {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
