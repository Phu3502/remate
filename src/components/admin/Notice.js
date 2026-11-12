export default function Notice({ state }) {
  if (!state?.error && !state?.message) return null;
  return (
    <p className={state.error ? "ad-msg err" : "ad-msg ok"} role={state.error ? "alert" : "status"}>
      {state.error || state.message}
    </p>
  );
}
