import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types/Person';

interface Props {
  name: string | null;
  foundPerson?: Person;
}

export const PersonLink: React.FC<Props> = ({ name, foundPerson }) => {
  if (!name) {
    return <>-</>;
  }

  if (foundPerson) {
    return (
      <Link
        to={`/people/${foundPerson.slug}`}
        className={classNames({
          'has-text-danger': foundPerson.sex === 'f',
        })}
      >
        {name}
      </Link>
    );
  }

  return <span>{name}</span>;
};
