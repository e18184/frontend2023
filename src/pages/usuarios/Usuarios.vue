<template>
  <div>
    <h1>Lista de Usuarios</h1>
    <ul>
      <li v-for="usuario in datos" :key="usuario.id">
        {{ usuario.usuario }} - {{ usuario.cod_estado }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { api } from "boot/axios";

export default {
  name: "UsuariosList",
  setup() {
    const datos = ref([]); // Define 'datos' como una propiedad reactiva

    // Agrega un efecto que se ejecuta después de la montura del componente
    onMounted(() => {
      obtenerDatos(); // Llama a la función para cargar los datos
    });

    function obtenerDatos() {
      api
        .get("usuariocontroller")
        .then((response) => {
          console.log(response.data);
          datos.value = response.data; // Actualiza 'datos'
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return {
      datos, // Retorna 'datos' para que esté disponible en el template
    };
  },
};
</script>
