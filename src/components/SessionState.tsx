import localforage from "localforage";
import { proxy } from "valtio";
import type { AuthState } from "./Auth";
import type { User } from "@auth0/auth0-react";
import type { UserRole } from "../graphql";

export const sessionState = proxy<{
  currentUser: typeof AuthState.user | null;
  tag: string[];
  domain: string;
  topic: string;
  sessionId: string;
  learnerModel: Object;
  currentContent: {
    id: number | null;
    code: string;
    label: string;
    description: string;
    kcs: Object[];
    json: Object;
    state: Object;
  };
  learnerTraces: Object[];
}>({
  currentUser: null,
  tag: [],
  domain: "PreAlgebra",
  topic: "",
  sessionId: "",
  learnerModel: {
    type: "BKT",
  },
  currentContent: {
    id: null,
    code: "",
    label: "",
    description: "",
    kcs: [],
    json: {},
    state: {},
  },
  learnerTraces: [],
});

export var sessionStateBD = localforage.createInstance({
  name: "sessionState",
});

export const sessionStateInitial = (
  user:
    | {
        __typename?: "User" | undefined;
        id: string;
        email: string;
        name?: string | null | undefined;
        role: UserRole;
        picture?: string | null | undefined;
        tags: string[];
        projects: {
          __typename?: "Project" | undefined;
          id: string;
          code: string;
          label: string;
        }[];
        groups: {
          __typename?: "Group" | undefined;
          id: string;
          code: string;
          label: string;
          tags: string[];
        }[];
      }
    | null
    | undefined,
  auth0User: User | null
) => {
  sessionState.currentUser = JSON.parse(JSON.stringify(user));
  sessionState.sessionId = `${auth0User?.updated_at}`;

  for (const key in sessionState) {
    sessionStateBD.getItem(key).then(function (value) {
      if (value == null) {
        //create valuekey in sessionState in indexedBD
        sessionStateBD
          .setItem(
            key,
            JSON.parse(
              JSON.stringify(sessionState[key as keyof typeof sessionState])
            )
          )
          .then(function () {
            // Do other things once the value has been saved.
            console.log("create 'key' in sessionState");
          });
      } else {
        //update valuekey??
      }
    });
  }
};

//export const useSessionState = () => useSnapshot(sessionState);
