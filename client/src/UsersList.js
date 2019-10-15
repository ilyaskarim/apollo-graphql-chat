import React, {useState,useEffect} from 'react';
import {useLazyQuery, useSubscription,useMutation} from "@apollo/react-hooks"
import graphql from "./graphql";

const userListQuery = graphql.queries.userList;
const userCreatedSubscription = graphql.subcriptions.userCreated;
const CreateConversationMutation = graphql.mutation.createConversation;

export const UsersList = () => {
  const [realtimeAddedUsers, setRealtimeAddedUsers] = useState([]);
  const [getUsers,getUsersData] = useLazyQuery(userListQuery);
  const {data: newUser, loading: userUserLoading} = useSubscription(userCreatedSubscription, {});
  const [createConversation, { data }] = useMutation(CreateConversationMutation);

  useEffect(() => {
    getUsers();
  },[])

    
  useEffect(() => {
    if (newUser) {
      setRealtimeAddedUsers([newUser.userCreated,...realtimeAddedUsers])
    }
  },[newUser])

  const startConversation = (user) => {
    createConversation({
      variables: {
        userOne: user.id,
        userTwo: 1
      }
    })
  }

  return (
    <div>
      Users
      {
        (getUsersData.data) ? [...realtimeAddedUsers,...getUsersData.data.userList ].map((cc) => {
          return (
            <div>
              <p>{cc.name}</p>
              <button onClick={ () => startConversation(cc)  } >Send Message</button>
            </div>
          )
        }) : "loading"
      }
    </div>
  )
}