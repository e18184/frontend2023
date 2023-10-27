<!-- eslint-disable max-len -->
<template>
  <q-page padding>
    <q-form @submit="handleSubmit()" class="row q-col-gutter-sm">
      <q-input
        filled
        v-model="form.name"
        label="Tu nombre *"
        lazy-rules
        :rules="[
          (val) =>
            (val && val.length > 0) ||
            'Please type min 1 and max 191 characters',
        ]"
        class="col-lg-6 col-xs-12"
        type="text"
      />
      <q-input
        filled
        v-model="form.email"
        label="Tu correo *"
        lazy-rules
        class="col-lg-6 col-xs-12"
        type="email"
        :rules="[
          (val, rules) => rules.email(val) || 'Introdusca un email correcto',
        ]"
      />
      <q-select
        outlined
        v-model="form.gender"
        :options="selectOptions"
        label="Gender"
        class="col-lg-6 col-xs-12"
        type="text"
        :rules="[(val) => !!val || 'Campo es requerido']"
      />
      <q-select
        outlined
        v-model="form.status"
        :options="statusOptions"
        label="Status"
        class="col-lg-6 col-xs-12"
        type="text"
        :rules="[(val) => !!val || 'Campo es requerido']"
      />
      <q-select
        v-model="form.id"
        class="col-lg-6 col-xs-12"
        style="display: none"
      />

      <div class="col-12 q-gutter-sm">
        <q-btn
          label="Grabar"
          type="submit"
          color="primary"
          class="float-right"
          icon="save"
          @submit="handleSubmit()"
        />
        <q-btn
          label="Cancelar"
          color="white"
          class="float-right"
          text-color="primary"
          :to="{ name: 'User' }"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "FormUser",
  setup() {
    const form = ref({
      name: "",
      id: "",
      email: "",
      gender: "",
      status: "",
    });
    const route = useRoute();
    const getUsersById = async (id) => {
      try {
        const response = await api.get(`users/${id}`);
        const data = response.data;
        form.value = data;
        return form.value;
      } catch (error) {
        throw new Error(error);
      }
    };
    onMounted(async () => {
      if (route.params.id) {
        const response = await getUsersById(route.params.id);
        form.value = response;
      }
    });
    const $q = useQuasar();
    const router = useRouter();
    const selectOptions = ["masculino", "femenino"];
    const statusOptions = ["activo", "inactivo"];

    const post = async (form) => {
      try {
        const { data } = await api.post("users", form.value);
        console.log("datos guardar:" + data.data);
        return data.data;
      } catch (error) {
        throw new Error(error);
      }
    };

    const update = async (form) => {
      try {
        const { data } = await api.put(`users/${route.params.id}`, form.value);
        $q.notify({
          message: "Usuario Actualizado",
          icon: "check",
          color: "positive",
        });
        router.push({ name: "home" });
        return data.data;
      } catch (error) {
        throw new Error(error);
      }
    };

    const handleSubmit = async () => {
      if (route.params.id) {
        try {
          await update(form);
        } catch (error) {
          $q.notify({
            message: "Error Usuario no actualizado",
            icon: "times",
            color: "negative",
          });
        }
      } else {
        post(form);
        $q.notify({
          message: "Usuario Creado",
          icon: "check",
          color: "positive",
        });
        router.push({ name: "user" });
      }
    };

    return {
      form,
      selectOptions,
      statusOptions,
      handleSubmit,
    };
  },
});
</script>

<style></style>
