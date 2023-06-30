<template>
  <div class="textarea-component-class">
    <div>
      <v-text-field
        data-cy="text-field"
        variant="underlined"
        v-model="tagsToSearchOrCreateString"
        :label="textAreaLabel"
        @input="onSearchCreateTags()"
      ></v-text-field>
    </div>

    <div>
      <TagsCreatorTriggererComponent
        @tagCreated="onTagCreated"
        :newTag="tagsToSearchOrCreateString"
        v-if="isAvailableToCreateTag"
        data-cy="button"
      />
    </div>
    <div>
      <v-tooltip
        data-cy="tooltip"
        class="textarea-component-class__tooltip"
        v-model="canShowTooltip"
        v-if="newTagCreated"
        location="bottom"
        >{{ `A new #${newTagCreated} tag was created` }}
      </v-tooltip>
    </div>

    <div>
      <v-list
        data-cy="tags-list-suggestion"
        lines="one"
        class="textarea-component-class__list"
        v-if="tagsToSearchOrCreateString"
      >
        <v-list-item
          @click="onSelectTag(suggestion.tag)"
          v-for="suggestion in suggestionOnSearchInput"
          :key="suggestion.tag"
          :style="{ color: suggestion.color }"
          >{{ suggestion.tag }}</v-list-item
        >
      </v-list>
    </div>
  </div>
</template>

<script lang="ts">
import { TagCreated, TagsWithColors } from "@/interfaces/interfaces";
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
  name: "TagsTextAreaComponent",

  data: () => {
    return {
      canShowTooltip: false as boolean,
      allColorsRandom: [] as string[],
      isATagSelected: false as boolean,
      isTagCreatorEnabled: false as boolean,
      newTagCreated: "" as string,
      suggestionOnSearchInput: [] as TagsWithColors[],
      tagsToSearchOrCreateString: "" as string,
      textAreaLabel: "Search or Create Your Tag Here" as string,
    };
  },

  methods: {
    ...mapActions(["getFilteredTags"]),

    generateRandomColor(): string {
      const colorCharactersConformer = "0123456789ABCDEF";
      const color = Array.from(
        { length: 6 },
        () => colorCharactersConformer[Math.floor(Math.random() * 16)]
      ).join("");
      return `#${color}`;
    },

    getAvailableTagsWithColors(): TagsWithColors[] {
      return this.getAvailableTags.map((tag: string, index: number) => {
        return { tag: `#${tag}`, color: this.getColorsTagGenerator()[index] };
      });
    },

    getColorsTagGenerator(): string[] {
      const allColors: string[] = [];
      const colorsAssigned = new Set();
      const alltags = this.getAvailableTags;

      if (alltags) {
        for (let index = 0; index < alltags.length; index++) {
          let colorGenerated = this.generateRandomColor();
          colorsAssigned.add(colorGenerated);

          if (colorsAssigned.has(colorGenerated)) {
            colorGenerated = this.generateRandomColor();
          }
          allColors.push(colorGenerated);
        }
      }

      return allColors;
    },

    onSearchCreateTags(): void {
      this.isATagSelected = false;

      this.suggestionOnSearchInput = this.getAvailableTagsWithColors().filter(
        (item: TagsWithColors) =>
          item.tag
            .toLowerCase()
            .includes(this.tagsToSearchOrCreateString.toLowerCase())
      );
    },

    onSelectTag(selectedTag: string): void {
      this.tagsToSearchOrCreateString = selectedTag;
      this.suggestionOnSearchInput = [];
      this.isATagSelected = true;
    },

    onTagCreated(emittedTagObject: TagCreated): void {
      !emittedTagObject.isTagCreated
        ? null
        : emittedTagObject.tag
        ? ((this.isTagCreatorEnabled = false),
          (this.newTagCreated = emittedTagObject.tag),
          (this.tagsToSearchOrCreateString = ""),
          this.showTagCreatedTootltip())
        : null;
    },

    showTagCreatedTootltip(): void {
      this.canShowTooltip = true;

      setTimeout(() => {
        this.canShowTooltip = false;
      }, 1500);
    },
  },

  computed: {
    ...mapGetters(["getAvailableTags"]),

    availabletags(): string[] {
      return this.getAvailableTags;
    },

    isAvailableToCreateTag(): boolean {
      return (
        this.tagsToSearchOrCreateString !== "" &&
        this.suggestionOnSearchInput.length <= 0 &&
        this.isATagSelected === false
      );
    },
  },

  created() {
    this.availabletags;
    this.getColorsTagGenerator();
    this.getAvailableTagsWithColors();
  },
});
</script>
<style scoped>
.textarea-component-class {
  background-color: rgba(255, 255, 255, 0.75);
  padding: 0 2rem;
}
.textarea-component-class__list {
  background-color: transparent;
}
.textarea-component-class__tooltip {
  left: 50%;
  top: 70%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-self: center;
}
</style>
