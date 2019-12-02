<template>
  <div>
    <div
      class="form-container"
      :class="[collapsed ? 'form-container_close' : 'form-container_open']"
    >
      <a-form :form="form" class="form form-grid" layout="inline">
        <a-row :gutter="48">
          <a-col :xl="8" :md="12" :sm="24">
            <a-form-item :colon="false" label="关键字" class="form-item">
              <a-input
                aria-placeholder="请输搜索入关键字"
                placeholder="请输搜索入关键字"
                :size="currentSize"
                class="form-item_280"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="8" :md="12" :sm="24">
            <a-form-item :colon="false" label="关键字" class="form-item">
              <a-input
                aria-placeholder="请输搜索入关键字"
                placeholder="请输搜索入关键字"
                :size="currentSize"
                class="form-item_280"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="8" :md="12" :sm="24" v-show="collapse">
            <a-form-item :colon="false" label="关键字" class="form-item">
              <a-input
                aria-placeholder="请输搜索入关键字"
                placeholder="请输搜索入关键字"
                :size="currentSize"
                class="form-item_280"
              ></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <template v-if="collapse">
          <a-row :gutter="48">
            <a-col :xl="8" :md="12" :sm="24">
              <a-form-item :colon="false" label="上架时间">
                <a-range-picker
                  @change="onChange"
                  :size="currentSize"
                  class="form-item_280"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="8" :md="12" :sm="24">
              <a-form-item :colon="false" label="到期时间">
                <a-range-picker
                  @change="onChange"
                  :size="currentSize"
                  class="form-item_280"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="8" :md="12" :sm="24">
              <a-form-item :colon="false" label="到期时间">
                <a-range-picker
                  @change="onChange"
                  :size="currentSize"
                  class="form-item_280"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="48">
            <a-col :xl="8" :md="12" :sm="24">
              <a-form-item :colon="false" label="发布者">
                <a-input
                  aria-placeholder="请输入发布者名称"
                  placeholder="请输入发布者名称"
                  :size="currentSize"
                  class="form-deliver__input_280"
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="8" :md="12" :sm="24">
              <a-form-item :colon="false" label="关键词">
                <a-input
                  class="form-deliver__input_240"
                  aria-placeholder="请输入关键词"
                  placeholder="请输入关键词"
                  :size="currentSize"
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="8" :md="24" :sm="24">
              <a-form-item :colon="false" label="有无评价" class="form-deliver">
                <a-select
                  v-model="selectOption"
                  class="form-deliver__select"
                  :size="currentSize"
                >
                  <a-select-option
                    v-for="listItem in listOption"
                    :key="listItem"
                    >{{ listItem }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </template>
        <ToggleOption
          :currentSize="currentSize"
          :collapse="collapse"
          @toggle="hanldeToggle($event)"
        ></ToggleOption>
      </a-form>
    </div>
    <div
      class="container-bg form-operation"
      :class="[collapse ? 'form-operation_open' : 'form-operation_close']"
    >
      <a-table
        :columns="columns"
        :dataSource="currentData"
        :rowSelection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange
        }"
        :scroll="{ y: 300 }"
        :size="currentSize"
        :pagination="false"
      >
        <template slot="name" slot-scope="name">
          <span style="display:inline-block;width:120px">{{ name }}</span>
        </template>
        <template slot="operation" slot-scope="scope">
          <a-popconfirm
            title="Sure to delete?"
            @confirm="() => onDelete(scope.key)"
          >
            <a href="javascript:;" class="form-search">查看</a>
            <span class="form-delete">删除</span>
          </a-popconfirm>
        </template>
      </a-table>
      <div>
        <a-row :gutters="48" class="table-footer">
          <a-col align="center" :lg="8" :sm="24">
            <div class="table-operation">
              <a-button :size="currentSize">导入</a-button>
              <a-button :size="currentSize" class="form-output">导出</a-button>
              <a-button :size="currentSize">打印</a-button>
            </div>
          </a-col>
          <a-col align="center" :lg="8" :sm="24">
            <a-pagination
              showSizeChanger
              @change="changePage"
              @showSizeChange="onShowSizeChange"
              :current="current"
              :total="loadData.length"
            />
          </a-col>
          <a-col align="center" :lg="8" :sm="24">
            <a-button-group class="table-operation">
              <a-button @click="changeSize('large')">L</a-button>
              <a-button @click="changeSize('middle')">M</a-button>
              <a-button @click="changeSize('small')">S</a-button>
            </a-button-group>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
import ToggleOption from '@/components/toggleOption/ToggleOption';

const columns = [
  {
    title: '任务编号ID',
    dataIndex: 'id',
    width: 140
  },
  {
    title: '商品名称',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' },
    width: 200
  },
  {
    title: '年龄',
    dataIndex: 'age',
    width: 140
  },
  {
    title: '用户信息',
    dataIndex: 'user',
    width: 200
  },
  {
    title: '任务时间',
    dataIndex: 'time',
    width: 200
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 200
  },
  {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
    width: 200
  }
];
import { mapGetters } from 'vuex';
export default {
  components: {
    ToggleOption
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'table' }),
      collapse: false,
      columns,
      selectedRowKeys: [],
      listOption: ['中国银行', '中国工商银行'],
      loadData: [],
      current: 1,
      pageSize: 10,
      selectOption: ['中国工商银行'],
      plainOptions: ['选项01', '选项02', '选项03', '选项04', '选项05'],
      checkedList: ['选项02', '选项03'],
      currentSize: 'large'
    };
  },
  computed: {
    ...mapGetters(['collapsed']),
    currentData() {
      return this.loadData.slice(
        (this.current - 1) * this.pageSize,
        this.current * this.pageSize
      );
    }
  },
  created() {
    for (let i = 0; i < 46; i++) {
      this.loadData.push({
        id: i + 1,
        key: i,
        name: `Edward King ${i}`,
        age: Math.floor(Math.random() * 100),
        user: `Edward ${i}`,
        time: '2004-05-12 1989-12-16',
        address: `London, Park Lane no. ${i}`,
        status: `${i % 2 ? '待审核' : '未通过'}`
      });
    }
  },
  methods: {
    changePage(pagination, filters, sorter) {
      this.current = pagination;
    },
    onShowSizeChange(current, pageSize) {
      this.pageSize = pageSize;
    },
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    changeSize(data) {
      this.currentSize = data;
    },
    onDelete(key) {},
    hanldeToggle() {
      this.collapse = !this.collapse;
    },
    onChange() {}
  }
};
</script>

<style scoped lang="less">
@import "../../../config/theme.less";
.form-container {
  padding: 6px;
  background-color: #fff;
  position: fixed;
  top: 80px;
  right: 16px;
  z-index: 10;
  transition: 0.5s ease;
  &_open {
    left: 256px;
  }
  &_close {
    left: 16px;
  }
}
.form {
  position: relative;
  &-item {
    &_280 {
      width: 280px;
    }
  }
  &-operation {
    &_open {
      margin-top: 264px;
    }
    &_close {
      margin-top: 92px;
    }
  }
  &-search {
    width: 28px;
    height: 14px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(57, 41, 215, 1);
    line-height: 14px;
  }
  &-output {
    margin-left: 16px;
    margin-right: 16px;
  }
  &-delete {
    margin-left: 8px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.87);
    line-height: 14px;
  }
}
.table-footer {
  display: flex;
  align-items: center;
}
.table-operation {
  margin-top: 24px;
}
</style>
