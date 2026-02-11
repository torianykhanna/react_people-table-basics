import { PersonLink } from '../PersonLink/PersonLink';

type Person = {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string | null;
  motherName: string | null;
  slug: string;
};

type Props = {
  people: Person[];
  selectedSlug?: string;
};

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  const findPerson = (name: string | null) => people.find(p => p.name === name);

  return (
    <div className="box table-container">
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Sex</th>
            <th>Born</th>
            <th>Died</th>
            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>

        <tbody>
          {people.map(person => (
            <tr
              key={person.slug}
              data-cy="person"
              className={
                person.slug === selectedSlug ? 'has-background-warning' : ''
              }
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {person.motherName ? (
                  <PersonLink
                    person={findPerson(person.motherName)!}
                    fallbackName={person.motherName}
                  />
                ) : (
                  '-'
                )}
              </td>

              <td>
                {person.fatherName ? (
                  <PersonLink
                    person={findPerson(person.fatherName)!}
                    fallbackName={person.fatherName}
                  />
                ) : (
                  '-'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
