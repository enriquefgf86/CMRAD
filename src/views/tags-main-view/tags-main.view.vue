<template>
  <div class="textarea-view-class">
    <v-row justify="center" align="center" class="textarea-view-class__row">
      <v-col cols="12" sm="6" md="4">
        <TagsTextAreaComponent class="textarea-view-class_component" />
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TagsMainView",
});
</script>
<style scoped>
.textarea-view-class__row {
  height: 100vh;
  padding: 0 2rem;
}

.textarea-view-class {
  position: relative;
  background-image: url("../../assets/testbgimg.jpg");
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
