import { useLifeContext } from "../../context";

const LifeButton = ({ value, label }: { value: number; label?: string }) => {
  const { changeLife } = useLifeContext();

  return (
    <button type="button" onClick={() => changeLife(value)}>
      {label ? label : value <= 0 ? value : `+${value}`}
    </button>
  );
};

export default LifeButton;
