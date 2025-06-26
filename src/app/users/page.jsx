"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function UsersPage() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For local development, fetch from backend running on port 5000
    // Change this to an environment variable or relative path in production
    fetch("http://localhost:5000/api/profiles")
      .then((res) => res.json())
      .then((data) => {
        setProfiles(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-center">Loading users...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Browse Users</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {profiles.map((profile) => (
          <Link key={profile.userId} href={`/profile/${profile.userId}`}>
            <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer p-4 flex flex-col items-center">
              <img
                src={profile.avatar || "/images/default-avatar.png"}
                alt={profile.nickname}
                className="w-24 h-24 object-cover rounded-full border mb-3"
              />
              <h2 className="text-lg font-semibold mb-1">{profile.nickname}{profile.age ? `, ${profile.age}` : ""}</h2>
              <div className="text-sm text-gray-500 mb-2">{profile.country}{profile.state ? `, ${profile.state}` : ""}</div>
              <div className="flex flex-wrap gap-1 justify-center">
                {(profile.interests || []).slice(0, 3).map((interest, idx) => (
                  <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">{interest}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
      {profiles.length === 0 && (
        <div className="text-center text-gray-500 mt-8">No users found.</div>
      )}
    </div>
  );
} 