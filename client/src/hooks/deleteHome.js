import { useAuthContext } from "../context/AuthContext";

const deleteHome = () => {
  const deleteDetails = async (data) => {
    const result = await fetch(`/api/listing/delete/${data}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ data }),
    });

    const APIresult = await result.json();
    console.log(APIresult);
  };
  return { deleteDetails };
};

export default deleteHome;
