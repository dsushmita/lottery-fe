'use client';

import { Leaderboard } from '@/views/Leaderboard/Leaderboard';
import React from 'react';


export default function LeaderboardPage() {
  return <Leaderboard limit={10} showViewAll={true} />;
}