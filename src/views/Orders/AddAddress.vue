<template>
  <div class="addAddress">
    <Header :isLeft="true" :title="title" />
    <!-- 添加地址 -->
    <div class="viewbody">
      <div class="content">
        <FormBlock
          label="联系人"
          placeholder="姓名"
          :tags="sexes"
          @checkSex="checkSex"
          :sex="addressInfo.sex"
          v-model="addressInfo.name"
        />
        <FormBlock v-model="addressInfo.phone" label="电话" placeholder="手机号码" />
        <FormBlock
          v-model="addressInfo.address"
          @click="showSearch = true"
          label="地址"
          placeholder="小区/写字楼/学校"
          icon="angle-right"
        />
        <FormBlock
          v-model="addressInfo.bottom"
          label="门牌号"
          placeholder="3号楼3单元301"
          icon="edit"
          textarea="textarea"
        />
        <div class="formblock">
          <div class="label-wrap">标签</div>
          <TabTag :tags="tags" @checkTag="checkTag" :selectTag="addressInfo.tag" />
        </div>
      </div>
      <!-- 确定按钮 -->
      <div class="form-button-wrap">
        <button @click="handelSave" class="form-button">确定</button>
      </div>
    </div>
    <!-- 搜索地址 -->
    <AddressSearch @close="showSearch = false" :showSearch="showSearch" :addressInfo="addressInfo" />
  </div>
</template>

<script>
import Header from '../../components/Header'
import FormBlock from '../../components/Orders/FormBlock'
import TabTag from '../../components/Orders/TabTag'
import AddressSearch from '../../components/Orders/AddressSearch'
import { Toast } from 'mint-ui'
export default {
  name: 'AddAddress',
  data() {
    return {
      title: '',
      tags: ['家', '学校', '公司'],
      sexes: ['先生', '女士'],
      addressInfo: {},
      showSearch: false
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.addressInfo = to.params.addressInfo
      vm.title = to.params.title
    })
  },
  methods: {
    checkTag(item) {
      // console.log(item)
      this.addressInfo.tag = item
    },
    checkSex(item) {
      // console.log(item)
      this.addressInfo.sex = item
    },
    // 确定提交
    handelSave() {
      // console.log(this.addressInfo)
      if (!this.addressInfo.name) {
        this.showMsg('请输入联系人')
        return
      }
      if (!this.addressInfo.phone) {
        this.showMsg('请输入手机号码')
        return
      }
      if (!this.addressInfo.address) {
        this.showMsg('请输入收货地址')
        return
      }
      // 存储数据
      if (this.title == '添加地址') {
        this.addAddress()
      } else {
        this.editAddress()
      }
    },
    // ui 提示
    showMsg(msg) {
      Toast({
        message: msg,
        position: 'bottom',
        duration: 2000
      })
    },
    // 请求接口提交数据
    addAddress() {
      this.$axios
        .post(`/api/user/add_address/${localStorage.ele_login}`, this.addressInfo)
        .then(res => {
          if (!this.$store.getters.userInfo) {
            this.$store.dispatch('setUserInfo', this.addressInfo)
          }
          this.$router.push('/myAddress')
        })
        .catch(err => console.log(err))
    },
    // 编辑请求数据
    editAddress() {
      this.$axios
        .post(
          `/api/user/edit_address/${localStorage.ele_login}/${this.addressInfo._id}`,
          this.addressInfo
        )
        .then(res => {
          this.$router.push('/myAddress')
        })
    }
  },
  components: {
    Header,
    FormBlock,
    TabTag,
    AddressSearch
  }
}
</script>

<style scoped>
.addAddress {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 45px;
}
.viewbody {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  background-color: #f5f5f5;
}
.content {
  padding-left: 4vw;
  background: #fff;
  font-size: 0.94rem;
}
.formblock {
  background-color: #fff;
  border-bottom: 1px solid #eee;
  display: flex;
}
.formblock .label-wrap {
  flex-basis: 17.333333vw;
  padding: 3.733333vw 0;
  line-height: 4.8vw;
  color: #333;
  font-weight: 700;
}

/* 确定按钮 */
.form-button-wrap {
  padding: 5.333333vw 4vw;
  display: flex;
}
.form-button-wrap .form-button {
  background: #00d762;
  text-align: center;
  border-radius: 0.533333vw;
  flex: 1;
  font-size: 1.1rem;
  line-height: 5.066667vw;
  color: #fff;
  padding: 3.333333vw 0;
  border: none;
  font-weight: 500;
}
</style>
