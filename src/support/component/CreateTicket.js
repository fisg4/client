import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { Fragment, useState } from 'react';

function CreateTicket() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    let token = localStorage.getItem('token');

    async function handleSubmit(event) {
        event.preventDefault();
        if (JSON.parse(localStorage.getItem('user')).role === "admin") {
            setErrorMessage("Admin can not create tickets.");
        } else {
            const title = event.target.elements.title.value;
            const text = event.target.elements.text.value;
            const priority = event.target.elements.priority.value;
            const request = new Request("/api/v1/tickets", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ authorId: JSON.parse(localStorage.getItem('user')).id, title, text, priority })
            });
            const response = await fetch(request);

            if (!response.ok) {
                setErrorMessage("There are some problems with your request, try again.");
            } else {
                setErrorMessage("");
                navigate("/");
            }
        }
    }

    return (
        <Fragment>
            {!token ?
                (<div className="card card-body col-12 col-md-6 offset-md-3">
                    <p>You have to log into the system in order to report a ticket to our team. Thank you for helping us improving FastMusik!</p>
                    <div className="text-center">
                        <a href="/" className="btn border-purple text-purple bg-blue">Click here to log in</a>
                    </div>
                </div>) :
                (<div className="card card-body col-12 col-md-8 offset-md-2">
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Input type="text" name="title" placeholder="Ticket title" required />
                        </FormGroup>
                        <FormGroup>
                            <Input type="textarea" name="text" placeholder="Ticket body" required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="prioritySelect">Priority</Label>
                            <Input type="select" name="priority" id="prioritySelect" required>
                                <option value="low" defaultValue>LOW</option>
                                <option value="medium">MEDIUM</option>
                                <option value="high">HIGH</option>
                            </Input>
                        </FormGroup>
                        {errorMessage &&
                            <div className="toast align-items-center border-purple bg-blue show" role="alert" aria-live="assertive" aria-atomic="true">
                                <div className="d-flex">
                                    <div className="toast-body">
                                        {errorMessage}
                                    </div>
                                    <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                                </div>
                            </div>}
                        <FormGroup className="text-end">
                            <Button className="btn border-purple text-purple bg-blue" type="submit">Confirm</Button>
                        </FormGroup>
                    </Form>
                </div>)
            }
        </Fragment>
    )
}

export default CreateTicket;