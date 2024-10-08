import { useEffect, useReducer, useRef } from "react";

export const useFetch = (url, shouldCache = true) => {
  const cache = useRef({});

  const initialState = {
    status: "idle",
    error: null,
    data: [],
  };

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "FETCHING":
        return { ...initialState, status: "fetching" };
      case "FETCHED":
        return { ...initialState, status: "fetched", data: action.payload };
      case "FETCH_ERROR":
        return { ...initialState, status: "error", error: action.payload };
      case "REMOVE_DATA":
        return {
          ...initialState, status: "idle", data: [], error: null,
        };
      default:
        return state;
    }
  }, initialState);

  useEffect(() => {
    let cancelRequest = false;
    if (!url) {
      dispatch({ type: "REMOVE_DATA" });
      return;
    }

    const fetchData = async () => {
      dispatch({ type: "FETCHING" });
      if (cache.current[url] && shouldCache) {
        const data = cache.current[url];
        dispatch({ type: "FETCHED", payload: data });
      } else {
        try {
          const response = await fetch(url);
          if (!response.ok) {
            dispatch({ type: "FETCH_ERROR", payload: `${response.status} ${response.statusText}` });
            return;
          }
          const data = await response.json();

          cache.current[url] = data;
          if (cancelRequest) return;
          dispatch({ type: "FETCHED", payload: data });
        } catch (error) {
          if (cancelRequest) return;
          dispatch({ type: "FETCH_ERROR", payload: error.message });
        }
      }
    };

    fetchData();

    return function cleanup() {
      cancelRequest = true;
    };
  }, [url]);

  return state;
};
