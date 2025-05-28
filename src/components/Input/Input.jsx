function Input({ type = "text", placeholder = "", className = "", ...rest }) {
  return (
    <input
      type={type}
      id={`input-${type}-${Math.random().toString(36).substr(2, 9)}`}
      name={type}
      placeholder={placeholder}
      className={className}
      {...rest}
    />
  );
}

export default Input;
