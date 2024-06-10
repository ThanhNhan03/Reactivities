import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Actitvity } from "../../../app/models/activity";

interface Props {
    activity: Actitvity | undefined;
    closeForm: () => void;
    createOrEdit: (activity: Actitvity) => void;
}

export default function ActivityForm({activity: selectedActivity, closeForm, createOrEdit}: Props) {

    const initialState = selectedActivity ?? {
        id:'',
        title:'',
        category:'',
        description:'',
        city:'',
        date:'',
        venue:''
    }

    const [actitvity, setActivity] = React.useState(initialState);

    function hanledSubmit(){
        createOrEdit(actitvity);
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = event.target;
        setActivity({...actitvity, [name]: value});
    }

    return (
       <Segment clearing>
            <Form onSubmit={hanledSubmit} autoComplete = 'off'>
                <Form.Input placeholder='Title' value={actitvity.title} name='title' onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description' value={actitvity.description} name='description' onChange={handleInputChange}/>
                <Form.Input placeholder='Category' value={actitvity.category} name='category' onChange={handleInputChange}/>
                <Form.Input placeholder='Date'value={actitvity.date} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder='City' value={actitvity.city} name='city' onChange={handleInputChange}/>
                <Form.Input placeholder='Venue' value={actitvity.venue} name='venue' onChange={handleInputChange}/>

                <Button floated='right' positive type='submit' content='Submit'/>
                <Button onClick={closeForm} floated='right' type='button' content='Cancel'/>
            </Form>
       </Segment>
    );
}