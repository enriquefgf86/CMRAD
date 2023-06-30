<template>
  <div class="button-component-class">
    <v-btn elevation="20" @click="createTag(newTag)" data-cy="trigger-button">
      {{ `Create #${newTag} tag?` }}
    </v-btn>
  </div>
</template>
<script lang="ts">
import { mapActions, mapGetters } from "vuex";
import { defineComponent } from "vue";
import { TagCreated } from "../../interfaces/interfaces";

export default defineComponent({
  name: "TagsCreatorTriggererComponent",
  props: {
    newTag: {
      type: String,
      required: true,
    },
  },

  methods: {
    ...mapActions(["createNewTag"]),
    createTag(tag: string): void {
      const tagCreatedObj: TagCreated = {
        isTagCreated: true,
        tag: tag,
      };
      this.createNewTag(tag);
      this.$emit("tagCreated", tagCreatedObj);
    },
  },
});
</script>
<style>
.button-component-class {
  margin-bottom: 2rem;
  display: flex;
}
</style>
