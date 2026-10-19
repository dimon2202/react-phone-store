import { useNavigate } from 'react-router-dom';
import s from './Back.module.scss';

type Props = {
  to: string;
};

export const Back = ({ to }: Props) => {
  const navigate = useNavigate();

  return (
    <button className={s.back} onClick={() => navigate(to)}>
      <img
        className={s.back__chevron}
        src="./img/icons/chevron-right.svg"
        alt=""
      />
      <div className={s.back__title}>Back</div>
    </button>
  );
};
