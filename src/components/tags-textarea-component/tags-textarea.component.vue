<template>
  <div class="textarea-component-class">
    <div>
      <v-textarea
        class="textarea-component-class__textarea"
        variant="underlined"
        v-model="inputTextContent"
        :label="inputLabelContent"
        @input="entryDataHandler"
        @keydown.enter="onSubmitInputText"
      ></v-textarea>
    </div>

    <div>
      <v-list
        lines="one"
        class="textarea-component-class__list"
        v-if="inputTextContent"
      >
        <v-list-item
          @click="onSelectTag(suggestion)"
          v-for="suggestion in suggestionOnSearchInput"
          :key="suggestion"
          :style="{ color: 'blue' }"
          >{{ suggestion }}</v-list-item
        >
      </v-list>
    </div>
  </div>
  <div
    class="textarea-component-class__highlightedText"
    v-if="isTagTextReleased"
  >
    <span
      v-for="(word, index) in arrayOfTags"
      :key="index"
      :class="{ hashtag: isHashtag(word) }"
      v-html="renderColoredWords(word)"
    ></span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
  name: "TagsTextAreaComponent",

  data: () => {
    return {
      isTagTextReleased: false as boolean,
      arrayOfTags: [] as string[],
      suggestionOnSearchInput: [] as string[],
      inputTextContent: "" as string,
      inputLabelContent: "Search or Create Your Tag Here" as string,
      originalText: "" as string,
    };
  },

  methods: {
    ...mapActions(["createNewTag"]),

    entryDataHandler(): void {
      const tag = this.getLastTag();

      if (this._isTagExpression) {
        this.onSearchCreateTags(tag);
      } else {
        this.suggestionOnSearchInput = [];
      }
    },

    onSubmitInputText(event: KeyboardEvent): void {
      const tag = this.getLastTag();

      if (event.key === "Enter") {
        this.originalText = this.inputTextContent.trim();
        this.arrayOfTags = this.originalText
          .split(/\s+/)
          .map((word) => word.trim());
        this.isTagTextReleased = true;
        this.inputTextContent = "";

        if (tag && this.suggestionOnSearchInput.length === 0) {
          this.createNewTag(tag);
        }
      }
    },

    renderColoredWords(word: string) {
      if (this.isHashtag(word)) {
        return `<span class="hashtag">${word}</span>`;
      }
      return word;
    },

    getLastTag(): string {
      const lastWord = this.inputTextContent.trim().split(" ").pop() ?? "";
      return lastWord.slice(1);
    },

    isHashtag(wordTyped: string): boolean {
      return wordTyped.startsWith("#");
    },

    onSearchCreateTags(tag: string): void {
      this.suggestionOnSearchInput = this.getAvailableTags
        .filter((item: string) =>
          item.toLowerCase().includes(tag.toLowerCase())
        )
        .map((tag: string) => {
          return `#${tag}`;
        });
    },

    onSelectTag(selectedTag: string): void {
      const deconstructuredString = this.inputTextContent.trim().split(" ");

      deconstructuredString[deconstructuredString.length - 1] = selectedTag;

      this.inputTextContent = deconstructuredString.join(" ");

      this.suggestionOnSearchInput = [];
    },
  },

  computed: {
    ...mapGetters(["getAvailableTags"]),

    _isTagExpression(): boolean {
      const lastWord = this.inputTextContent.trim().split(" ").pop();
      return lastWord?.startsWith("#") ?? false;
    },

    availabletags(): string[] {
      return this.getAvailableTags;
    },
  },

  created() {
    this.availabletags;
  },
});
</script>
<style scoped>
.textarea-component-class__list {
  background-color: transparent;
}

.hashtag-component {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.textarea-component-class {
  background-color: rgba(255, 255, 255, 0.75);
  padding: 0 2rem;
  margin-bottom: 1rem;
}

.textarea-component-class__textarea {
  min-height: 100px;
  padding: 5px;
  font-size: 16px;
}

.textarea-component-class__highlightedText {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
}

.hashtag {
  color: blue;
  cursor: pointer;
}
</style>
