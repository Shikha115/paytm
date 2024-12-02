export function InputBox({
  label,
  placeholder,
  onChange,
  value,
  type,
  disabled,
}) {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">{label}</div>
      <input
        type={type || "text"}
        value={value}
        onChange={onChange}
        placeholder={placeholder?placeholder:""}
        className="w-full px-2 py-1 border rounded border-slate-200"
        autoComplete="on"
        disabled={disabled ? disabled : false}
      />
    </div>
  );
}
