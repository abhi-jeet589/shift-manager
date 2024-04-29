// HistoryComponent.js
import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { firestore } from '../firebaseConfig';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const HistoryComponent = () => {
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(firestore, 'shifts'), orderBy('clockInTime', 'desc')),
      (snapshot) => {
        const shiftsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setShifts(shiftsData);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <List style={{maxHeight: '250px',overflow: 'auto'}}>
      {shifts.map((shift) => (
        <ListItem key={shift.id}>
          <ListItemText
            primary={`Clock In: ${new Date(shift.clockInTime?.toDate()).toLocaleString()}`}
            secondary={`Clock Out: ${shift.clockOutTime ? new Date(shift.clockOutTime?.toDate()).toLocaleString() : 'Not clocked out yet'}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default HistoryComponent;
