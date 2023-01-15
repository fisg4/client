import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RoomList from "../roomList/RoomList";
import roomService from "../services/roomService";

export default function UserRooms () {
  const [errorMessage, setErrorMessage] = useState(null)
  const [rooms, setRooms] = useState([]);
  const [totalRooms, setTotalRooms] = useState(0);

  const token = localStorage.getItem('token')

  const FIRST_PAGE = 0;
  const MAX_ROWS = 2;

  useEffect(() => {
    async function getRoomList() {
      try {
        const response = await roomService.getRooms(token, FIRST_PAGE, MAX_ROWS);
        if (response.success) {
          setRooms(response.content)
          setTotalRooms(response.totalElements)
        }
      } catch (error) {
        setErrorMessage("There are no rooms available");
      }
    }

    getRoomList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (errorMessage) {
    return <span>{errorMessage}</span>
  }

  return (
    rooms.length > 0 ?
      <div className="col-12">
        <div className="row flex-row justify-content-between">
          <span className="d-flex" style={{ width: 'fit-content' }}>Your most recents rooms</span>
          {totalRooms > MAX_ROWS && <Link className="d-flex" style={{ width: 'fit-content' }} to={'/chats'}>See all</Link>}
        </div>
        <div className="row">
          <RoomList rooms={rooms}></RoomList>
        </div>
      </div>
    :
      <span>You do not participate in any room</span>
  );

}