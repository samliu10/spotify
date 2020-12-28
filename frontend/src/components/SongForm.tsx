import React, { ReactElement, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

type Props = {
  readonly callbackSubmit: any,
  readonly setUserId: any
  readonly setPlaylistName: any,
  readonly setNewPlaylistName: any,
  readonly userId: string,
  readonly playlistName: string,
  readonly newPlaylistName: string
}

const SongForm = ({ callbackSubmit, setUserId, setPlaylistName,
  setNewPlaylistName, userId, playlistName, newPlaylistName }: Props): ReactElement => {
  const [validated, setValidated] = useState(false);

  const submit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    callbackSubmit(userId, playlistName, newPlaylistName);
  };

  return (
    <div>
      <Form noValidate validated={validated} onSubmit={submit}>

        <Form.Group controlId="validationCustom01">
          <Form.Label className="form-label">Spotify User ID</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="User ID"
            onChange={(e) => setUserId(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please enter your Spotify user ID.
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="validationCustom01">
          <Form.Label className="form-label">Playlist Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Playlist Name"
            onChange={(e) => setPlaylistName(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please enter the name of one of your playlists.
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="validationCustom01">
          <Form.Label className="form-label">New Playlist Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="New Playlist Name"
            onChange={(e) => setNewPlaylistName(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a name for your new playlist.
            </Form.Control.Feedback>
        </Form.Group>


        <Button className="formBtn" type="submit" variant="success">Create Playlist!</Button>
      </Form>
    </div>
  )
}

export default SongForm;