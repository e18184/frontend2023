<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Hola mundo taller 1 </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item
          clickable
          v-for="menu in menus"
          :key="menu.codm"
          @click="selectMenu(menu)"
        >
          <q-item-section>
            <q-item-label>{{ menu.nombre }}</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-icon :name="menu.icon" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-page>
        <router-view :menus="selectedMenu ? selectedMenu.submenus : []" />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { api } from "boot/axios";
export default defineComponent({
  name: "MainLayout",

  setup() {
    const leftDrawerOpen = ref(false);
    const menus = ref([]);
    const selectedMenu = ref(null);

    const router = useRouter();

    const fetchMenus = async (roleId) => {
      // Realiza una llamada al servidor para obtener los menús y submenús según el rol seleccionado
      try {
        console.log(`rolescontroller/roles/${roleId}`);
        //http://127.0.0.1:8080/rolescontroller/roles/4
        const response = await api.get(`rolescontroller/roles/${roleId}`); // Reemplaza fetchMenusFromServer con tu lógica real
        menus.value = response.data; // Asumiendo que la respuesta contiene una lista de menús
      } catch (error) {
        console.error("Error al obtener los menús:", error);
      }
    };

    watch(
      () => router.currentRoute.value,
      (to, from) => {
        selectedMenu.value = null; // Restablecer el menú seleccionado al cambiar la ruta
      }
    );

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };

    const selectMenu = (menu) => {
      selectedMenu.value = menu;
      // Puedes redirigir a la página de procesos asociados al menú seleccionado aquí
      // Utiliza "menu.codm" para obtener el ID del menú seleccionado y construir la URL adecuada
      // Ejemplo: router.push({ name: "procesos", params: { menuId: menu.codm } });
    };

    // Carga los menús al cargar el componente
    onMounted(() => {
      // Reemplaza 'roleId' con el ID del rol seleccionado o la lógica que necesites
      fetchMenus(4);
    });

    return {
      leftDrawerOpen,
      menus,
      selectedMenu,
      toggleLeftDrawer,
      selectMenu,
    };
  },
});
</script>
