import moment from "moment";

export const fileNameGenerator = () => {
  const generateRandomString = (length: number) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";
    for (let i = 0; i < length; i++) {
      randomString += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return randomString;
  };

  const randomString = generateRandomString(4);
 
  const currentDate = new Date();
  const format = moment(currentDate).format("YYYY-MM-DD");
  return `file-${randomString}-${format}`;
};
