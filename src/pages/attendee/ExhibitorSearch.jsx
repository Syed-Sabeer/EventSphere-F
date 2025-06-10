import React, { useEffect, useState } from 'react';
import { getAllExhibitors } from '../../services/exhibitor';

const ExhibitorSearch = () => {
  const [exhibitors, setExhibitors] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getAllExhibitors().then(res => setExhibitors(res.data));
  }, []);

  const filtered = exhibitors.filter(e =>
    e.companyName?.toLowerCase().includes(query.toLowerCase()) ||
    e.products?.join(',').toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h2>Exhibitor Search</h2>
      <input placeholder="Search by company or product" value={query} onChange={e => setQuery(e.target.value)} />
      <ul>
        {filtered.map(ex => (
          <li key={ex._id}>
            {ex.companyName} - {ex.products?.join(', ')}
            <div>{ex.description}</div>
            <div>Contact: {ex.contactInfo}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExhibitorSearch;
