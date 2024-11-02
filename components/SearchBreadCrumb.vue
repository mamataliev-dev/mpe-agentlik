<template>
  <nav aria-label="breadcrumb" class="breadcrumb">
    <ol class="breadcrumb-list">
      <li
        v-for="(crumb, index) in breadcrumbs"
        :key="index"
        class="breadcrumb-list__item"
      >
        <template v-if="index !== 1">
          <a
            v-if="index < breadcrumbs.length - 1"
            :href="crumb.to"
            :class="{ 'first-link': index === 0 }"
          >
            {{ crumb.label }}
          </a>
          <span v-else>
            {{ crumb.label }}
          </span>
        </template>
        <span v-else class="non-clickable">
          {{ crumb.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
const route = useRoute();

const breadcrumbs = computed(() => {
  const pathSegments = route.path.split("/").filter(Boolean);

  const links = pathSegments.map((segment, index) => {
    const label = segment
      .replace(/-/g, " ")
      .replace(/^\w/, (c) => c.toUpperCase());
    const to = "/" + pathSegments.slice(0, index + 1).join("/");

    return { label, to };
  });

  return links;
});
</script>

<style scoped lang="scss">
.breadcrumb {
  &-list {
    list-style: none;
    display: flex;
    align-items: center;
    padding: 0;
  }

  &-list__item {
    display: flex;
    align-items: center;

    a,
    .non-clickable {
      color: #9a999b;
      font-family: "Golos Text", sans-serif;
      text-decoration: none;
      margin: 0px 16px;
      transition: all 0.3s ease;

      &:hover {
        color: #11be86;
      }
    }

    .non-clickable {
      cursor: default;
      color: #9a999b;
    }

    a.first-link {
      margin-left: 0px;
      margin-right: 16px;
    }

    span {
      font-family: "Golos Text", sans-serif;
      color: #1d2825;
      margin: 0px 16px;
    }
  }
}
</style>
