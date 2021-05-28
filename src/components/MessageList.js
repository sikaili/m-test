import "../scss/MessageList.scss";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectCurrentRealtor } from "../features/realtorSlice";
import { useFetch } from "../js/hooks/useFetch";
import MessageListItem from "./MessageListItem";

export default function MessageList() {
  const currentRealtor = useSelector(selectCurrentRealtor);
  const [url, setUrl] = useState("");
  const [pageNo, setPageNo] = useState(1);

  const { data, status, error } = useFetch(url);

  useEffect(() => {
    if (currentRealtor && currentRealtor.id && pageNo) {
      setPageNo(1);
      setUrl(`http://0.0.0.0:8080/realtors/${currentRealtor.id}/messages/?sort=date%3Aasc&page=${pageNo}&page_size=10`);
    }
  }, [setUrl, currentRealtor]);
  if (data) {
    return (
      <ul className="MessageList">
        {status}
        {error}
        {currentRealtor ? currentRealtor.id : "no id"}
        {
          data && data.length > 1 && data.map((message) => (
            <li key={message.id}>
              <Link to={`/message/${message.id}`}>
                <MessageListItem
                  subject={`${message.contact.firstname} ${message.contact.lastname}`}
                  description={message.body}
                  time={message.date}
                  icon={message.type}
                  read={message.read}
                />
              </Link>
            </li>
          ))
        }
      </ul>
    );
  }
}
