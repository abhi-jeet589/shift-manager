// ShiftComponent.js
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { firestore } from "../firebaseConfig";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";

const ShiftComponent = ({ userId }) => {
  const [clockedIn, setClockedIn] = useState(false);
  const [shiftDocId, setShiftDocId] = useState(null);

  useEffect(() => {
    // Check if shiftDocId exists in localStorage
    const storedShiftDocId = localStorage.getItem("shiftDocId");
    if (storedShiftDocId) {
      setShiftDocId(storedShiftDocId);
      setClockedIn(true);
    }
  }, []);

  const handleClockIn = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;

      // Retrieve street address using Nominatim API
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch address");
      }

      const data = await response.json();

      if (!data.display_name) {
        throw new Error("No address found");
      }

      const streetAddress = data.display_name;

      // Store clock event in Firestore
      const docRef = await addDoc(collection(firestore, "shifts"), {
        userId,
        location: streetAddress,
        clockInTime: new Date(),
        clockOutTime: null,
      });

      console.log("Document written with ID: ", docRef.id);
      localStorage.setItem("shiftDocId", docRef.id); // Store shiftDocId in localStorage
      setClockedIn(true);
      setShiftDocId(docRef.id);
    } catch (error) {
      console.error("Error getting address:", error);
    }


  };

  const handleClockOut = async () => {
    const clockOutTime = new Date();
    await updateDoc(doc(firestore, "shifts", shiftDocId), {
      clockOutTime: clockOutTime,
    });
    localStorage.removeItem("shiftDocId"); // Remove shiftDocId from localStorage on clock out
    setClockedIn(false);
    setShiftDocId(null);
  };

  return (
    <div>
      {clockedIn ? (
        <Button onClick={handleClockOut}>Clock Out</Button>
      ) : (
        <Button onClick={handleClockIn}>Clock In</Button>
      )}
    </div>
  );
};

export default ShiftComponent;
