import css from "./Notes.page.module.css";

interface EmptyStateProp {
  message: string;
}
export default function EmptyState({ message }: EmptyStateProp) {
  return <p className={css.empty}>{message}</p>;
}
