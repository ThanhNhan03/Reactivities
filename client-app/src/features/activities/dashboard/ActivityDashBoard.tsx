import React from "react";
import { Grid } from "semantic-ui-react";
import { Actitvity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActitvityDetail from "../details/ActitvityDetail";
import ActivityForm from "../form/ActivityForm";

interface Props {
    activities: Actitvity[];
    selectedActivity: Actitvity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: Actitvity) => void;
    deleteActivity: (id: string) => void;
  }

export default function ActivityDashBoard({activities, selectedActivity, 
    selectActivity, cancelSelectActivity,editMode, openForm, closeForm, createOrEdit, deleteActivity}: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
               <ActivityList activities={activities} 
               selectActivity = {selectActivity}
               deleteActivity = {deleteActivity}/>
            </Grid.Column>
                <Grid.Column width='6'>
                    {selectedActivity&& !editMode &&
                    <ActitvityDetail activity={selectedActivity} 
                    cancelSelectActivity = {cancelSelectActivity}
                    openForm = {openForm}/>
                    }
                    
                    {editMode&&
                     <ActivityForm closeForm = {closeForm} activity={selectedActivity} createOrEdit={createOrEdit}/>
                    }
                </Grid.Column>
        </Grid>
    )
}