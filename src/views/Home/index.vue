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
  <n-message-provider />
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

// locale & dateLocale
import { zhCN, dateZhCN } from 'naive-ui'

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
        // formRef.value.validate((errors) => {
        //   if (!errors) {
        //     message.success('验证成功')
        //   } else {
        //     console.log(errors)
        //     message.error('验证失败')
        //   }
        // })
    }

    const onSubmit = () => {
      btnLoading.value = true
      window.$message.loading(
        '短链生成中，请稍后...'
      )

      fetch('/api/create', {
        method: 'POST',
        body: JSON.stringify(model),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then(res => res.json()).then(res => {
        console.log(res)
        model.url = res.link
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        window.$message.destroyAll()
        window.$message.success('操作成功，请在第一个输入框查看结果', {
          closable: true,
          duration: 3000
        })
        setTimeout(() => {
          btnLoading.value = false
        }, 200)
      })
    }

    return {
      btnLoading,
      formRef,
      model,
      handleValidateButtonClick,
      zhCN,
      dateZhCN,
    }
  },
})
</script>

<style>
  * {
    font-family: v-sans, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    line-height: 1.6;
  }
</style>

<style lang="scss" scoped>
.main-form {
  width: 500px;
  margin: 200px auto;
  .title {
    margin: 15px auto 15px 55px;
    font-size: 26px;
  }
  .operate-row {
    .n-button {
      width: 450px;
      margin-left: 50px;
    }
  }
}
</style>
