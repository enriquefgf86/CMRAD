export interface ManagementState {
  tagsDefaultList: string[];
  tagsCustomList: string[];
}



export interface TagCreated {
  isTagCreated: boolean;
  tag: string;
}
