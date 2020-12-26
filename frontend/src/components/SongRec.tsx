import React, { ReactElement } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

type Props = {
  readonly trackName: string;
  readonly artistName: string;
}

const SongRec = ({ trackName, artistName }: Props): ReactElement => {
  return (
    <div>
      <ListGroup.Item>{trackName}: {artistName}</ListGroup.Item>
    </div>
  )
}

export default SongRec;