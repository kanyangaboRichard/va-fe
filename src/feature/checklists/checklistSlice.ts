import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Checklists, CreateChecklistDto, UpdateChecklistDto } from "../../api/checklistAPI";
import { getChecklists, createChecklist, updateChecklist, deleteChecklist } from "../../api/checklistAPI";

type ChecklistState = {
  data: Checklists[];
  items: Checklists[];
  isLoading: boolean;
  error: string | null;
  search: string;
};

const initialState: ChecklistState = {
  items: [],
  isLoading: false,
  error: null,
  search: "",
  data: []
};

export const fetchChecklists = createAsyncThunk("checklists/fetchAll", async () => {
  return await getChecklists();
});

export const addChecklist = createAsyncThunk(
  "checklists/create",
  async (payload: CreateChecklistDto) => {
    return await createChecklist(payload);
  }
);

export const editChecklist = createAsyncThunk(
  "checklists/update",
  async ({ id, payload }: { id: string; payload: UpdateChecklistDto }) => {
    return await updateChecklist(id, payload);
  }
);

export const removeChecklist = createAsyncThunk("checklists/delete", async (id: string) => {
  await deleteChecklist(id);
  return id;
});

const checklistSlice = createSlice({
  name: "checklists",
  initialState,
  reducers: {
    setChecklistSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchChecklists.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchChecklists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchChecklists.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch checklists";
      })

      // create
      .addCase(addChecklist.fulfilled, (state, action) => {
        state.items = [action.payload, ...state.items];
      })

      // update
      .addCase(editChecklist.fulfilled, (state, action) => {
        state.items = state.items.map((c) => (c.id === action.payload.id ? action.payload : c));
      })

      // delete
      .addCase(removeChecklist.fulfilled, (state, action) => {
        state.items = state.items.filter((c) => c.id !== action.payload);
      });
  },
});

export const { setChecklistSearch } = checklistSlice.actions;
export default checklistSlice.reducer;