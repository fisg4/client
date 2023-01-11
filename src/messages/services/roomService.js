const BASE_PATH = '/api/v1/rooms';

const roomService = {
  getRooms: async function (token, page = 0, size = 10) {
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
  },
  getRoom: async function (token, roomId) {
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
  },
  createRoom: async function (token, name, description, songId, participants) {
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
  },
  modifyRoom: async function (token, name, description) {
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
  },
  deleteRoom: async function (token, roomId) {
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
  },
  getRoomMessages: async function (token, roomId, page = 0, size = 10) {
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
  },
  createRoomMessage: async function (token, roomId, text) {
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
}

export default roomService