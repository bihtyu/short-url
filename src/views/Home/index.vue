<template>
  <n-form
    class="main-form"
    :model="model"
    :rules="rules"
    ref="formRef"
    label-placement="left"
    :label-width="50"
    size="large"
  >
    <n-gradient-text type="danger" class="title"> 生成短链 URL </n-gradient-text>
    <n-form-item label="url" path="url">
      <n-input placeholder="请输入 url" v-model:value="model.url" />
    </n-form-item>
    <n-form-item label="slug" path="slug">
      <n-input placeholder="请输入 slug" v-model:value="model.slug" />
    </n-form-item>
    <div class="operate-row">
      <n-button
        type="success"
        size="large"
        :loading="btnLoading"
        :disabled="btnLoading"
        @click="handleValidateButtonClick"
      >Submit</n-button>
    </div>
  </n-form>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'
import {
  NForm,
  NFormItem,
  NInput,
  NButton,
  NGradientText,
  useMessage
} from 'naive-ui'
import axios from 'axios'

export default defineComponent({
  components: {
    NForm,
    NFormItem,
    NInput,
    NButton,
    NGradientText,
    useMessage
  },
  setup() {
    const model = reactive({
      url: '',
      slug: ''
    })
    const btnLoading = ref(false)
    const formRef = ref(null)

    window.$message = useMessage()

    const handleValidateButtonClick = (e) => {
      e.preventDefault()
      onSubmit()
    }

    const onSubmit = () => {
      btnLoading.value = true

      window.$message.destroyAll()
      window.$message.loading(
        '短链生成中，请稍后...'
      )
    
      axios.post('/api/create', model).then(function(response) {
        model.url = response.data.link
        window.$message.destroyAll()
        window.$message.success('操作成功，请在第一个输入框查看结果', {
          closable: true,
          duration: 5000
        })
        setTimeout(() => {
          btnLoading.value = false
        }, 20)
      }).catch(function (error) {
        window.$message.destroyAll()
        window.$message.error(error.response.data.message || 'Error', {
          closable: true,
          duration: 5000
        })
        btnLoading.value = false
      })
    }

    return {
      btnLoading,
      formRef,
      model,
      handleValidateButtonClick
    }
  }
})
</script>

<style lang="scss" scoped>
.main-form {
  width: 500px;
  margin: 200px auto;
  .title {
    width: 100%;
    margin: 15px auto;
    font-size: 26px;
    text-align: center;
  }
  .operate-row {
    .n-button {
      width: 450px;
      margin-left: 50px;
    }
  }
}
</style>
