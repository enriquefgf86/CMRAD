export interface ManagementState {
  tagsDefaultList: string[];
  tagsCustomList: string[];
  tagsFilteredOnSearch: string[];
}

export interface TagsBySection {
  default: string[];
  custom: string[];
}

export interface TagsWithColors {
  tag: string;
  color: string;
}

export interface TagCreated {
  isTagCreated: boolean;
  tag: string;
}
