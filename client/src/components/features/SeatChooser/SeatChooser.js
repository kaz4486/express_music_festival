import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Progress, Alert } from 'reactstrap';
// Progress, Alert
import { getSeats, loadSeats, getRequests } from '../../../redux/seatsRedux';
// getRequests,
import './SeatChooser.scss';
import io from 'socket.io-client';
import { CLIENT_URL } from '../../../config';

const SeatChooser = ({ chosenDay, chosenSeat, updateSeat }) => {
  const socket = io(CLIENT_URL);

  let numbersOfFreeSeats = 0;
  let numbersOfSeats = 0;

  const dispatch = useDispatch();
  const seats = useSelector(getSeats);

  const requests = useSelector(getRequests);

  useEffect(() => {
    socket.on('seatsUpdated', (seats) => dispatch(loadSeats(seats)));

    // const timer = setInterval(() => {
    //   dispatch(loadSeatsRequest());
    // }, 120000);
    // return () => clearInterval(timer);
  }, [dispatch]);

  // let numbersOfTaken = 0;
  // let numbersOfSeats = 0;
  // console.log(numbersOfSeats, numbersOfTaken);

  const isTaken = (seatId) => {
    return seats.some((item) => item.seat === seatId && item.day === chosenDay);
  };

  const prepareSeat = (seatId) => {
    numbersOfSeats = numbersOfSeats + 1;
    if (seatId === chosenSeat) {
      return (
        <Button key={seatId} className='seats__seat' color='primary'>
          {seatId}
        </Button>
      );
    } else if (isTaken(seatId)) {
      return (
        <Button key={seatId} className='seats__seat' disabled color='secondary'>
          {seatId}
        </Button>
      );
    } else numbersOfFreeSeats = numbersOfFreeSeats + 1;
    return (
      <Button
        key={seatId}
        color='primary'
        className='seats__seat'
        outline
        onClick={(e) => updateSeat(e, seatId)}
      >
        {seatId}
      </Button>
    );
  };

  return (
    <div>
      <h3>Pick a seat</h3>
      <small id='pickHelp' className='form-text text-muted ml-2'>
        <Button color='secondary' /> – seat is already taken
      </small>
      <small id='pickHelpTwo' className='form-text text-muted ml-2 mb-4'>
        <Button outline color='primary' /> – it's empty
      </small>
      {requests['LOAD_SEATS'] && requests['LOAD_SEATS'].success && (
        <div className='seats'>
          {[...Array(50)].map((x, i) => prepareSeat(i + 1))}
        </div>
      )}
      {requests['LOAD_SEATS'] && requests['LOAD_SEATS'].pending && (
        <Progress animated color='primary' value={50} />
      )}
      {requests['LOAD_SEATS'] && requests['LOAD_SEATS'].error && (
        <Alert color='warning'>Couldn't load seats...</Alert>
      )}
      <p>
        Free seats: {numbersOfFreeSeats}/{numbersOfSeats}
      </p>
    </div>
  );
};

export default SeatChooser;
