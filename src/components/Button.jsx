function Button({ type = "primary", onClick, children, disabled = false }) {
  const base =
    "rounded-sm cursor-pointer uppercase tracking-wide transition-colors duration-200";

  const variant = {
    primary:
      "text-white font-bold  px-2 py-1 bg-blue-500 outline-blue-500 outline-offset-2 hover:bg-blue-600",
    accent:
      "text-orange-500 outline-offset-2 font-semibold  px-2 py-1 bg-white border-2 border-orange-500 outline-orange-500 hover:bg-orange-500 hover:text-white",
  };
  const variantClass = variant[type] || variant.primary;
  const disabledClass = disabled ? "opacity-50 cursor-disabled" : "";

  return (
    <button
      onClick={!disabled ? onClick : undefined}
      className={`${base} ${variantClass} ${disabledClass}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
