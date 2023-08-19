export const login = async () => {
  const loginUrl = "http://62.90.114.24:9106/api/admin/login";
  const cardinal = {
    username: "test",
    password: "test123",
  };
  try {
    fetch(loginUrl, {
      body: JSON.stringify(cardinal),
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((data) => {
        return data.json();
      })
      .then((val) => {
        //connectSignalr(val.token);
        console.log(`val::::::${JSON.stringify(val)}:::val-END`);
      });
  } catch (error) {
    console.log(`Error:::${error}`);
    return "";
  }
};
