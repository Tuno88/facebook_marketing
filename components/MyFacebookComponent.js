import React, { useEffect } from "react";

const MyFacebookComponent = () => {
  useEffect(() => {
    window.fbAsyncInit = function () {
      FB.init({
        appId: "2037161219839325",
        xfbml: true,
        version: "v17.0",
      });
    };

    (function (d, s, id) {
      if (d.getElementById(id)) return;
      const js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      const fjs = d.getElementsByTagName(s)[0];
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  function subscribeApp(page_id, page_access_token) {
    console.log("Subscribing page to app! " + page_id);
    FB.api(
      "/" + page_id + "/subscribed_apps",
      "post",
      {
        access_token: page_access_token,
        subscribed_fields: ["leadgen"],
      },
      function (response) {
        console.log("Successfully subscribed page", response);
      }
    );
  }

  function myFacebookLogin() {
    FB.login(
      function (response) {
        console.log("Successfully logged in", response);
        FB.api("/me/accounts", function (response) {
          console.log("Successfully retrieved pages", response);
          const pages = response.data;
          console.log("response", response);
          console.log("pages", pages);
          const ul = document.getElementById("list");
          for (let i = 0, len = pages.length; i < len; i++) {
            const page = pages[i];
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = "#";
            a.onclick = subscribeApp.bind(this, page.id, page.access_token);
            a.innerHTML = page.name;
            li.appendChild(a);
            ul.appendChild(li);
          }
        });
      },
      { scope: "pages_show_list" }
    );
  }

  return (
    <div>
      <button onClick={myFacebookLogin}>Login with Facebook</button>
      <ul id="list"></ul>
    </div>
  );
};

export default MyFacebookComponent;
