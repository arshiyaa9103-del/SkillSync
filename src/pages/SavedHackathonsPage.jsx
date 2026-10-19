import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import HackathonCard from '../components/cards/HackathonCard';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';
import { Bookmark, Trophy } from 'lucide-react';

const SavedHackathonsPage = () => {
  const { hackathons, savedHackathons } = useApp();
  const navigate = useNavigate();

  const savedList = hackathons.filter((h) => savedHackathons.includes(h.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-bold mb-2">
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved Catalog</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Saved Hackathons
          </h1>
          <p className="text-sm text-[#475569] mt-1">
            Challenges you have bookmarked for future team creation and participation.
          </p>
        </div>

        <Link to="/hackathons">
          <Button variant="outline" size="md" icon={Trophy}>
            Explore All Hackathons
          </Button>
        </Link>
      </div>

      {/* Grid or Empty */}
      {savedList.length === 0 ? (
        <EmptyState
          icon={Bookmark}
          title="No saved hackathons yet"
          description="Click the bookmark icon on any hackathon card to save it for quick access later."
          actionText="Browse Hackathons"
          onAction={() => navigate('/hackathons')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedList.map((h) => (
            <HackathonCard key={h.id} hackathon={h} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedHackathonsPage;
