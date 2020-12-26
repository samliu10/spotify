import React, { ReactElement } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import SongRec from './SongRec';

type songRec = {
  readonly trackName: string;
  readonly artistName: string;
}

type Props = {
  readonly songRecs: songRec[]
}

const SongRecs = ({ songRecs }: Props): ReactElement => {
  return (
    <div>
      <Card>
        <Card.Header>Recommended Songs</Card.Header>
        <ListGroup variant="flush">
          {songRecs.map((rec, index) => (<SongRec key={index} {...rec} />))}
        </ListGroup>
      </Card>
    </div>
  )
}

export default SongRecs;