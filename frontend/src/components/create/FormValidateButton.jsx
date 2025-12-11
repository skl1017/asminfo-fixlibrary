import postData from "../../utils/postData";

export default function FormValidateButton({
  url,
  payload,
  buttonTitle,
  callback,
}) {
  return (
    <button
      className="p-4 bg-black text-white hover:cursor-pointer"
      onClick={async () => {
        const createdItem = await postData(url, payload);
        callback(createdItem);
      }}
    >
      {buttonTitle}
    </button>
  );
}
