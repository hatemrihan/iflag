'use client';

import { useEffect, useState } from 'react';
import { StatCard } from "./StatCard";
import { client, databases, DATABASE_ID, APPOINTMENT_COLLECTION_ID } from "@/components/lib/appwrite.config";
import { ID, Query } from "node-appwrite";

interface Counts {
  scheduledCount: number;
  pendingCount: number;
  cancelledCount: number;
}

interface AppointmentDocument {
  status: 'scheduled' | 'pending' | 'cancelled'; // Define the possible statuses
}

const ClientStats = ({ initialCounts }: { initialCounts: Counts }) => {
  const [counts, setCounts] = useState<Counts>(initialCounts);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCounts = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching
      try {
        const response = await databases.listDocuments<AppointmentDocument>(
          DATABASE_ID,
          APPOINTMENT_COLLECTION_ID,
          [Query.orderDesc('$createdAt')]
        );

        const newCounts = response.documents.reduce((acc: Counts, doc: AppointmentDocument) => {
          switch (doc.status) {
            case 'scheduled': acc.scheduledCount++; break;
            case 'pending': acc.pendingCount++; break;
            case 'cancelled': acc.cancelledCount++; break;
          }
          return acc;
        }, { scheduledCount: 0, pendingCount: 0, cancelledCount: 0 });

        setCounts(newCounts);
      } catch (error) {
        console.error('Error fetching counts:', error);
        setError('Failed to fetch appointment counts.'); // Set error message
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };


   

    fetchCounts(); // Initial fetch


  }, []);

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>{error}</div>; // Error state
  }

  return (
    <div className="admin-stat">
      <StatCard type="appointments" count={counts.scheduledCount} label="Scheduled" icon="/assets/icons/appointments.svg" />
      <StatCard type="pending" count={counts.pendingCount} label="Pending" icon="/assets/icons/pending.svg" />
      <StatCard type="cancelled" count={counts.cancelledCount} label="Cancelled" icon="/assets/icons/cancelled.svg" />
    </div>
  );
};

export default ClientStats;
