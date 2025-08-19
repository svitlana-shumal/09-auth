import error from "./error.module.css";

export default function Error() {
  return <p>Could not fetch note details. {error.message}</p>;
}
