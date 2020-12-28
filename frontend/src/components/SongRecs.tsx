import React, { ReactElement } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import SongRec from './SongRec';

type songRec = {
  readonly name: string;
  readonly artist: any;
}

type Props = {
  readonly songRecs: songRec[]
}

const SongRecs = ({ songRecs }: Props): ReactElement => {
  return (
    <div>
      <Card>
        <Card.Header className="rec-title">Recommended Songs</Card.Header>
        <ListGroup variant="flush">
          {songRecs.map((rec, index) => (<SongRec key={index} trackName={rec.name} artistName={rec.artist.name} />))}
        </ListGroup>
      </Card>
    </div>
  )
}

export default SongRecs;