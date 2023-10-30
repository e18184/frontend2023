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
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "MainLayout",

  setup() {
    const leftDrawerOpen = ref(false);
    const menus = ref([]);
    const selectedMenu = ref(null);

    const router = useRouter();

    // Simular la obtención de menús desde el backend
    // Esto debe reemplazarse con llamadas reales al servidor
    const fetchMenus = () => {
      // Aquí debes hacer una llamada al servidor para obtener los menús
      // y establecer el valor de la variable "menus"
      // Ejemplo:
      // menus.value = [{ codm: 1, nombre: "Menú 1", icon: "menu" }, ...];
    };

    watch(
      () => router.currentRoute.value,
      (to, from) => {
        // Si la ruta cambia, restablecer el menú seleccionado
        selectedMenu.value = null;
      }
    );

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };

    const selectMenu = (menu) => {
      selectedMenu.value = menu;
      // Aquí puedes redirigir a la página de procesos asociados al menú seleccionado
      // Puedes utilizar "menu.codm" para obtener el ID del menú seleccionado
      // y construir la URL adecuada.
      // Ejemplo: router.push({ name: "procesos", params: { menuId: menu.codm } });
    };

    // Obtener la lista de menús al cargar el componente
    fetchMenus();

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
