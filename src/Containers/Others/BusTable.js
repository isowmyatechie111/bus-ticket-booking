import { useEffect, useState } from "react";
import { Table, Form, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Confirmation from "./Confirmation";
import ShowTickets from "./ShowTickets";
import { fetchBusInfo, resetForm } from "../../Redux/actions/bookingAction";

function BusTable() {
  const busData = useSelector((state) => state.freshData); //for loading data
  const busInfo = useSelector((state) => state.busInfo);

  const [show, setShow] = useState(false);
  const [busId, setBusId] = useState("");
  const [confirmationId, setConfirmationId] = useState(""); //TODO
  const [display, setDisplay] = useState(false);
  const selector = useSelector((state) => state.resetForm);
  const [showTable, setShowTable] = useState(true);

  const displayList = useSelector((state) => state.displayList); //for loading data
  const dispatch = useDispatch();

  const handleChange = (busId) => {
    dispatch(resetForm(true)); //for resetting form
    dispatch(fetchBusInfo());
    setBusId(busId);
    setDisplay(true); //for modal

    console.log(display);
  };

  useEffect(() => {
    dispatch(fetchBusInfo());
  }, []);

  useEffect(() => {
    setShowTable(selector);
  }, [selector]);
  const styleFn = (busId) => {
    const currentBusInfo = busInfo.filter((item) => item.busId === busId);

    if (currentBusInfo.length > 0) {
      console.log(currentBusInfo[0].isSeatsAvailable, "SEATSSSSSS");

      return currentBusInfo[0].isSeatsAvailable;
    }

    return true;
  };

  const showConfirmationModal = (id) => {
    //TODO remove loading screen

    setConfirmationId(id);

    setShow(true);
  };

  return (
    // {  style={{ display: `${showTable ? "table" : "none"}` }}}
    <>
      {busData.length > 0 && (
        <>
          <Table
            className="shadow px-4 box-shadow"
            style={{
              display: `${!showTable && displayList ? "table" : "none"}`,
            }}
          >
            <thead>
              <tr>
                <th>Select</th>
                <th>Bus Name</th>
                <th>Departure</th>
                <th>Arrival</th>
                <th>Fare</th>
              </tr>
            </thead>
            <tbody>
              {busData.map(({ busId, busName, departureTime, fare }, i) => {
                return (
                  <tr
                    key={busId}
                    style={{ display: styleFn(busId) ? "table-row" : "none" }}
                  >
                    <Form.Check
                      inline
                      type="radio"
                      name="selectOne"
                      onChange={() => handleChange(busId)}
                      checked={false}
                      value={busId}
                    />
                    <td>{busName}</td>
                    <td>{departureTime}</td>
                    <td>{parseFloat(departureTime) + 5}:00</td>
                    <td>{fare}</td>
                  </tr>
                );
              })}
              {/* {busData.length === count && (
                <tr>No buses found for the selected route and selected date</tr>
              )} */}
            </tbody>
          </Table>
        </>
      )}

      <ShowTickets
        busId={busId}
        display={display}
        setDisplay={setDisplay}
        showConfirmationModal={showConfirmationModal}
      />
      <Confirmation
        show={show}
        setShow={setShow}
        confirmationId={confirmationId}
      />
    </>
  );
}

export default BusTable;

// ) : (
//   busData.length > 0 && (
//     <Card>
//       <Card.Body>
//         <Card.Title
//           className="justify-content-center"
//           style={{ color: "red", marginLeft: "50px" }}
//         >
//           All bus are booked for the selected date and route
//         </Card.Title>
//       </Card.Body>
//     </Card>
//   )
