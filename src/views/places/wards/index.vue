<template>
  <page-main>
    <Table
      ref="table"
      :show-selection="showSelection"
      :show-index="showIndex"
      :data="tableData"
    >
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="address" label="Address" />
      <el-table-column prop="date" label="Date" />
      <el-table-column label="Option" align="center" fixed="right" width="200">
        <template #default="scope">
          <el-button @click="handleUpdate(scope.row)" type="info" plain circle>
            <el-icon><icon-ep-edit /></el-icon>
          </el-button>
          <el-popconfirm
            @confirm="handleDelete(scope.row)"
            :title="$t('sys.manage.description.delete')"
          >
            <template #reference>
              <el-button type="danger" plain circle>
                <el-icon><icon-ep-delete /></el-icon>
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </Table>
  </page-main>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Table from "/@/components/table/index.vue";
import { useMessage } from "/@/hooks/web/useMessage";

const showIndex = ref(true);
const showSelection = ref(true);

const { notify } = useMessage();

const handleUpdate = (row: object) => {
  console.log(row);
};

const handleDelete = (row: object) => {
  console.log(row);
};

const tableData = ref([
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
]);
</script>
