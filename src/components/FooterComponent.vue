<template>

<footer class="footer items-center p-4 bg-base-100 text-base-content mt-5 md:items-center">
  <div class="items-center">

    <p class="text-gray-800 text-xs">{{ company }} — BE 0685.595.109<br />
        Rue Robespierre 6, 4140 Sprimont (Belgium)
    </p>
  </div>

</footer>

</template>

<script>
export default {
  props: {
    company: String
  }
}
</script>
