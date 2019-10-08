<template>
  <section class="wrapper">
    <h1>动态表单</h1>

    <h2>基本使用</h2>
    <dynamic-form
      :loading="formLoading"
      :rules="formRules"
      :schema="formSchema"
      @reset="formReset"
      @submit="formSubmit"
      label-width="80px"
      max-width="600px"
      v-model="formData"
    ></dynamic-form>

    <h2>all slots</h2>
    <dynamic-form
      :loading="formLoading2"
      :schema="formSchema2"
      @submit="formSubmit2"
      label-width="80px"
      v-model="formData2"
    >
      <template v-slot:header>
        <h3>Here might be a form title</h3>
      </template>
      <template v-slot:buttons>
        <p>自定义按钮</p>
      </template>
      <template v-slot:footer>
        <p>Here's some contact info</p>
      </template>
    </dynamic-form>

    <h2>自定义按钮 (手动表单验证)</h2>
    <dynamic-form
      :loading="formLoading3"
      :schema="formSchema3"
      label-width="80px"
      ref="myDynamicForm3"
      v-model="formData3"
    >
      <template v-slot:buttons="slotProps">
        <el-button
          :loading="slotProps.loading"
          @click="formSubmit3(slotProps.formData, slotProps.loading)"
          type="primary"
        >save</el-button>
        <el-button @click="formReset3" type="default">reset</el-button>
        {{slotProps}}
      </template>
    </dynamic-form>

    <h2>表单项自定义组件</h2>
    <dynamic-form
      :loading="formLoading5"
      :schema="formSchema5"
      @submit="formSubmit5"
      label-width="100px"
      ref="myDynamicForm5"
      v-model="formData5"
    ></dynamic-form>

    <h2>表单分组</h2>
    <dynamic-form
      :loading="formLoading4"
      :schema="formSchema4"
      @submit="formSubmit4"
      label-width="80px"
      max-width="600px"
      ref="myDynamicForm4"
      v-model="formData4"
    ></dynamic-form>

    <h2>表单组</h2>
    <dynamic-form
      :loading="formLoading6"
      :schema="formSchema6"
      @submit="formSubmit6"
      label-width="100px"
      max-width="700px"
      ref="myDynamicForm6"
      v-model="formData6"
    ></dynamic-form>

    <h2>内嵌表单组</h2>
    <dynamic-form
      :loading="formLoading7"
      :schema="formSchema7"
      @submit="formSubmit7"
      label-width="100px"
      max-width="700px"
      ref="myDynamicForm7"
      v-model="formData7"
    ></dynamic-form>
  </section>
</template>

<script>
  const customSelect = {
    name: 'my-select',
    props: ['value'],
    data() {
      return {
        selectValue: this.value || 0,
        inputValue: 0
      }
    },
    computed: {
      showInput() {
        return this.selectValue === 0
      }
    },
    template: `
              <div>
                <el-select @change="onSelectChange" v-model="selectValue" placeholder="请选择">
                  <el-option
                    v-for="(item, index) of 5"
                    :key="index"
                    :label="index"
                    :value="index">
                  </el-option>
                </el-select>
                <el-input-number @change="onInputChange" v-if="showInput" v-model="inputValue" placeholder="请输入内容"></el-input-number>
              </div>`,
    methods: {
      onSelectChange(val) {
        this.$emit('input', val || this.inputValue)
      },
      onInputChange(val) {
        this.$emit('input', val)
      }
    }
  }

  const customSelect2 = {
    name: 'my-select2',
    props: ['value'],
    data() {
      return {
        selectValue: this.value || 0,
        inputValue: 0
      }
    },
    computed: {
      show() {
        return this.selectValue === 0
      }
    },
    template: `
              <span v-if="show">
                <el-input-number @change="onInputChange" v-model="inputValue" placeholder="请输入数字"></el-input-number>
              </span>`,
    methods: {
      onInputChange(val) {
        this.$emit('input', val)
      }
    }
  }

  export default {
    data() {
      return {
        // 1 基本使用
        formData: {
          name: '',
          region: '',
          date: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          count: 20
        },
        formSchema: [
          {
            el: 'input',
            label: '活动名称',
            prop: 'name',
            rules: [
              { required: true, message: '请输入活动名称', trigger: 'blur' },
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ]
          },
          {
            el: 'select',
            label: '活动区域',
            prop: 'region',
            optionEl: 'option',
            options: [
              {
                label: '区域一',
                value: 'shanghai'
              },
              {
                label: '区域二',
                value: 'beijing'
              }
            ],
            rules: [{ required: true, message: '请选择活动区域', trigger: 'change' }]
          },
          {
            el: 'date-picker',
            type: 'datetimerange',
            label: '活动时间',
            prop: 'date',
            'end-placeholder': '结束日期',
            format: 'yyyy-MM-dd HH:mm:ss',
            'range-separator': '至',
            'start-placeholder': '开始日期',
            'unlink-panels': true
          },
          {
            el: 'switch',
            label: '即时配送',
            prop: 'delivery'
          },
          {
            el: 'checkbox-group',
            label: '活动性质',
            prop: 'type',
            optionEl: 'checkbox', // 'checkbox-button'
            options: [
              {
                label: '美食/餐厅线上活动',
                name: 'type'
              },
              {
                label: '地推活动',
                name: 'type'
              },
              {
                label: '线下主题活动',
                name: 'type'
              },
              {
                label: '单纯品牌曝光',
                name: 'type'
              }
            ]
          },
          {
            el: 'radio-group',
            label: '特殊资源',
            prop: 'resource',
            optionEl: 'radio', // 'radio-button'
            options: [
              {
                label: 1,
                value: '线上品牌商赞助'
              },
              {
                label: 2,
                value: '线下场地免费'
              }
            ]
          },
          {
            el: 'input',
            type: 'textarea',
            label: '活动形式',
            prop: 'desc'
          },
          {
            el: 'slider',
            label: '活动人数',
            prop: 'count',
            min: 0,
            max: 50,
            showInput: true
          }
        ],

        formRules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
          date: [{ type: 'array', required: true, message: '请选择日期', trigger: 'change' }],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [{ required: true, message: '请选择活动资源', trigger: 'change' }],
          desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }],
          count: [{ type: 'number', required: true, message: '请填写活动人数', trigger: 'blur' }]
        },
        formLoading: false,

        // 2 all slots
        formSchema2: [
          {
            el: 'input',
            label: '活动名称',
            prop: 'name'
          },
          {
            els: [
              {
                component: {
                  props: ['loading'],
                  template: `<el-button :loading="loading" type="primary" @click="$emit('submit')">保存</el-button>`
                }
              }
            ]
          }
        ],
        formData2: {
          name: ''
        },
        formLoading2: false,

        // 3 自定义按钮 (手动表单验证)
        formSchema3: [
          {
            el: 'input',
            label: '活动名称',
            prop: 'name',
            rules: [
              { required: true, message: '请输入活动名称', trigger: 'blur' },
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ]
          },
          {
            el: 'radio-group',
            label: '特殊资源',
            prop: 'resource',
            optionEl: 'radio',
            options: [
              {
                label: 1,
                value: '线上品牌商赞助'
              },
              {
                label: 2,
                value: '线下场地免费'
              }
            ],
            rules: { required: true, message: '请选择活动资源', trigger: 'change' }
          }
        ],
        formData3: {
          name: ''
        },
        formLoading3: false,

        // 4 分组表单
        formSchema44: {
          groups: [
            {
              title: '基本信息',
              schema: [
                {
                  type: 'title',
                  content: '基本信息',
                  autoIndex: false
                },
                {
                  el: 'input',
                  label: '活动名称',
                  prop: 'name'
                },
                {
                  el: 'select',
                  label: '活动区域',
                  prop: 'region',
                  optionEl: 'option',
                  options: [
                    {
                      label: '区域一',
                      value: 'shanghai'
                    },
                    {
                      label: '区域二',
                      value: 'beijing'
                    }
                  ]
                },
                {
                  el: 'date-picker',
                  type: 'datetimerange',
                  label: '活动时间',
                  prop: 'date',
                  'end-placeholder': '结束日期',
                  format: 'yyyy-MM-dd HH:mm:ss',
                  'range-separator': '至',
                  'start-placeholder': '开始日期',
                  'unlink-panels': true
                }
              ]
            },
            {
              title: '额外信息',
              schema: [
                {
                  type: 'title',
                  content: '额外信息',
                  autoIndex: false
                },
                {
                  type: 'title',
                  content: '子标题1'
                },
                {
                  el: 'checkbox-group',
                  label: '活动性质',
                  prop: 'type',
                  optionEl: 'checkbox', // 'checkbox-button'
                  options: [
                    {
                      label: '美食/餐厅线上活动',
                      name: 'type'
                    },
                    {
                      label: '地推活动',
                      name: 'type'
                    },
                    {
                      label: '线下主题活动',
                      name: 'type'
                    },
                    {
                      label: '单纯品牌曝光',
                      name: 'type'
                    }
                  ]
                },
                {
                  el: 'radio-group',
                  label: '特殊资源',
                  prop: 'resource',
                  optionEl: 'radio', // 'radio-button'
                  options: [
                    {
                      label: 1,
                      value: '线上品牌商赞助'
                    },
                    {
                      label: 2,
                      value: '线下场地免费'
                    }
                  ]
                },
                {
                  type: 'divider',
                  content: '分割线',
                  contentPosition: 'right'
                },
                {
                  type: 'title',
                  content: '子标题2'
                },
                {
                  el: 'input',
                  type: 'textarea',
                  label: '活动形式',
                  prop: 'desc'
                }
              ]
            }
          ]
        },
        formSchema4: [
          {
            type: 'title',
            content: '基本信息',
            autoIndex: false
          },
          {
            el: 'input',
            label: '活动名称',
            prop: 'name'
          },
          {
            el: 'select',
            label: '活动区域',
            prop: 'region',
            optionEl: 'option',
            options: [
              {
                label: '区域一',
                value: 'shanghai'
              },
              {
                label: '区域二',
                value: 'beijing'
              }
            ]
          },
          {
            el: 'date-picker',
            type: 'datetimerange',
            label: '活动时间',
            prop: 'date',
            'end-placeholder': '结束日期',
            format: 'yyyy-MM-dd HH:mm:ss',
            'range-separator': '至',
            'start-placeholder': '开始日期',
            'unlink-panels': true
          },

          {
            type: 'title',
            content: '额外信息',
            autoIndex: false
          },
          {
            type: 'sub-title',
            content: '子标题1'
          },
          {
            el: 'checkbox-group',
            label: '活动性质',
            prop: 'type',
            optionEl: 'checkbox', // 'checkbox-button'
            options: [
              {
                label: '美食/餐厅线上活动',
                name: 'type'
              },
              {
                label: '地推活动',
                name: 'type'
              },
              {
                label: '线下主题活动',
                name: 'type'
              },
              {
                label: '单纯品牌曝光',
                name: 'type'
              }
            ]
          },
          {
            el: 'radio-group',
            label: '特殊资源',
            prop: 'resource',
            optionEl: 'radio', // 'radio-button'
            options: [
              {
                label: 1,
                value: '线上品牌商赞助'
              },
              {
                label: 2,
                value: '线下场地免费'
              }
            ]
          },
          {
            type: 'divider',
            content: '分割线',
            contentPosition: 'right'
          },
          {
            type: 'sub-title',
            content: '子标题2'
          },
          {
            el: 'input',
            type: 'textarea',
            label: '活动形式',
            prop: 'desc'
          }
        ],
        formData4: {
          name: '',
          region: '',
          date: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          count: 20
        },
        formLoading4: false,

        // 5 表单项自定义组件
        formSchema5: [
          {
            el: 'input',
            label: '活动名称',
            prop: 'name',
            rules: [
              { required: true, message: '请输入活动名称', trigger: 'blur' },
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            tips: '长度在 3 到 5 个字符'
          },
          {
            label: '活动人数',
            prop: 'count',
            component: customSelect,
            rules: [
              { type: 'number', required: true, min: 1, message: '请输入活动人数', trigger: 'change' }
            ]
          },
          {
            el: 'select',
            label: '领队人数',
            prop: 'leaderCount',
            optionEl: 'option',
            options: [
              {
                label: 1,
                value: 1
              },
              {
                label: '自定义',
                value: 0
              }
            ],
            component: customSelect2,
            rules: [
              { type: 'number', required: true, min: 1, message: '请输入领队人数', trigger: 'change' }
            ]
          }
        ],
        formData5: {
          name: '',
          count: '',
          leaderCount: ''
        },
        formLoading5: false,

        // 6 表单数组
        formSchema6: [
          {
            type: 'title',
            content: '摄像头',
            autoIndex: true
          },
          {
            el: 'input',
            label: '活动名称',
            prop: 'name',
            rules: [
              { required: true, message: '请输入活动名称', trigger: 'blur' },
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            tips: '长度在 3 到 5 个字符'
          },
          {
            label: '活动人数',
            prop: 'count',
            component: customSelect,
            rules: [
              { type: 'number', required: true, min: 1, message: '请输入活动人数', trigger: 'change' }
            ]
          },
          {
            el: 'select',
            label: '领队人数',
            prop: 'leaderCount',
            optionEl: 'option',
            options: [
              {
                label: 1,
                value: 1
              },
              {
                label: '自定义',
                value: 0
              }
            ],
            component: customSelect2,
            rules: [
              { type: 'number', required: true, min: 1, message: '请输入领队人数', trigger: 'change' }
            ]
          }
        ],
        formData6: [
          {
            name: '',
            count: '',
            leaderCount: ''
          },
          {
            name: '',
            count: '',
            leaderCount: ''
          }
        ],
        formLoading6: false,

        formSchema7: [
          {
            el: 'input',
            label: '活动名称',
            prop: 'name',
            rules: [
              { required: true, message: '请输入活动名称', trigger: 'blur' },
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            tips: '长度在 3 到 5 个字符'
          },
          {
            prop: 'list',
            items: [
              {
                el: 'input',
                label: 'x',
                prop: 'x'
              },
              {
                el: 'input',
                label: 'y',
                prop: 'y'
              }
            ]
          }
        ],
        formData7: {
          name: '',
          list: [
            {
              x: '',
              y: ''
            }
          ]
        },
        formLoading7: false
      }
    },

    methods: {
      formSubmit(valid, data) {
        console.log('formSubmit', valid, data)
        if (valid) {
          this.formLoading = true
          setTimeout(() => {
            alert(JSON.stringify(data, null, 2))
            this.formLoading = false
          }, 1500)
        } else {
          alert('form data is not valid')
        }
      },
      formReset() {
        console.log('cancel', this.formData)
      },

      // 2
      formSubmit2(valid, data) {
        console.log('formSubmit2', valid, data)
        alert(JSON.stringify(data, null, 2))
      },

      // 3
      formSubmit3() {
        this.formLoading3 = true
        this.$refs.myDynamicForm3
          .validate()
          .then(() => {
            console.log('formSubmit3', this.formData3)

            setTimeout(() => {
              this.formLoading3 = false
              alert(JSON.stringify(this.formData3, null, 2))
            }, 1500)
          })
          .catch(err => {
            this.formLoading3 = false
            alert('not valid')
          })
      },
      formReset3() {
        this.$refs.myDynamicForm3.reset()
      },

      // 4
      formSubmit4(valid, data) {
        console.log(valid, data)
        if (valid) {
          alert(JSON.stringify(this.formData4, null, 2))
        }
      },

      // 5
      formSubmit5(valid, data) {
        console.log(valid, data)
        if (valid) {
          alert(JSON.stringify(this.formData5, null, 2))
        }
      },

      // 6
      formSubmit6(valid, data) {
        console.log(valid, data)
        if (valid) {
          alert(JSON.stringify(this.formData6, null, 2))
        }
      },
      formSubmit7(valid, data) {
        console.log(valid, data)
        if (valid) {
          alert(JSON.stringify(this.formData7, null, 2))
        }
      }
    }
  }
</script>

<style scoped>
  @import url('../assets/css/vars.css');

  .wrapper {
    padding: 20px;

    >>> .form-group {
      padding: 18px;
      margin-bottom: 20px;
      border: 1px solid $border-color-light;
      background-color: #fff;
    }
  }

  .dynamic-form:last-child {
    max-width: 800px;
  }

  h2 {
    margin-top: 80px;
  }
</style>
