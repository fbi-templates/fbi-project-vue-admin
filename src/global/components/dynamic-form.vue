// 动态表单
// 支持 el-form 和 el-form-item 的所有属性和方法
// 新增属性: v-model, schema, loading, showAction, center (仅提交按钮居中)
// 新增方法: submit, reset
// 可外部调用的内置方法: validate

<template>
  <section
    :class="{
    'is-group': isGroup,
    'is-multiple': isMultiple
  }"
    class="dynamic-form"
  >
    <!-- header -->
    <slot name="header"></slot>

    <!-- form body -->
    <!-- 进来直接变数组 -->
    <template v-if="Array.isArray(computedFormData)">
      <!-- 表单数组 -->
      <el-form
        :key="'form' + idx"
        :model="formData[idx]"
        :ref="ref + idx"
        :rules="rules"
        class="form-box"
        v-bind="$attrs"
        v-for="(form, idx) of formData"
        v-on="$listeners"
      >
        <!-- -->
        <template v-if="(computedSchema[idx] || computedSchema[computedSchema.length - 1])">
          <template v-if="isGroup">
            <div
              :key="groupIndex"
              :ref="'formGroup' + groupIndex"
              class="form-group"
              v-for="(schemas, groupIndex) of schemaData[0]"
            >
              <template v-for="(item, index) of schemas">
                <!-- 遍历schema中的每一项 -->
                <div :key="index" class="title" v-if="isMultiple && item.type === 'title'">
                  <el-button
                    @click="removeForm(idx)"
                    icon="el-icon-delete"
                    size="small"
                    v-if="showAction && formData.length > 1"
                  ></el-button>
                </div>
                <!-- 字表单数组 -->
                <dynamic-subform
                  :idx="idx"
                  :index="index"
                  :item="item"
                  :key="index"
                  :value="formData[idx][item.prop]"
                  @item-update="itemUpdate"
                  v-if="Array.isArray(item.items) && (item.vIf ? item.vIf() : true)"
                ></dynamic-subform>

                <dynamic-form-item
                  :item="item"
                  :key="index"
                  :style="itemStyle"
                  :value="formData[idx][item.prop]"
                  @item-update="itemUpdate(Array.from(arguments), idx)"
                  v-else
                ></dynamic-form-item>
              </template>
            </div>
          </template>

          <template v-else>
            <template
              v-for="(item, index) of (schemaData[idx] || schemaData[schemaData.length - 1])"
            >
              <dynamic-subform
                :idx="idx"
                :index="index"
                :item="item"
                :key="index"
                :value="formData[idx][item.prop]"
                @item-update="itemUpdate"
                v-if="Array.isArray(item.items) && (item.vIf ? item.vIf() : true)"
              ></dynamic-subform>
              <dynamic-form-item
                :item="item"
                :key="index"
                :style="itemStyle"
                :value="formData[idx][item.prop]"
                @item-update="itemUpdate(Array.from(arguments), idx)"
                v-on="formItemListeners"
              ></dynamic-form-item>
            </template>
          </template>
        </template>
      </el-form>

      <!-- buttons -->
      <div class="action-box" v-if="isMultiple && showAction">
        <el-button @click="addForm" icon="el-icon-plus" type="default">添加一组</el-button>
      </div>
      <div
        :style="center ? { textAlign: 'center' } : { marginLeft: isGroup ? 'auto' : $attrs['label-width'] || 0}"
        class="btn-box"
        v-if="buttons || $slots.buttons"
      >
        <slot name="buttons" v-bind="{ formData, loading }">
          <el-button :loading="loading" @click="submit" type="primary">{{ buttons.saveText }}</el-button>
          <el-button @click="reset" type="default" v-if="buttons.showReset">{{ buttons.resetText }}</el-button>
        </slot>
      </div>
    </template>

    <!-- footer -->
    <slot name="footer"></slot>
  </section>
</template>

<script>
  import DynamicFormItem from './dynamic-form-item'
  import DynamicSubform from './dynamic-subform'

  const validatePromise = form => {
    return new Promise((resolve, reject) => {
      if (form.validate) {
        form.validate(valid => (valid ? resolve(valid) : reject(false)))
      } else {
        reject(false)
      }
    })
  }

  export default {
    name: 'DynamicForm',

    components: {
      DynamicFormItem,
      DynamicSubform
    },

    inheritAttrs: false,

    props: {
      schema: {
        type: Array | Object,
        default: _ => []
      },
      value: {
        type: Array | Object,
        default: _ => ({})
      },
      rules: {
        type: Object,
        default: _ => ({})
      },
      valid: {
        type: Boolean,
        default: false
      },
      loading: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ''
      },
      showAction: {
        type: Boolean,
        default: true
      },
      center: {
        type: Boolean,
        default: false
      },
      maxWidth: {
        type: String,
        default: ''
      },
      buttons: {
        type: Object,
        default: () => ({
          saveText: '保存',
          resetText: '重置',
          showReset: true
        })
      }
    },

    data() {
      return {
        formData: null,
        schemaData: [],
        ref: 'dynamicForm',
        isGroup: false,
        groupDividers: ['title']
      }
    },

    computed: {
      isMultiple() {
        return Array.isArray(this.value)
      },
      computedFormData() {
        this.formData =
          this.formData ||
          (this.value ? (Array.isArray(this.value) ? this.value : [this.value]) : [{}])
        return this.formData
      },
      // 动态表单
      computedSchema() {
        const tmp = (Array.isArray(this.schema[0]) ? this.schema : [this.schema]).filter(Boolean)
        const schemas = tmp.map(t => t.filter(Boolean))
        this.isGroup = schemas.some(s => s.find(i => this.isGroupDividers(i)))

        const ret = []
        if (this.isGroup) {
          for (let schema of schemas) {
            const children = []
            let innerIndex = 0
            for (let [index, item] of schema.filter(Boolean).entries()) {
              if (
                schema[index - 1] &&
                !this.isGroupDividers(schema[index - 1]) &&
                this.isGroupDividers(item)
              ) {
                innerIndex++
              }
              if (index === 0 || !children[innerIndex]) {
                children[innerIndex] = []
              }

              children[innerIndex].push(item)
            }

            ret.push(children)
          }
          this.schemaData = ret
        } else {
          this.schemaData = schemas
        }
        return this.schemaData
      },
      formItemListeners() {
        const tmp = {}
        Object.entries(this.$listeners).map(([key, val]) => {
          if (!['input', 'item-update'].includes(key)) {
            tmp[key] = val
          }
        })
        return tmp
      },
      itemStyle() {
        return this.maxWidth
          ? {
              maxWidth: this.maxWidth
            }
          : ''
      }
    },

    watch: {
      value: {
        handler(val) {
          this.formData = val ? (Array.isArray(val) ? val : [val]) : [{}]
        },
        deep: true
      }
    },

    methods: {
      isGroupDividers(item) {
        return item && this.groupDividers.includes(item.type)
      },

      itemUpdate([itemName, itemValue], idx, dataItem, prop) {
        if (dataItem) {
          this.$set(dataItem, itemName, itemValue)
        } else {
          if (Array.isArray(this.formData)) {
            this.$set(this.formData[idx], itemName, itemValue)
          } else {
            this.$set(this.formData, itemName, itemValue)
          }
        }
        this.$emit(
          'input',
          this.isMultiple ? this.formData : this.formData[0],
          [itemName, itemValue],
          idx
        )
      },

      validate(cb) {
        return Promise.all(
          this.formData.map((form, idx) => validatePromise(this.$refs[this.ref + idx][0]))
        )
      },

      validateField(field) {
        this.formData.map((form, idx) => this.$refs[this.ref + idx][0].validateField(field))
      },

      submit() {
        return this.validate()
          .then(() => {
            const valid = true
            const data = this.isMultiple ? this.formData : this.formData[0]
            this.$emit('update:valid', valid)
            this.$emit('submit', valid, data)
            return {
              valid,
              data
            }
          })
          .catch(err => {
            console.error(err)
            this.$emit('update:valid', false)
          })
      },

      reset() {
        this.formData.map((form, idx) => this.$refs[this.ref + idx][0].resetFields())
        this.$emit('reset')
      },

      addForm() {
        this.formData.push({
          ...(Array.isArray(this.value) ? this.value[this.value.length - 1] : this.value)
        })
        this.$emit('add-form', this.formData.length)
      },
      removeForm(idx) {
        this.formData.splice(idx, 1)
        this.$emit('remove-form', idx)
      }
    }
  }
</script>


<style scoped>
  .form-box {
    margin-bottom: 20px;

    >>> .title {
      margin: 0;
      padding: 10px 0 20px;

      h3 {
        margin: 0;
        padding: 0;
      }
    }

    >>> .sub-title {
      margin: 0;
      padding: 5px 0 15px;
    }

    >>> &.el-form--inline .form-item {
      display: inline-block;
      vertical-align: top;
    }
  }

  >>> .el-form-item {
    margin-bottom: 0;
  }

  >>> .el-form--inline {
    .form-item {
      margin-right: 20px;
    }
    .el-form-item {
      margin-right: 0 !important;
    }
    .el-form-item__label-wrap {
      margin-left: 0 !important;
    }
  }
</style>
