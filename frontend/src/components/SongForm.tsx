import React, { ReactElement, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

type Props = {
  readonly callbackSubmit: any
}

const SongForm = ({ callbackSubmit }: Props): ReactElement => {
  const [validated, setValidated] = useState(false);

  const submit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div>
      <Form noValidate validated={validated} onSubmit={submit}>

        <Form.Group controlId="validationCustom01">
          <Form.Label>Spotify User ID</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="User ID"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="validationCustom01">
          <Form.Label>Playlist Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Playlist Name"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="validationCustom01">
          <Form.Label>New Playlist Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="New Playlist Name"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>


        <Button type="submit" variant="outline-success">Create Playlist!</Button>
      </Form>
    </div>
  )
}

export default SongForm;