// File: src/components/MyUploads.jsx
import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase/firebaseInit';
import {
  collection,
  query,
  where,
  getDocs,
  orderBy
} from 'firebase/firestore';
import { Download } from 'lucide-react';

const MyUploads = () => {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUploads = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const q = query(
          collection(db, 'uploads'),
          where('userId', '==', user.uid),
          orderBy('uploadedAt', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const userUploads = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        setUploads(userUploads);
      } catch (error) {
        console.error('🔥 Error fetching uploads:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUploads();
  }, []);

  if (loading) {
    return (
      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        🔄 Loading your uploads...
      </p>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mt-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        📁 Your Uploaded CSVs
      </h2>

      {uploads.length === 0 ? (
        <p className="text-gray-500 text-sm dark:text-gray-400">
          You haven't uploaded any files yet.
        </p>
      ) : (
        <ul className="space-y-4">
          {uploads.map((upload) => (
            <li
              key={upload.id}
              className="flex items-center justify-between border border-gray-200 dark:border-gray-700 rounded-lg p-4"
            >
              <div>
                <p className="font-medium text-gray-800 dark:text-white">
                  {upload.fileName}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Uploaded at:{' '}
                  {upload.uploadedAt?.toDate().toLocaleString() || 'Unknown time'}
                </p>
              </div>
              <a
                href={upload.downloadURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline flex items-center gap-1"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyUploads;
