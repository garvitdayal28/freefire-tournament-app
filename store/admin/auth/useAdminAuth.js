import { collection, addDoc, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../../config/firebaseConfig';

export const useAdminAuth = () => {
  const createMatch = async ({
    type,
    totalSpots,
    spotsLeft,
    map,
    version,
    prizePool,
    prizePerKill,
    entryFee,
    namesOfPlayerJoined,
    startTime,
    matchId,
    roomId,
    status
  }) => {
    try {
      const matchesRef = collection(db, 'matches');
      const newMatch = await addDoc(matchesRef, {
        type,
        totalSpots,
        spotsLeft,
        map,
        version,
        prizePool,
        prizePerKill,
        entryFee,
        namesOfPlayerJoined: namesOfPlayerJoined || [],
        startTime,
        matchId,
        roomId,
        status,
        createdAt: new Date().toISOString()
      });
      return { success: true, matchId: newMatch.id };
    } catch (error) {
      console.error('Error creating match:', error);
      return { success: false, error: error.message };
    }
  };

  const getMatches = async () => {
    try {
      const matchesRef = collection(db, 'matches');
      const matchesSnapshot = await getDocs(matchesRef);
      const matches = [];
      matchesSnapshot.forEach((doc) => {
        matches.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, matches };
    } catch (error) {
      console.error('Error fetching matches:', error);
      return { success: false, error: error.message };
    }
  };

  const updateMatch = async (matchId, updateData) => {
    try {
      const matchRef = doc(db, 'matches', matchId);
      await updateDoc(matchRef, updateData);
      return { success: true };
    } catch (error) {
      console.error('Error updating match:', error);
      return { success: false, error: error.message };
    }
  };

  const getMatchById = async (matchId) => {
    try {
      const matchesRef = collection(db, 'matches');
      const q = query(matchesRef, where('matchId', '==', matchId));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return { success: false, error: 'Match not found' };
      }

      const matchData = querySnapshot.docs[0].data();
      return { success: true, match: { id: querySnapshot.docs[0].id, ...matchData } };
    } catch (error) {
      console.error('Error fetching match:', error);
      return { success: false, error: error.message };
    }
  };

  return {
    createMatch,
    getMatches,
    updateMatch,
    getMatchById
  };
};