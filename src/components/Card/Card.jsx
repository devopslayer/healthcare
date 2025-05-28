import "./Card.css";

function Card({ children, className = "", ...rest }) {
  return (
    <div
      className={`card ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Card;
