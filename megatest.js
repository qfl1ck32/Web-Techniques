async function hello() {
    return greeting = await Promise.resolve("Hello");
  };
  
  hello().then(console.log);


  console.log(Date.now().toString())