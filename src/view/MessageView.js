import "../scss/MessageView.scss";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Contact from "../components/Contact";
import ErrorBanner from "../components/ErrorBanner";
import Loader from "../components/Loader";
import MessageContent from "../components/MessageContent";
import { useFetch } from "../js/hooks/useFetch";
import { selectCurrentRealtor } from "../store/features/realtorSlice";

function MessageView() {
  const { messageId } = useParams();
  const currentRealtor = useSelector(selectCurrentRealtor);
  const [url, setUrl] = useState("");
  const { data, status, error } = useFetch(url);
  const { body, date, contact } = data;

  useEffect(() => {
    if (currentRealtor && currentRealtor.id) {
      if (!messageId) {
        setUrl("");
      } else {
        setUrl(`${process.env.REACT_APP_BASE_URL}/realtors/${currentRealtor.id}/messages/${messageId}`);
      }
    }
  }, [currentRealtor, messageId]);

  return (
    <div className="MessageView">
      {
          body && date && contact
          && (
          <>
            <Contact contact={contact} />
            <MessageContent sender={contact} body={body} date={date} />
          </>
          )
      }
      {status === "fetching" && <Loader />}
      {error && <ErrorBanner message={`${error} message`} />}
    </div>
  );
}

export default MessageView;
