import './Chip.css';
import { titleCase } from '../Table/commons';

const Chip = ({ text, disabled = false }: {text: string, disabled?: boolean}) => {
  const bgColor = () => disabled ? 'bg-neutral-300' : 'bg-green';
  const textColor = () => disabled ? 'text-neutral-500' : 'text-neutral-100'
  return (<div className={`flex justify-center items-center rounded-36 p-8 border-none ${bgColor()}`}>
    <span
      className={`${textColor()} text-caption`}>{titleCase(text)}
    </span>
  </div>)
};

export default Chip;
