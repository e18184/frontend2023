const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "hola", component: () => import("pages/hola/HolaMundo.vue") },
      {
        path: "usuarios",
        name: "Usuarios",
        component: () => import("pages/usuarios/Usuarios.vue"),
      },
      // manera la clase users
      {
        path: "user",
        name: "User",
        component: () => import("pages/user/IndexPage.vue"),
      },
      {
        path: "form-user/:id?",
        name: "FormUser",
        component: () => import("pages/user/FormUser.vue"),
      },
      {
        path: "form-filter",
        name: "formFilter",
        component: () => import("pages/user/FilterRow.vue"),
      },
      // manejar la clase rolesformFilter
      //  menusformFilter
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
