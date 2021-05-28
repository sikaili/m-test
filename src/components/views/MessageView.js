import "../../scss/MessageView.scss";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { selectCurrentRealtor } from "../../features/realtorSlice";
import { useFetch } from "../../js/hooks/useFetch";
import Contact from "../Contact";
import MessageContent from "../MessageContent";

function MessageView() {
  const { messageId } = useParams();
  const currentRealtor = useSelector(selectCurrentRealtor);
  const BASE_URL = "http://localhost:8080/";
  const [url, setUrl] = useState("");
  const { data } = useFetch(url);
  const { body, date, contact } = data;
  useEffect(() => {
    if (currentRealtor && currentRealtor.id && messageId) {
      setUrl(`${BASE_URL}realtors/${currentRealtor.id}/messages/${messageId}`);
    }
  }, [currentRealtor, messageId]);

  return (
    <div className="MessageView">
      <Contact contact={contact} />
      <MessageContent sender={contact} body={body} date={date} />
    </div>
  );
}

export default MessageView;
