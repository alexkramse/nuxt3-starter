<script setup>
const model = ref([
  {
    label: "Home",
    items: [{ label: "Index page", icon: "pi pi-fw pi-home", to: "/" }],
  },
]);
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <LayoutSidebarMenuItem v-if="!item.separator" :item="item" :index="i"></LayoutSidebarMenuItem>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
</template>

<style lang="scss" scoped></style>
