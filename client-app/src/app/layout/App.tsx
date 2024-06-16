import {useEffect, useState } from 'react';
import { Container} from 'semantic-ui-react';
import { Actitvity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashBoard from '../../features/activities/dashboard/ActivityDashBoard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './loadingComponent';



function App() {
  const[activities, setActivities] = useState<Actitvity[]>([]);
  const[selectActivity, setSelectActivity] = useState<Actitvity | undefined>(undefined);
  const[editMode, setEditMode] = useState(false);
  const[loading, setLoading] = useState(true);
  const[submitting, setSubmitting] = useState(false);

  

  // This useEffect hook is executed once when the component mounts.
  // It fetches a list of activities from the server using the agent.Activities.list() method.
  // The response is then processed and stored in the component's state using the setActivities() function.
  useEffect(() => {
    // Fetch a list of activities from the server
    agent.Activities.list()
    .then(response => {
      // Create an empty array to store the activities
      let actitvities: Actitvity[] = [];

      // Iterate over each activity in the response
      response.forEach(activity => {
        // Extract only the date portion of the activity's date property
        // and store it back in the activity's date property
        activity.date = activity.date.split('T')[0];

        // Add the activity to the activities array
        actitvities.push(activity);
      })

      // Update the component's state with the activities array
      setActivities(actitvities);
      setLoading(false); 
    })
  }, [])

  
  /**
   * This function is called when a specific activity is selected.
   * It searches through the list of activities stored in the component's state
   * and finds the activity with the matching id.
   * 
   * @param {string} id - The id of the activity to find.
   * @return {void} This function does not return anything.
   */
  function handleSelectedActivity(id: string){
    // Find the activity in the list of activities with the matching id
    // and store it in the component's state.
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
    setSubmitting(true);
    if(activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity])
        setSelectActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      }) 
      
    } else {
        activity.id = uuid();
        agent.Activities.create(activity).then(() => {
          setActivities([...activities, activity]);
          setSelectActivity(activity);
          setEditMode(false);
          setSubmitting(false);
        })
      }
    }
    

  function handleDeleteActivity(id: string){
    setSubmitting(true) 
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)]);
      setSubmitting(false);
    })
  }

  if(loading) return <LoadingComponent content='Loading...  '/>

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
        submitting = {submitting}
        />
      </Container>
   </>
  )
}

export default App
