import {useEffect, useState } from 'react';
import axios from 'axios';
import { Container} from 'semantic-ui-react';
import { Actitvity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashBoard from '../../features/activities/dashboard/ActivityDashBoard';
import {v4 as uuid} from 'uuid';


function App() {
  const[activities, setActivities] = useState<Actitvity[]>([]);
  const[selectActivity, setSelectActivity] = useState<Actitvity | undefined>(undefined);
  const[editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Actitvity[]>('http://localhost:5000/api/activities')
    .then(response => {
      console.log(response);
      setActivities(response.data);
    })
  }, [])
  
  function handleSelectedActivity(id: string){
    setSelectActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectActivity(){
    setSelectActivity(undefined);
  }
  function handleformOpen(id?: string){
    id ? handleSelectedActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }
  function handleFormClose(){
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Actitvity){
    activity.id ? setActivities([...activities.filter(x => x.id !== activity.id), activity]) 
    : setActivities([...activities, {...activity, id: uuid()}]);
    setEditMode(false);
    setSelectActivity(activity);
  }

  function handleDeleteActivity(id: string){
    setActivities([...activities.filter(x => x.id !== id)]);
  }

  return (
   <>
      <NavBar openForm={handleformOpen}/>
      <Container style = {{marginTop: '7em'}}>
        <ActivityDashBoard 
        activities={activities}
        selectedActivity = {selectActivity}
        selectActivity = {handleSelectedActivity}
        cancelSelectActivity = {handleCancelSelectActivity}
        editMode = {editMode}
        openForm = {handleformOpen}
        closeForm = {handleFormClose}
        createOrEdit = {handleCreateOrEditActivity}
        deleteActivity = {handleDeleteActivity}
        />
        
      </Container>
   </>
  )
}

export default App
