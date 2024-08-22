import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const getListing = () => {
  const { authUser } = useAuthContext();

  const [listData, setListData] = useState([]);

  const allList = async () => {
    const responce = await fetch(`/api/listing/getList/${authUser._id}`);

    const data = await responce.json();
    setListData(data);
  };
  return { allList, listData };
};

export default getListing;
