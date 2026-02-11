import { Link } from 'react-router-dom';
import classNames from 'classnames';

type Person = {
  name: string;
  sex: string;
  slug: string;
};

type Props = {
  person?: Person;
  fallbackName?: string;
};

export const PersonLink: React.FC<Props> = ({ person, fallbackName }) => {
  if (!person) {
    return <span>{fallbackName}</span>;
  }

  return (
    <Link
      to={`/people/${person.slug}`}
      className={classNames({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
};
