import React, { useEffect, useState } from 'react';
import { getMyExhibitorProfile, registerExhibitor, updateMyExhibitorProfile } from '../../services/exhibitor';

const ExhibitorProfile = () => {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ companyName: '', products: '', description: '', contactInfo: '' });
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    getMyExhibitorProfile().then(res => {
      if (res.data) {
        setProfile(res.data);
        setForm({
          companyName: res.data.companyName || '',
          products: (res.data.products || []).join(', '),
          description: res.data.description || '',
          contactInfo: res.data.contactInfo || ''
        });
      }
    });
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      if (profile) {
        await updateMyExhibitorProfile({ ...form, products: form.products.split(',').map(p => p.trim()) });
        setSuccess('Profile updated!');
      } else {
        await registerExhibitor({ ...form, products: form.products.split(',').map(p => p.trim()) });
        setSuccess('Profile created!');
      }
      setEditing(false);
    } catch {
      setError('Failed to save profile');
    }
  };

  return (
    <div>
      <h2>Exhibitor Profile</h2>
      {editing ? (
        <form onSubmit={handleSubmit}>
          <input name="companyName" placeholder="Company Name" value={form.companyName} onChange={handleChange} required />
          <input name="products" placeholder="Products (comma separated)" value={form.products} onChange={handleChange} />
          <input name="contactInfo" placeholder="Contact Info" value={form.contactInfo} onChange={handleChange} />
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
          <button type="submit">Save</button>
        </form>
      ) : (
        <div>
          <div>Company: {profile?.companyName}</div>
          <div>Products: {(profile?.products || []).join(', ')}</div>
          <div>Contact: {profile?.contactInfo}</div>
          <div>Description: {profile?.description}</div>
          <button onClick={() => setEditing(true)}>{profile ? 'Edit' : 'Create'} Profile</button>
        </div>
      )}
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
    </div>
  );
};

export default ExhibitorProfile; 