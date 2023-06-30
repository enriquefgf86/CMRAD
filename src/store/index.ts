import { ManagementState, TagsBySection } from "@/interfaces/interfaces";
import { createStore } from "vuex";

export default createStore({
  state: {
    tagsDefaultList: [
      "liver",
      "pain",
      "right",
      "left",
      "pancreas",
      "kidney",
      "brain",
      "severe_pain",
      "tumour",
      "cancer",
      "MRI",
      "CT",
      "male",
      "female",
      "bone",
      "shoulder",
      "hip",
      "XRAY",
      "knee",
      "spine",
      "head",
      "abdomen",
      "contrast",
      "fragment",
      "detached",
      "injury",
      "torn",
      "rotator",
      "cuff",
      "abdominal",
    ],
    tagsCustomList: [],
    tagsFilteredOnSearch: [],
  } as ManagementState,

  getters: {
    getAvailableTagsBySection(state: ManagementState): TagsBySection {
      const tagsSectioned: TagsBySection = {
        custom: state.tagsCustomList,
        default: state.tagsDefaultList,
      };

      return tagsSectioned;
    },

    getAvailableTags(state: ManagementState): string[] {
      const allTags: string[] = state.tagsCustomList.concat(
        state.tagsDefaultList
      );

      return allTags;
    },
  },

  mutations: {
    commitNewTag(state: ManagementState, tag: string): void {
      state.tagsCustomList.push(tag);
    },
  },

  actions: {
    createNewTag({ commit }, tag: string): void {
      tag ? commit("commitNewTag", tag) : null;
    },
  },
  modules: {},
});
