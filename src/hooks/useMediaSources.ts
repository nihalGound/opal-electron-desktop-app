import { getMediaSources } from "@/lib/utils";
import { useReducer } from "react";
export type SourceDeviceStateProps = {
  displays?: {
    appIcons: null;
    display: null;
    displayId: string;
    id: string;
    name: string;
    thumbnail: unknown[];
  }[];
  audioInput?: {
    deviceId: string;
    kind: string;
    label: string;
    groupId: string;
  }[];
  error?: string | null;
  isPending: boolean;
};
type DisplayDeviceActionProps = {
  type: "GET_DEVICES";
  payload: SourceDeviceStateProps;
};
export const useMediaSources = () => {
  const [state, action] = useReducer(
    (state: SourceDeviceStateProps, action: DisplayDeviceActionProps) => {
      switch (action.type) {
        case "GET_DEVICES":
          return { ...state, ...action.payload };
        default:
          return state;
      }
    },
    {
      displays: [],
      audioInput: [],
      error: null,
      isPending: false,
    }
  );
  const fetchMediaResources = () => {
    action({ type: "GET_DEVICES", payload: { isPending: true } });
    getMediaSources().then((sources) => {
      action({
        type: "GET_DEVICES",
        payload: {
          displays: sources.displays,
          audioInput: sources.audio,
          isPending: false,
        },
      });
    });
  };
  return { state, fetchMediaResources };
};
