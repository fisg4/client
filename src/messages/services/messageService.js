const BASE_PATH = '/api/v1/messages';

const messageService = {
  modifyMessage: async function (token, messageId, text) {
    const request = new Request(`${BASE_PATH}/${messageId}`, {
        method: "PATCH",
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
  },
  reportMessage: async function(token, messageId, reason) {
    const request = new Request(`${BASE_PATH}/${messageId}/report`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        reason
      })
    });
    
    const response = await fetch(request);
    if (!response.ok) {
      throw Error("Response not valid. " + response.json());
    } 
  
    return response.json(); 
  },
  translateMessage: async function(token, messageId, reason) {
    const request = new Request(`${BASE_PATH}/${messageId}/translate`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        reason
      })
    });
  
    const response = await fetch(request);
    if (!response.ok) {
      throw Error("Response not valid. " + response.json());
    } 
  
    return response.json(); 
  }
}

export default messageService