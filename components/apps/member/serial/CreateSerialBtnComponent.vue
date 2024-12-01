<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import { options } from "#build/eslint.config.mjs";
import { useDistrictApi } from "@/apis";
import { useDistrictId } from "@/store/DistrictInformation";
import { ref, watch } from "vue";
import { type InferType, object, string } from "yup";
import { useUserSerialNumberApi } from "~/apis";
import type { Role } from "~/types";

//  輸入區ID
const IDvalue = ref("");
console.log(IDvalue.value);

// type Schema = InferType<typeof schema>

// const state = ref({
//   data: {
//     districtId: '',
//     email: undefined,
//     password: undefined,
//     role: 'user',
//     notes: '',
//   },
//   modal: false,
// })

// const { data: getDistrictResponse } = useDistrictApi.getAll()
// const districtOptions = computed(() => getDistrictResponse.value?.districts.map(district => ({
//   label: district.name,
//   value: district._id,
// })))

// const schema = object({
//   email: string().email('Invalid email').required('Required'),
//   password: string()
//     .min(8, 'Must be at least 8 characters')
//     .required('Required'),
//   role: string().required('Required'),
//   districtId: string().required('Required'),
// })

// const roleOptions: {
//   label: string
//   value: Role
// }[] = [
//   { label: 'Full Time', value: 'fullTime' },
//   { label: 'District Leader', value: 'districtLeader' },
//   { label: 'Shepherd', value: 'shepherd' },
//   { label: 'User', value: 'user' },
// ]

// async function onSubmit(event: FormSubmitEvent<Schema>) {
//   // Do something with event.data
//   // eslint-disable-next-line no-console
//   console.log(event.data)
// }

// ----------------------------

const { data } = useDistrictApi.getAll();
console.log("data", data.value);

const districtOption = ref([
  {
    _id: "673594eaee3860b7fbd7e9ad",
    name: "77",
  },
  {
    _id: "6739e419cdb04c9cbdd991bd",
    name: "99",
  },
]);

const schema = object({
  email: string().email("Invalid email").required("Required"),
  password: string()
    .min(8, "Must be at least 8 characters")
    .required("Required"),
});

type Schema = InferType<typeof schema>;

const state = ref({
  data: {
    districtId: "",
    email: undefined,
    password: undefined,
    role: "user",
    notes: "",
  },
  modal: false,
});

//  處理送出表單

const FormDataSend = (index) => {
  ReserveFuned.value = products.value[index]; // 尋找index
  console.log(ReserveFuned.value);
};

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data);
}

// const {
//   execute: handleDistrictId, //  執行請求
// } = await useUserSerialNumberApi.create({
//   role: state.value.data.role,
//   districtId: state.value.data.districtId,
//   notes: "test",
// });

const handleEditDistrict = async () => {
  const { execute } = await useUserSerialNumberApi.create({
    role: state.value.data.role,
    districtId: state.value.data.districtId,
    notes: "test",
  });
  execute();
};

const Roleitems = [
  {
    label: "DistrictLeader",
    value: "districtLeader",
  },
  {
    label: "User",
    value: "user",
  },
];
const districtStore = useDistrictId(); // 獲取 store 實例

// 日誌輸出
console.log("District Name:", districtStore.name);
console.log("All IDs:", districtStore.IDAll);

const districtIDListref = ref<{ label: string; value: string }[]>([]);

// 使用 watch 監聽 districtStore.IDAll 的變化
watch(
  () => districtStore.IDAll,
  (newIDAll) => {
    // 當 IDAll 更新時，重新映射並賦值給 districtIDListref
    districtIDListref.value = newIDAll.map((item) => ({
      label: item.name,
      value: item._id,
    }));
  },
  { immediate: true } // 立即執行一次以初始化
);

console.log("+++++++", districtIDListref.value);

const selectedDistrict = ref("");
console.log(selectedDistrict.value);

// const open = ref(false)

const getSelectedLabel = computed(() => {
  const selectedItem = districtIDList.value.find(
    (item) => item.value === selectedDistrict.value
  );
  return selectedItem ? selectedItem.label : "選擇區";
});

const open1 = ref(true);
const open2 = ref(true);

defineShortcuts({
  o: () => (open1.value = !open1.value),
  o1: () => (open2.value = !open2.value),
});

// 取得所有區
const { data: allDistrictsResponse } = await useDistrictApi.getAll();
const districts = allDistrictsResponse.value?.districts;
if (Array.isArray(districts)) {
  // 檢查傳入的物件是否為陣列
  districtStore.saveIDs(districts);
}
</script>

<template>
  <UButton @click="state.modal = true"> 新增序號 </UButton>
  <UModal v-model="state.modal">
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            Modal
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="state.modal = false"
          />
        </div>
      </template>
      <div>
        <UForm
          :schema="schema"
          :state="state.data"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormGroup label="Role" name="role">
            <USelect
              v-model="state.data.role"
              color="primary"
              :options="Roleitems"
            />
            <!-- <UDropdown
              v-model:open="open1"
              :items="Roleitems"
              :popper="{ placement: 'bottom-start' }"
            >
              <UButton
                color="white"
                label="Options"
                trailing-icon="i-heroicons-chevron-down-20-solid"
              />
            </UDropdown> -->
          </UFormGroup>
          <UFormGroup label="選擇區ID" name="districtId">
            <USelect
              v-model="state.data.districtId"
              color="primary"
              :options="data?.districts"
              value-attribute="_id"
              option-attribute="name"
              @change="(value) => (state.data.districtId = value)"
            />
            <!-- <UDropdown
              v-model:open="open2"
              :items="districtIDList"
              :popper="{ placement: 'bottom-start' }"
            >
              <UButton
                color="white"
                label="getSelectedLabel"
                trailing-icon="i-heroicons-chevron-down-20-solid"
              />
            </UDropdown> -->
          </UFormGroup>

          <UButton type="submit" @click="handleEditDistrict"> Submit </UButton>
        </UForm>
      </div>
    </UCard>
  </UModal>
</template>
