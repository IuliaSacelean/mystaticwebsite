// Save event
async function saveEvent(evt){
    await db.collection("events").add(evt);
    return evt;
  }
  
  // Get events
  async function getEvents(){
    const snapshot = await db.collection("events").get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
  
  // Update event
  async function updateEvent(id, patch){
    await db.collection("events").doc(id).update(patch);
  }
  