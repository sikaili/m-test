import "../scss/MessageList.scss";

import React, { useEffect, useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectCurrentRealtor } from "../features/realtorSlice";
import { useFetch } from "../js/hooks/useFetch";
import { usePrevious } from "../js/hooks/usePrevious";
import Loader from "./Loader";
import MessageListItem from "./MessageListItem";

export default function MessageList() {
  const [url, setUrl] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [messageList, setMessageList] = useState([]);
  const currentRealtor = useSelector(selectCurrentRealtor);

  const { data, status, error } = useFetch(url);

  const previousRealtor = usePrevious(currentRealtor);
  useEffect(() => {
    if (currentRealtor && currentRealtor.id && pageNo) {
      if (previousRealtor !== currentRealtor) {
        setPageNo(1);
        setMessageList([]);
      }
      setUrl(`http://localhost:8080/realtors/${currentRealtor.id}/messages/?sort=date%3Adesc&page=${pageNo}&page_size=10`);
    }
  }, [currentRealtor, pageNo]);

  useEffect(() => {
    if (data.length > 0) {
      const ids = messageList.map((message) => message.id);
      const filteredData = data.filter((message) => ids.indexOf(message.id) === -1);
      setMessageList([...messageList, ...filteredData]);
    }
  }, [data]);

  const [sentryRef] = useInfiniteScroll({
    loading: status === "fetching",
    hasNextPage: data.length > 1,
    onLoadMore: () => {
      setPageNo(pageNo + 1);
    },
  });

  return (
    <ul className="MessageList">
      {status}
      {error}
      {
          messageList.length > 1 && messageList.map((message) => (
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
      <div ref={sentryRef}>
        {status === "fetching" && <Loader />}
      </div>
    </ul>
  );
}
