import React, { useState, useEffect } from "react";
import {
  useLazyQuery,
  useSubscription,
  useMutation
} from "@apollo/react-hooks";
import graphql from "../../graphql";

const userListQuery = graphql.queries.userList;
const userCreatedSubscription = graphql.subcriptions.userCreated;
const CreateConversationMutation = graphql.mutation.createConversation;

export const UsersList = () => {
  const [realtimeAddedUsers, setRealtimeAddedUsers] = useState([]);
  const [getUsers, getUsersData] = useLazyQuery(userListQuery);
  const { data: newUser, loading: userUserLoading } = useSubscription(
    userCreatedSubscription,
    {}
  );
  const [createConversation, { data }] = useMutation(
    CreateConversationMutation
  );

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (newUser) {
      setRealtimeAddedUsers([newUser.userCreated, ...realtimeAddedUsers]);
    }
  }, [newUser]);

  const startConversation = user => {
    createConversation({
      variables: {
        userOne: user.id,
        userTwo: 1
      }
    });
  };

  return (
    <div className="conversations-users ">
      <h3 className="h3">All Users</h3>
      {getUsersData.data
        ? [...realtimeAddedUsers, ...getUsersData.data.userList].map(
            (cc, index) => {
              return (
                <div key={index}>
                  <h2 className="h2">
                    <span className="number">{index + 1}</span>
                    {cc.name}
                  </h2>

                  {/* <button onClick={() => startConversation(cc)}>
                  Send Message
                </button> */}
                </div>
              );
            }
          )
        : "loading"}
    </div>
  );
};
