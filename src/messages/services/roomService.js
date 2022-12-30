const BASE_PATH = '/api/v1/rooms';

const getRooms = async (token, page = 0, size = 10) => {
  const request = new Request(`${BASE_PATH}?page=${page}&size=${size}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    },
  });

  const response = await fetch(request);
  if (!response.ok) {
    throw Error("Response not valid. " + response.json());
  } 

  return response.json();  
}

const getRoom = async (token, roomId) => {
  const request = new Request(`${BASE_PATH}/${roomId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
  
  const response = await fetch(request);
  if (!response.ok) {
    throw Error("Response not valid. " + response.json());
  } 

  return response.json(); 
}

const createRoom = async (token, name, description, songId, participants) => {
  const request = new Request(`${BASE_PATH}/`, {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name, description, songId, participants
    })
  });

  const response = await fetch(request);
  if (!response.ok) {
    throw Error("Response not valid. " + response.json());
  } 

  return response.json(); 
}

const modifyRoom = async (token, name, description) => {
  const request = new Request(`${BASE_PATH}/`, {
    method: "PATCH",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name, description
    })
  });

  const response = await fetch(request);
  if (!response.ok) {
    throw Error("Response not valid. " + response.json());
  } 

  return response.json(); 
}

const deleteRoom = async (token, roomId) => {
  const request = new Request(`${BASE_PATH}/${roomId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    },
  });

  const response = await fetch(request);
  if (!response.ok) {
    throw Error("Response not valid. " + response.json());
  } 

  return response.json(); 
}

const getRoomMessages = async (token, roomId, page = 0, size = 10) => {
  const request = new Request(`${BASE_PATH}/${roomId}/messages?page=${page}&size=${size}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    },
  });

  const response = await fetch(request);
  if (!response.ok) {
    throw Error("Response not valid. " + response.json());
  } 

  return response.json();  
}

const createRoomMessage = async (token, roomId, text) => {
  const request = new Request(`${BASE_PATH}/${roomId}/messages`, {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text
    })
  });

  const response = await fetch(request);
  if (!response.ok) {
    throw Error("Response not valid. " + response.json());
  } 

  return response.json();  
}

module.exports = {
  getRooms,
  getRoom,
  createRoom,
  modifyRoom,
  deleteRoom,
  getRoomMessages,
  createRoomMessage
}