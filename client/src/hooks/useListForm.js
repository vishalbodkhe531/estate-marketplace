const useListForm = () => {
  const useListFormData = async (formData) => {
    console.log(formData);
    // const arrLength = formData.imageUrls.length;

    // if (arrLength < 1) return;

    const responce = await fetch(`/api/listing/create`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(formData),
    });

    // const data = await responce.json();
    // console.log(data);
  };
  return { useListFormData };
};

export default useListForm;
