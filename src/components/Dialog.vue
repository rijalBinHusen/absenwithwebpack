<template>
  <div
    style="width: 500px; height: 220px; margin: auto; position: fixed"
    class="
      w3-container
      w3-display-middle
      w3-border-pink
      w3-border
      w3-leftbar
      w3-rightbar
      w3-topbar
      w3-bottombar
      w3-light-gray
    "
  >
    <span @click="$emit('del', 'cancel')" class="w3-button w3-display-topright"
      >&times;</span
    >
    <div>
      <div class="w3-padding-48 w3-center">
        <span v-if="!danger">
          <h4>Apakah anda yakin akan menghapusnya</h4>

          <div class="w3-section">
            <button
              @click="$emit('del', 'yes')"
              class="w3-button w3-teal w3-margin-right"
            >
              Iya
            </button>
            <button @click="$emit('del', 'cancel')" class="w3-button w3-pink">
              Tidak
            </button>
          </div>
        </span>
        <span v-else>
          <h4>{{ danger }}</h4>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["danger"],
  name: "Dialog",
};
</script>
