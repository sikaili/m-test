import "../scss/MessageList.scss";

import React, { useEffect, useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useFetch } from "../js/hooks/useFetch";
import { usePrevious } from "../js/hooks/usePrevious";
import { selectCurrentRealtor, setCurrentRealtor } from "../store/features/realtorSlice";
import Error from "./Error";
import Loader from "./Loader";
import MessageListItem from "./MessageListItem";

export default function MessageList() {
  const [url, setUrl] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [messageList, setMessageList] = useState([]);
  const [currentMessageId, setCurrentMessageId] = useState("");
  const currentRealtor = useSelector(selectCurrentRealtor);

  const { data, status, error } = useFetch(url, false);

  const previousRealtor = usePrevious(currentRealtor);

  useEffect(() => {
    if (currentRealtor && currentRealtor.id && pageNo) {
      if (previousRealtor && previousRealtor.id !== currentRealtor.id) {
        setPageNo(1);
        setMessageList([]);
        setCurrentMessageId("");
      }
      setUrl(`${process.env.REACT_APP_BASE_URL}/realtors/${currentRealtor.id}/messages/?sort=date%3Adesc&page=${pageNo}&page_size=10`);
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
    hasNextPage: data.length > 0 && !error,
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
      setMessageList(messageList.map((item, index) => {
        if (item.id === message.id) {
          fetch(`${process.env.REACT_APP_BASE_URL}/realtors/${currentRealtor.id}/messages/${item.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ read: true }),
          })
            .catch(() => {
              dispatch(setCurrentRealtor(previousRealtor));
              const previousMessageList = [...messageList];
              previousMessageList[index].read = false;
              setMessageList(previousMessageList);
              alert("Your connection seems to be down"); //eslint-disable-line
            });
          return { ...item, read: true };
        }
        return item;
      }));
    }
  };

  return (
    <ul className="MessageList">
      {
          messageList.length > 1 && messageList.map((message) => (
            <li key={message.id}>
              <Link onClick={() => handleClickLi(message)} to={`/realtor/${currentRealtor.id}/message/${message.id}`}>
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
        {(status !== "fetching" && !error && data.length < 1 && messageList.length > 0) && <div style={{ textAlign: "center" }}>No more messages</div>}
      </div>
      {error && <Error message={error} />}
    </ul>
  );
}
