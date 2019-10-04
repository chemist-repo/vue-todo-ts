interface Todo {
  id: string;
  text: string;
  info: string;
  status: boolean;
}
interface ChangeStatus {
  id: string;
  status: boolean;
}
interface RootState {
  collections: Todo[]
}
