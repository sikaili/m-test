import "../scss/MessageList.scss";

import React, { useEffect, useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectCurrentRealtor, setCurrentRealtor } from "../features/realtorSlice";
import { useFetch } from "../js/hooks/useFetch";
import { usePrevious } from "../js/hooks/usePrevious";
import Loader from "./Loader";
import MessageListItem from "./MessageListItem";

export default function MessageList() {
  const [url, setUrl] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [messageList, setMessageList] = useState([]);
  const [currentMessageId, setCurrentMessageId] = useState("");
  const currentRealtor = useSelector(selectCurrentRealtor);

  const { data, status } = useFetch(url);

  const previousRealtor = usePrevious(currentRealtor);
  useEffect(() => {
    if (currentRealtor && currentRealtor.id && pageNo) {
      if (previousRealtor && previousRealtor.id !== currentRealtor.id) {
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

  const dispatch = useDispatch();
  const handleClickLi = (message) => {
    setCurrentMessageId(message.id);
    if (!message.read) {
      dispatch(setCurrentRealtor({
        ...currentRealtor, unread_messages: currentRealtor.unread_messages - 1,
      }));
      const newMessageList = messageList.map((item) => {
        if (item.id === message.id) {
          fetch(`http://localhost:8080/realtors/${currentRealtor.id}/messages/${message.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...item, read: true }),
          })
            .then((response) => response.json());
          return { ...item, read: true };
        }
        return item;
      });
      setMessageList(newMessageList);
    }
  };

  return (
    <ul className="MessageList">
      {
          messageList.length > 1 && messageList.map((message) => (
            <li key={message.id}>
              <Link onClick={() => handleClickLi(message)} to={`/message/${message.id}`}>
                <MessageListItem
                  subject={`${message.contact.firstname} ${message.contact.lastname}`}
                  description={message.body}
                  time={message.date}
                  icon={message.type}
                  read={message.read}
                  active={currentMessageId === message.id}
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
