
import  axios  from "./Axios";

export type ChecklistStatus = "ACTIVE" | "DRAFT" | "ARCHIVED";

export interface Checklists {
  id: string;
  name: string;
  description?: string | null;
  status: ChecklistStatus;
  createdAt?: string;
  updatedAt?: string;
  // optional field to hold count of domains, not from backend but useful for frontend
  domainCount?: number;
}

export interface CreateChecklistDto {
  name: string;
  description?: string | null;
  status?: ChecklistStatus;
}

export interface UpdateChecklistDto {
  name?: string;
  description?: string | null;
  status?: ChecklistStatus;
}

export async function getChecklists(): Promise<Checklists[]> {
  const res = await axios.get("/checklists");
  return res.data;
}

export async function createChecklist(payload: CreateChecklistDto): Promise<Checklists> {
  const res = await axios.post("/checklists", payload);
  return res.data;
}

export async function updateChecklist(id: string, payload: UpdateChecklistDto): Promise<Checklists> {
  const res = await axios.patch(`/checklists/${id}`, payload);
  return res.data;
}

export async function deleteChecklist(id: string): Promise<{ message: string }> {
  const res = await axios.delete(`/checklists/${id}`);
  return res.data;
}