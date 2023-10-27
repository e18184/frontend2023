<template>
  <div>
    <h1>User CRUD</h1>
    <crud
      v-model:columns="columns"
      :http="axios"
      api="users"
      title="Users"
      row-key="id"
    />
  </div>
</template>

<script>
export default {
  name: "UserCrud",
  data() {
    return {
      columns: [
        {
          name: "first_name",
          required: true,
          label: "Name",
          align: "left",
          field: "first_name",
          qComponent: "QInput",
          value: "",
          size: "6",
          rules: "[val => val && val.length > 0 || 'Please type something']",
          showCreate: true,
          showUpdate: true,
        },
        {
          name: "email",
          required: true,
          label: "Email",
          align: "center",
          field: "email",
          qComponent: "QInput",
          value: "",
          size: "6",
          showCreate: true,
          showUpdate: true,
        },
      ],
    };
  },
};
</script>
