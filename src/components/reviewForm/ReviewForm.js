import React from 'react'
import { Button, Form, FormGroup, FormLabel } from 'react-bootstrap'

function ReviewForm({handleSubmit,revText,labelText,defaultValue}) {
  return (
    <Form>
        <FormGroup className='mb-3' controlId='reviewForm.textArea' >
            <FormLabel></FormLabel>
            <Form.Control as={'textarea'} rows={3} defaultValue={defaultValue} ref={revText} />
        </FormGroup>
        <Button variant='outline-info' onClick={handleSubmit} >
            Submit
        </Button>
    </Form>
  )
}

export default ReviewForm
