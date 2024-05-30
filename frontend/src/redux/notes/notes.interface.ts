export interface INoteResponse {
  title: string;
  content: string;
  id: number;
}

export interface ICreateNote {
  title: string;
  content: string;
}

export interface IUpdateNote extends ICreateNote {
  id: number;
}
