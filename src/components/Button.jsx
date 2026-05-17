function Button({ type = "primary", onClick }) {
  const base = "rounded-sm cursor-pointer uppercase tracking-wide";
  const primary =
    "text-white font-bold  px-2 py-1 bg-blue-500 outline-blue-500 outline-offset-2 hover:bg-blue-600";
  const accent =
    "text-orange-500 outline-offset-2 font-semibold  px-2 py-1 bg-white border-2 border-orange-500 outline-orange-500 hover:bg-orange-500 hover:text-white";
  let className = "";

  if (type === "primary") className = `${base} ${primary}`;
  if (type === "accent") className = `${base} ${accent}`;

  return (
    <button onClick={onClick} className={className}>
      Button
    </button>
  );
}

export default Button;
