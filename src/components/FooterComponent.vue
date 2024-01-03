<template>

<footer class="footer items-center p-4 bg-base-100 text-base-content mt-5 md:items-center">
  <div class="items-center">

    <p class="">{{ company }} — BE 0685.595.109<br />
        Rue Robespierre 6, 4140 Sprimont (Belgium) | <a href="tel:+32 494 766 396" class="link link-primary">+32 494 766 396</a>
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
