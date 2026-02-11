import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';

type Person = {
  name: string;
  sex: string;
  born: number;
  died: number;
  motherName: string | null;
  fatherName: string | null;
  slug: string;
};

export const PeoplePage = () => {
  const { slug } = useParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    fetch('api/people.json')
      .then(response => {
        if (!response.ok) {
          throw new Error();
        }

        return response.json();
      })
      .then(data => setPeople(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {loading && <Loader />}

      {!loading && error && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {!loading && !error && people.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {!loading && !error && people.length > 0 && (
        <PeopleTable people={people} selectedSlug={slug} />
      )}
    </>
  );
};
