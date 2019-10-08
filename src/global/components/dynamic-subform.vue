// 表单中的子表单数组
<template v-if="Array.isArray(item.items) && item.isAdd">
  <!-- 遍历子表单数组 -->
  <section>
    <template v-for="(dataItem, dataIndex) of value">
      <div :key=" 'group' + dataIndex" :ref="'formGroup' + index" class="form-group">
        <div :key="'group-sub' + dataIndex" class="title">
          <el-button
            @click="removeFormItem(dataIndex, item.prop)"
            icon="el-icon-delete"
            size="small"
            v-if="value.length > 1"
          ></el-button>
        </div>
        <!-- 遍历子表单的每一个表单项 -->
        <template v-for="(schemaItem, groupIndex) of item.items">
          <dynamic-form-item
            :item="schemaItem"
            :key="'sub-' + groupIndex"
            :style="itemStyle"
            :value="dataItem[schemaItem.prop]"
            @item-update="itemUpdate(arguments, idx, dataItem, item.prop)"
          ></dynamic-form-item>
        </template>
      </div>
    </template>

    <div :key="'sub-' + index" class="action-box">
      <el-button @click="addFormItem(item.prop, value)" icon="el-icon-plus" type="default">添加一组</el-button>
    </div>
  </section>
</template>


<script>
  import DynamicFormItem from './dynamic-form-item'
  import { mapState } from 'vuex'

  export default {
    name: 'DynamicSubform',
    components: { DynamicFormItem },

    props: ['value', 'item', 'index', 'idx'],
    computed: {
      ...mapState({
        carInfo: state => state.car
      }),
      itemStyle() {
        return this.maxWidth
          ? {
              maxWidth: this.maxWidth
            }
          : ''
      }
    },

    methods: {
      removeFormItem(dataIndex, itemProp) {
        this.value.splice(dataIndex, 1)
      },
      addFormItem(prop, items) {
        // 全局store添加的表单项
        items.push(JSON.parse(JSON.stringify(this.carInfo.subFormDataItem)))
      },
      itemUpdate([itemName, itemValue], idx, dataItem, prop) {
        this.$emit('item-update', [itemName, itemValue], idx, dataItem, prop)
      }
    }
  }
</script>
