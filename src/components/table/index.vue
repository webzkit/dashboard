<template>
  <div class="system-table-box text-blue">
    <el-table v-bind="$attrs" :data="props.data" class="system-table">
      <el-table-column
        type="selection"
        align="left"
        width="50"
        v-if="props.showSelection"
      >
      </el-table-column>
      <el-table-column
        label="#"
        width="50"
        align="center"
        v-if="props.showIndex"
      >
        <template #default="scope">
          {{ (props.page.index - 1) * props.page.size + scope.$index + 1 }}
        </template>
      </el-table-column>
      <slot></slot>
    </el-table>

    <div class="paginate-wrap">
      <el-pagination
        background
        :layout="props.pageLayout"
        :total="props.page.total"
        :pager-count="5"
        v-model:current-page="props.page.index"
        :page-size="props.page.size"
        :pageSizes="props.pageSizes"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  showSelection: { type: Boolean, default: false },
  showIndex: { type: Boolean, default: false },
  data: { type: Array<any>, default: () => [] },

  showPage: { type: Boolean, default: true },
  page: {
    type: Object,
    default: () => {
      return { index: 1, size: 10, total: 1000 };
    },
  },

  pageLayout: {
    type: String,
    default: "total, sizes, -> , prev, pager, next, jumper",
  },
  pageSizes: { type: Array<any>, default: () => [10, 20, 40, 80, 100, 200] },
});

const handleCurrentChange = (val: Number) => {
  props.page.index = val;
  console.log(props.page.index);
};

const handleSizeChange = (val: Number) => {
  props.page.size = val;
};
</script>
<style lang="scss">
.system-table-box {
  position: relative;
  height: 100%;

  .system-table {
    height: calc(100% - 45px);

    .el-table__inner-wrapper::before {
      background: transparent;
    }

    tbody {
      .el-table__row {
        &:nth-child(odd) {
          background: #fafafa;
        }
      }
    }
  }

  .el-pagination {
    margin-top: 15px;
    padding: 0;

    .el-pagination__sizes {
      margin-left: 0;
    }
  }

  .el-pagination__rightwrapper {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .el-pagination__jump {
      .el-pagination__editor {
        margin-right: 0 !important;
      }
    }
  }
}
</style>
