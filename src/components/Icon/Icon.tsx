import './Icon.css';

const Icon = ({ iconName, className }: {iconName: string, className: string}) => (
  <span className={className}>
    {iconName}
  </span>
);

export default Icon;
